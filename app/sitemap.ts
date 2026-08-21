import type { MetadataRoute } from "next";
import { SITE_URL, CITY_PAGES, SERVICE_PAGES } from "@/lib/constants";
import { LOCAL_PAGE_PARAMS, localPagePath } from "@/lib/localPages";
import { RESOURCES } from "@/lib/resources";

const siteUrl = SITE_URL;

// Bump this only when core page content actually changes — see the SEO audit
// note on sitemap.ts about lastModified previously being set to "now" on
// every build, which falsely told Google every page changed on every deploy.
const CORE_LAST_MODIFIED = new Date("2026-08-18");

export default function sitemap(): MetadataRoute.Sitemap {
  const coreRoutes: MetadataRoute.Sitemap = [
    "",
    "/quote",
    "/pricing",
    "/services",
    "/about",
    "/service-areas",
    "/contact",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: CORE_LAST_MODIFIED,
    changeFrequency: "monthly",
    // /pricing and /services are hubs that funnel to the money pages, so they
    // sit above the rest of the core set but below the homepage.
    priority: route === "" ? 1 : route === "/pricing" || route === "/services" ? 0.9 : 0.8,
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

  // The 80 service-by-city pages. Derived from LOCAL_PAGE_PARAMS so the sitemap
  // and the generated routes can't fall out of sync when a city or service is
  // added.
  const localRoutes: MetadataRoute.Sitemap = LOCAL_PAGE_PARAMS.map((param) => ({
    url: `${siteUrl}${localPagePath(param.service, param.city)}`,
    lastModified: CORE_LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.7,
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

  return [
    ...coreRoutes,
    ...cityRoutes,
    ...serviceRoutes,
    ...localRoutes,
    ...resourceRoutes,
  ];
}
