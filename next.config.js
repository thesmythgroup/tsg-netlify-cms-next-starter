const path = require('path'); // eslint-disable-line @typescript-eslint/no-var-requires
const withOptimizedImages = require('next-optimized-images');
const { LOCALES, DEFAULT_LOCALE } = require('./lib/locale-settings'); // eslint-disable-line @typescript-eslint/no-var-requires

const config = withOptimizedImages({
  inlineImageLimit: -1,
  handleImages: ['jpeg', 'png', 'webp', 'gif'],
  trailingSlash: true,
  i18n: {
    // should also match locales in cms/config.index
    locales: LOCALES,
    defaultLocale: DEFAULT_LOCALE,
  },
  webpack: (cfg) => {
    cfg.module.rules.push({
      test: /\.md$/,
      loader: 'frontmatter-markdown-loader',
      options: { mode: ['react-component'] },
    });
    cfg.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return cfg;
  },
});

/** @type {import('next').NextConfig} */
const finalConfig = {};

// As of Next 12.2.3, the next.config.js file is validated and checked for "invalid" fields.
// Many Next plugins incorrectly add extra fields. So, the official workaround for now is to
// remove the extra fields from the next.config.js file before exporting the config.
// https://github.com/vercel/next.js/pull/38498#issuecomment-1197282975
Object.keys(config).forEach((key) => {
  if (key !== 'inlineImageLimit' && key !== 'handleImages') {
    finalConfig[key] = config[key];
  }
});

module.exports = finalConfig;
