// Imports: Dependencies
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  // Loaders
  module: {
    rules : [
      // JavaScript/JSX Files
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'astroturf/loader'],
      },
      // CSS Files
      {
        test: /\.css$/,
        use: ['style-loader', {
          loader: 'astroturf/css-loader',
          options: {
            localIdentName: '[local]--[hash:base64:8]',
          }
        }],
      }
    ]
  },
  // Plugins
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    })
  ],
  devServer: {
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
};
// Exports
module.exports = config;
