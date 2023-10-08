const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const glob = require('glob');
// const pages = glob.sync('pages/*.html');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash].js',
    clean: true,
  },
  plugins: [
    /* ...pages.map(
      (el) =>
        new HtmlWebpackPlugin({
          filename: el.replace(/^pages\//, ''),
          template: el,
        }),
    ), */
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/pages/index.html'), // шаблон
      filename: 'index.html', // название выходного файла
    }), // Generates default index.html
    new HtmlWebpackPlugin({
      filename: 'blog-posts.html',
      template: 'src/pages/blog-posts.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'post.html',
      template: 'src/pages/post.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'feedback.html',
      template: 'src/pages/feedback.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new BrowserSyncPlugin(
      {
        // browse to http://localhost:3000/ during development
        host: 'localhost',
        port: 3000,
        // proxy the Webpack Dev Server endpoint
        // (which should be serving on http://localhost:3100/)
        // through BrowserSync
        proxy: 'http://localhost:9000/',
      },
      // plugin options
      {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false,
      },
    ),
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.jpg|.png|.svg$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name]-[hash][ext]',
        },
      },
    ],
  },
  devServer: {
    allowedHosts: ['.csb.app'],
    compress: false,
    open: true,
    port: 3000,
    hot: true,
  },
};
