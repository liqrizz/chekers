const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');
module.exports = {
  optimization: {
    minimizer: [
      new TerserJSPlugin({}), 
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: { 
          discardComments: { 
            removeAll: true 
          }
        },
        canPrint: true
      })
    ],
  },
  entry: ["@babel/polyfill", "./app/app.js"],
  output: {
    filename: 'bundle.app.js',
    path: path.resolve(__dirname, 'public'),
  },
  devServer: {
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader, 
          {
            loader: 'css-loader'
          }, 
          {
          loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer()
              ],
            }
          },
          "sass-loader"
        ],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      },
      template: 'app/src/desk.html'
    })
  ],
};