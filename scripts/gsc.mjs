#!/usr/bin/env node
/**
 * Google Search Console reader.
 *
 * Why this exists: checking the Sitemaps / Performance reports by hand means
 * clicking through the GSC web UI and reading numbers back one at a time. This
 * pulls the same data over the API so it can be read, diffed, and pasted.
 *
 * Auth is a *service account*, not OAuth. That matters for two reasons:
 *   1. No consent-screen setup, no refresh-token dance, no browser. Google
 *      blocks sign-in from an automated browser, which is what pushed us here.
 *   2. The credential is scoped to Search Console and nothing else. It is not a
 *      login to Mason's Google account, so it can't touch Gmail, Drive, or the
 *      Business Profile even if it leaks.
 *
 * The key file lives OUTSIDE this repo on purpose. This repository is public.
 * Point GSC_KEY_FILE at it, or drop it at the default path below.
 *
 * Zero dependencies — Node 18+ has fetch and can sign RS256 via node:crypto, so
 * this deliberately avoids adding googleapis to the site's package.json. This is
 * ops tooling; it has no business inflating the deploy bundle's dependency tree.
 *
 * Usage:
 *   node scripts/gsc.mjs sites
 *   node scripts/gsc.mjs sitemaps [siteUrl]
 *   node scripts/gsc.mjs top [siteUrl] [days]
 */

import { createSign } from "node:crypto";
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const KEY_FILE =
  process.env.GSC_KEY_FILE || join(homedir(), ".gsc", "service-account.json");

// Read/write rather than .readonly: removing the bad sitemap entries is one of
// the things we actually want to do here. The Search Console user-permission
// level (Full vs Restricted) is the real gate on top of this.
const SCOPE = "https://www.googleapis.com/auth/webmasters";

const API = "https://www.googleapis.com/webmasters/v3";

function loadKey() {
  let raw;
  try {
    raw = readFileSync(KEY_FILE, "utf8");
  } catch {
    console.error(`Could not read the service-account key at:\n  ${KEY_FILE}\n`);
    console.error("Set GSC_KEY_FILE to its location, or save it to that path.");
    process.exit(1);
  }
  const key = JSON.parse(raw);
  if (!key.client_email || !key.private_key) {
    console.error("That JSON doesn't look like a service-account key — it has");
    console.error("no client_email/private_key. Make sure you downloaded the");
    console.error("key for a *service account*, not an OAuth client.");
    process.exit(1);
  }
  return key;
}

const b64url = (input) =>
  Buffer.from(input).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

/**
 * Mint an access token via the JWT-bearer grant: build a claim set, sign it with
 * the service account's private key, and trade the signature for a token.
 */
async function getAccessToken(key) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(
    JSON.stringify({
      iss: key.client_email,
      scope: SCOPE,
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    })
  );

  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claims}`);
  const signature = signer.sign(key.private_key, "base64")
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${header}.${claims}.${signature}`,
    }),
  });

  const body = await res.json();
  if (!res.ok) {
    console.error("Google refused the credential:", body.error_description || body.error);
    if (String(body.error_description || "").includes("invalid_grant")) {
      console.error("\nThis usually means the machine clock is off, or the key was revoked.");
    }
    process.exit(1);
  }
  return body.access_token;
}

async function api(token, path) {
  const res = await fetch(`${API}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 403) {
    console.error(
      "403 from Search Console. The service account authenticated fine, but it\n" +
      "hasn't been added as a user on that property yet — see the setup notes."
    );
    process.exit(1);
  }
  if (!res.ok) {
    console.error(`${res.status} from ${path}:`, await res.text());
    process.exit(1);
  }
  return res.json();
}

async function cmdSites(token) {
  const { siteEntry = [] } = await api(token, "/sites");
  if (!siteEntry.length) {
    console.log("No properties visible to this service account.");
    console.log("Add its email as a user in Search Console → Settings → Users and permissions.");
    return;
  }
  console.log("Properties this credential can see:\n");
  for (const s of siteEntry) {
    console.log(`  ${s.siteUrl}`.padEnd(52) + s.permissionLevel);
  }
}

async function cmdSitemaps(token, siteUrl) {
  const { sitemap = [] } = await api(
    token,
    `/sites/${encodeURIComponent(siteUrl)}/sitemaps`
  );

  if (!sitemap.length) {
    console.log(`No sitemaps submitted for ${siteUrl}.`);
    return;
  }

  console.log(`Sitemaps for ${siteUrl} — ${sitemap.length} submitted\n`);

  for (const s of sitemap) {
    // A sitemap Google has never successfully fetched has no lastDownloaded.
    // That is the signal that separates "working" from "dead entry cluttering
    // the report", which is the whole reason we're looking.
    const fetched = Boolean(s.lastDownloaded);
    const errors = Number(s.errors || 0);
    const warnings = Number(s.warnings || 0);
    const status = !fetched ? "NEVER FETCHED" : errors ? `${errors} errors` : "OK";

    const submitted = s.contents?.reduce((n, c) => n + Number(c.submitted || 0), 0) ?? 0;
    const indexed = s.contents?.reduce((n, c) => n + Number(c.indexed || 0), 0) ?? 0;

    console.log(`  ${s.path}`);
    console.log(`      status:    ${status}${warnings ? ` (${warnings} warnings)` : ""}`);
    console.log(`      submitted: ${new Date(s.lastSubmitted).toISOString().slice(0, 10)}`);
    console.log(
      `      fetched:   ${fetched ? new Date(s.lastDownloaded).toISOString().slice(0, 10) : "never"}`
    );
    if (fetched) console.log(`      URLs:      ${submitted} discovered, ${indexed} indexed`);
    console.log();
  }

  const dead = sitemap.filter((s) => !s.lastDownloaded);
  if (dead.length) {
    console.log(`${dead.length} of ${sitemap.length} have never been fetched:`);
    for (const s of dead) console.log(`  - ${s.path}`);
  }
}

async function cmdTop(token, siteUrl, days) {
  const end = new Date();
  const start = new Date(end.getTime() - days * 86400000);
  const iso = (d) => d.toISOString().slice(0, 10);

  const res = await fetch(
    `${API}/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate: iso(start),
        endDate: iso(end),
        dimensions: ["query"],
        rowLimit: 25,
      }),
    }
  );

  const body = await res.json();
  if (!res.ok) {
    console.error(`${res.status}:`, JSON.stringify(body, null, 2));
    process.exit(1);
  }

  const rows = body.rows || [];
  if (!rows.length) {
    console.log(`No search data for ${siteUrl} in the last ${days} days.`);
    console.log("A new property shows nothing for the first few days.");
    return;
  }

  console.log(`Top queries, last ${days} days — ${siteUrl}\n`);
  console.log("  clicks  impr   ctr    pos   query");
  for (const r of rows) {
    console.log(
      "  " +
        String(r.clicks).padStart(6) +
        String(r.impressions).padStart(6) +
        `${(r.ctr * 100).toFixed(1)}%`.padStart(7) +
        r.position.toFixed(1).padStart(7) +
        "   " +
        r.keys[0]
    );
  }
}

const [cmd, ...rest] = process.argv.slice(2);
const key = loadKey();
const token = await getAccessToken(key);

// Default to the www URL-prefix property, since that's the canonical host —
// non-www 308-redirects to it.
const DEFAULT_SITE = "https://www.boisebasinjunk.com/";

switch (cmd) {
  case "sites":
    await cmdSites(token);
    break;
  case "sitemaps":
    await cmdSitemaps(token, rest[0] || DEFAULT_SITE);
    break;
  case "top":
    await cmdTop(token, rest[0] || DEFAULT_SITE, Number(rest[1]) || 28);
    break;
  default:
    console.log("Usage:");
    console.log("  node scripts/gsc.mjs sites");
    console.log("  node scripts/gsc.mjs sitemaps [siteUrl]");
    console.log("  node scripts/gsc.mjs top [siteUrl] [days]");
    console.log(`\nService account: ${key.client_email}`);
}
