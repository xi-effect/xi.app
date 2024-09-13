// Не поддавайтесь соблазну использовать здесь import
const path = require('path');
const runtimeCaching = require('next-pwa/cache');
const { withSentryConfig } = require('@sentry/nextjs');

const plugins = [];

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  runtimeCaching,
  mode: 'production',
  reloadOnOnline: true,
  cacheOnFrontEndNav: true,
  disable: process.env.NODE_ENV === 'development',
  skipWaiting: true,
  sw: '/sw.js',
  buildExcludes: [
    /middleware-manifest\.json$/,
    /_middleware\.js$/,
    /_middleware\.js\.map$/,
    /middleware-runtime\.js$/,
    /server\/pages\/_middleware\.js$/,
  ],
});

const nextConfig = {
  experimental: {
    esmExternals: true,
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  transpilePackages: [
    '@xipkg/form',
    '@xipkg/link',
    '@xipkg/button',
    '@xipkg/input',
    '@xipkg/label',
    '@xipkg/checkbox',
    '@xipkg/avatar',
    '@xipkg/tailwind',
    '@xipkg/utils',
    '@xipkg/icons',
    '@xipkg/dropdown',
    '@xipkg/userprofile',
    '@xipkg/modal',
    '@xipkg/fileuploader',
    '@xipkg/select',
    '@xipkg/avatar',
    '@xipkg/input',
    '@xipkg/label',
    '@xipkg/tabs',
    '@xipkg/toggle',
    '@xipkg/datepicker',
    '@xipkg/popover',
    '@xipkg/calendar',
    '@xipkg/scrollarea',
    '@xipkg/file',
    '@xipkg/tooltip',
    '@xipkg/breadcrumbs',
  ],
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development',
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'auth.xieffect.ru',
      },
      {
        protocol: 'https',
        hostname: 'api.xieffect.ru',
      },
    ],
  },
  output: 'standalone',
  webpack(config) {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      issuer: { and: [/\.(js|ts|md)x?$/] },
      type: 'asset/resource',
    });

    return config;
  },
};

if (process.env.NODE_ENV !== 'development') {
  plugins.push(withPWA);
  plugins.push((nextConfig) =>
    withSentryConfig(nextConfig, {
      // For all available options, see:
      // https://github.com/getsentry/sentry-webpack-plugin#options

      org: 'xieffect',
      project: 'xi-app',

      // Only print logs for uploading source maps in CI
      silent: !process.env.CI,

      // For all available options, see:
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

      // Upload a larger set of source maps for prettier stack traces (increases build time)
      widenClientFileUpload: true,

      // Uncomment to route browser requests to Sentry through
      // a Next.js rewrite to circumvent ad-blockers.
      // This can increase your server load as well as your hosting bill.
      // Note: Check that the configured route will not
      // match with your Next.js middleware, otherwise reporting of client-
      // side errors will fail.
      // tunnelRoute: "/monitoring",

      // Hides source maps from generated client bundles
      hideSourceMaps: true,

      // Automatically tree-shake Sentry logger statements to reduce bundle size
      disableLogger: true,

      // Enables automatic instrumentation of Vercel Cron Monitors.
      // (Does not yet work with App Router route handlers.)
      // See the following for more information:
      // https://docs.sentry.io/product/crons/
      // https://vercel.com/docs/cron-jobs
      automaticVercelMonitors: true,
    }),
  );
}

module.exports = () => plugins.reduce((acc, next) => next(acc), nextConfig);
