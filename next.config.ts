import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

// Security Headers

const cspHeader = `
  default-src 'self';
  connect-src 'self' ${
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000 http://localhost:8969"
      : "< YOUR_PRODUCTION_DOMAIN >"
  };
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  worker-src 'self' blob:;
  ${process.env.NODE_ENV === "production" ? "upgrade-insecure-requests;" : ""}
`;

const secHeaders = {
  source: "/(.*)",
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
      key: "Referrer-Policy",
      value: "origin-when-cross-origin",
    },
    {
      key: "Strict-Transport-Security",
      value:
        process.env.NODE_ENV === "production"
          ? "max-age=63072000; includeSubDomains; preload"
          : "",
    },
    {
      key: "Content-Security-Policy",
      value: cspHeader.replace(/\n/g, ""),
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
      key: "Permissions-Policy",
      //  Configure based on app needs
      value: "camera=(), microphone=(), geolocation=()",
    },
  ],
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: true,
});

const baseConfig: NextConfig = {
  /* config options here */
  // cacheComponents: true,
  reactStrictMode: false,
  async headers() {
    return [secHeaders];
  },
};

let nextConfig = baseConfig;

if (process.env.ANALYZE === "true") {
  nextConfig = withBundleAnalyzer(baseConfig);
}

if (process.env.NEXT_PUBLIC_SENTRY_DISABLED !== "true") {
  nextConfig = withSentryConfig(nextConfig, {
    // For all available options, see:
    // https://www.npmjs.com/package/@sentry/webpack-plugin#options
    org: process.env.SENTRY_ORGANIZATION,
    project: process.env.SENTRY_PROJECT,

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: "/monitoring",

    webpack: {
      reactComponentAnnotation: {
        enabled: true,
      },

      // Tree-shake Sentry logger statements to reduce bundle size
      treeshake: {
        removeDebugLogging: true,
      },
    },

    // Disable Sentry telemetry
    telemetry: false,
  });
}

export default nextConfig;
