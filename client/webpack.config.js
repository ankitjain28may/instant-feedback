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
        use: ['style-loader', 'astroturf/css-loader'],
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
};
// Exports
module.exports = config;
