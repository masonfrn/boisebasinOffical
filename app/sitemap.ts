import type { MetadataRoute } from "next";
import { SITE_URL, CITY_PAGES, SERVICE_PAGES } from "@/lib/constants";
import { RESOURCES } from "@/lib/resources";

const siteUrl = SITE_URL;

// Bump this only when core page content actually changes — see the SEO audit
// note on sitemap.ts about lastModified previously being set to "now" on
// every build, which falsely told Google every page changed on every deploy.
const CORE_LAST_MODIFIED = new Date("2026-08-05");

export default function sitemap(): MetadataRoute.Sitemap {
  const coreRoutes: MetadataRoute.Sitemap = [
    "",
    "/quote",
    "/about",
    "/service-areas",
    "/contact",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: CORE_LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const cityRoutes: MetadataRoute.Sitemap = CITY_PAGES.map((city) => ({
    url: `${siteUrl}/junk-removal/${city.slug}`,
    lastModified: CORE_LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = SERVICE_PAGES.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: CORE_LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const resourceRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/resources`,
      lastModified: CORE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...RESOURCES.map((post) => ({
      url: `${siteUrl}/resources/${post.slug}`,
      lastModified: new Date(post.updated),
      changeFrequency: "yearly" as const,
      priority: 0.55,
    })),
  ];

  return [...coreRoutes, ...cityRoutes, ...serviceRoutes, ...resourceRoutes];
}
