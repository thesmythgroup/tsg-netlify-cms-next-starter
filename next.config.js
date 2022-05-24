const path = require('path'); // eslint-disable-line @typescript-eslint/no-var-requires
const withOptimizedImages = require('next-optimized-images'); // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = withOptimizedImages({
  inlineImageLimit: -1,
  handleImages: ['jpeg', 'png', 'webp', 'gif'],
  trailingSlash: true,
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
