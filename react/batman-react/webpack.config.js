const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const optimization = {
  splitChunks: {
    automaticNameDelimiter: '~',
    cacheGroups: {
      node_vendors: {
        test: /[\\/]node_modules[\\/]/,
        filename: './ts/vendors.js',
        name: 'vendors',
        chunks: 'all',
        priority: 1,
      },
    }
  },
};

module.exports = {
  entry: {
    app: './src/ts/main.tsx',
  },
  output: {
    path: path.join(__dirname + '/build'),
    filename: './ts/script.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js' ]
  },
  optimization: optimization,
  devServer: {
    useLocalIp: true,
    host: '0.0.0.0',
    compress: true,
    port: 8000,
    open: 'Chrome',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/main.html',
      publicPath: './build',
      filename: 'index.html',
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: './css/style.css',
    }),
  ],
};