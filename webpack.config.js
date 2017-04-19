var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var path = require('path');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
},
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: '/(node_modules)/',
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  }
}