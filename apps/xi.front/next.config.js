// Не поддавайтесь соблазну использовать здесь import
const path = require('path');
const runtimeCaching = require('next-pwa/cache');

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

plugins.push(withPWA);

const nextConfig = {
  experimental: {
    esmExternals: true,
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  transpilePackages: [
    'pkg.theme',
    'pkg.utils',
    'pkg.form.signin',
    'pkg.form.signup',
    'pkg.form.reset-password',
    'pkg.module.videoconference',
    'pkg.module.whiteboard',
    'pkg.module.editor',
    'pkg.avatar.editor',
    'pkg.logo',
    'pkg.models',
    'pkg.stores',
    'pkg.avatar.editor',
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

module.exports = () => plugins.reduce((acc, next) => next(acc), nextConfig);
