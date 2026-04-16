import type { NextConfig } from "next";

import bundleAnalyzer from "@next/bundle-analyzer";
import { withSentryConfig } from "@sentry/nextjs";

// Security Headers

const SENTRY_DOMAINS =
  "https://*.ingest.de.sentry.io https://*.ingest.sentry.io https://*.sentry.io";

const PRODUCTION_DOMAINS = [
  "https://*.vercel.app",
  "https://*.eu-central-1.elasticbeanstalk.com",
  SENTRY_DOMAINS,
].join(" ");

const DEVELOPMENT_DOMAINS = [
  "http://localhost:8000",
  "http://localhost:8969",
  SENTRY_DOMAINS,
].join(" ");

const VERCEL_SCRIPT_DOMAINS = "https://vercel.live https://*.vercel.live";

const isVercel = process.env.VERCEL === "1";
const isProduction = process.env.NODE_ENV === "production";

const cspHeader = `
  default-src 'self';
  connect-src 'self' ${
    process.env.NODE_ENV === "development"
      ? DEVELOPMENT_DOMAINS
      : PRODUCTION_DOMAINS
  };
  script-src 'self' 'unsafe-eval' 'unsafe-inline' ${isVercel ? VERCEL_SCRIPT_DOMAINS : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  worker-src 'self' blob:;
  ${isProduction && isVercel ? "upgrade-insecure-requests;" : ""}
`;

const secHeaders = {
  headers: [
    {
      key: "X-DNS-Prefetch-Control",
      value: "on",
    },
    {
      key: "X-Frame-Options",
      value: "SAMEORIGIN",
    },
    {
      key: "X-Content-Type-Options",
      value: "nosniff",
    },
    {
      value: "origin-when-cross-origin",
      key: "Referrer-Policy",
    },
    {
      value:
        process.env.NODE_ENV === "production"
          ? "max-age=63072000; includeSubDomains; preload"
          : "",
      key: "Strict-Transport-Security",
    },
    {
      value: cspHeader.replaceAll("\n", ""),
      key: "Content-Security-Policy",
    },
    {
      key: "Cross-Origin-Opener-Policy",
      value: "same-origin-allow-popups",
    },
    {
      key: "Cross-Origin-Resource-Policy",
      value: "same-site",
    },
    {
      //  Configure based on app needs
      value: "camera=(), microphone=(), geolocation=()",
      key: "Permissions-Policy",
    },
  ],
  source: "/(.*)",
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: true,
});

const baseConfig: NextConfig = {
  async headers() {
    return [secHeaders];
  },
  /* config options here */
  // cacheComponents: true,
  reactStrictMode: false,
  // experimental: {
  //   turbopackSourceMaps: true,
  //   turbopackInputSourceMaps: true,
  // },
  // webpack(config, { dev, isServer }) {
  //   if (dev && !isServer) {
  //     // Sentry nu poate rezolva eval-based source maps
  //     config.devtool = "source-map";
  //   }
  //   return config;
  // },
};

let nextConfig = baseConfig;

if (process.env.ANALYZE === "true") {
  nextConfig = withBundleAnalyzer(baseConfig);
}

if (process.env.NEXT_PUBLIC_SENTRY_DISABLED !== "true") {
  nextConfig = withSentryConfig(nextConfig, {
    webpack: {
      reactComponentAnnotation: {
        enabled: true,
      },

      // Tree-shake Sentry logger statements to reduce bundle size
      treeshake: {
        removeDebugLogging: true,
      },
    },
    sourcemaps: {
      disable: false,
    },
    authToken: process.env.SENTRY_AUTH_TOKEN,

    // For all available options, see:
    // https://www.npmjs.com/package/@sentry/webpack-plugin#options
    org: process.env.SENTRY_ORGANIZATION,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    project: process.env.SENTRY_PROJECT,

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    // tunnelRoute: "/monitoring",

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // Disable Sentry telemetry
    telemetry: false,
  });
}

export default nextConfig;
