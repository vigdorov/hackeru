const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: './src/js/main.js',
  },
  output: {
    path: path.join(__dirname + '/build'),
    filename: './js/script.js',
  },
  devServer: {
    compress: true,
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