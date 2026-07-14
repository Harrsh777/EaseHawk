import type { NextConfig } from "next";
import { legacyRedirects } from "./lib/routes";

const nextConfig: NextConfig = {
  async redirects() {
    return legacyRedirects.map(({ source, destination }) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
