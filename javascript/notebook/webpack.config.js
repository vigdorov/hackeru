const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: './src/js/main.js',
  },
  output: {
    path: path.join(__dirname + '/build'),
    filename: './js/promise.js',
  },
  devServer: {
    compress: true,
    //host: '0.0.0.0',
    //useLocalIp: true,
    port: 8000,
    open: 'Chrome',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      publicPath: './build',
      filename: 'index.html',
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: './css/style.css',
    }),
  ],
};