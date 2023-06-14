const path = require('path'); // eslint-disable-line @typescript-eslint/no-var-requires
const webpack = require('webpack'); // eslint-disable-line @typescript-eslint/no-var-requires
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // eslint-disable-line @typescript-eslint/no-var-requires
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin'); // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = {
  entry: './cms/cms.ts',
  target: 'web',
  output: {
    filename: 'cms.js',
    path: path.resolve(__dirname, 'out/assets'),
  },
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    fallback: {
      path: require.resolve('path-browserify'),
      fs: false,
    },
  },
  externals: {
    tailwindcss: 'tailwindcss',
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        options: { mode: ['react-component'] },
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        options: {
          configFile: path.resolve(__dirname, 'tsconfig.cms.json'),
        },
      },
      {
        test: /\.(sass|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', // translates CSS into CommonJS
        ],
      },
      {
        test: /\.(png|jp(e*)g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        exclude: [/node_modules\/slick-carousel/],
        loader: 'svg-react-loader',
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        include: [/node_modules\/slick-carousel/],
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new NodePolyfillPlugin({
      includeAliases: ['process'],
    }),
  ],
};
