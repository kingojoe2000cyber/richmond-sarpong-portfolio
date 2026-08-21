import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "richmond-sarpong-portfolio";
const pagesBasePath = isGitHubPages ? `/${repositoryName}` : "";

const nextConfig: NextConfig = {
  // The /pages directory is also the checked-in static GitHub Pages artifact.
  // Restrict framework page discovery so its browser-only .js files are not SSR routes.
  pageExtensions: ["ts", "tsx"],
  ...(isGitHubPages
    ? {
        output: "export" as const,
        basePath: pagesBasePath,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
