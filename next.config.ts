import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  cacheComponents: true,
  turbopack: {
    rules: {},
  },
}

export default nextConfig
