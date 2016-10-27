var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var here = require('path-here'); // <- Add path-here


module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: './app.js',
  output: {
    path: here('dist'), // <- changed to this
    filename: 'bundle.js' // <- changed to this
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