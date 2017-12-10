const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var packageJson = require('./package.json');

const babelLoaderConfigShared = {
  test: /\.jsx?$/,
  loader: 'babel-loader',
  query: {
    ...packageJson.babel,
    cacheDirectory: true,
  },
};

module.exports = {
  entry: {
   app: './lib/main.js'
  },
  output: {
   filename: '[name].bundle.js',
   path: path.resolve(__dirname, 'dist')
  },
  plugins: [
   new CleanWebpackPlugin(['dist']),
   new HtmlWebpackPlugin({
     title: 'Production'
   })
  ],
  module: {
   loaders: [
     {
       loader: 'json-loader',
       test: /\.json$/,
     },
     {
       exclude: /node_modules/,
       ...babelLoaderConfigShared,
     },
     {
       include: /react-three-renderer[\\/]src/,
       ...babelLoaderConfigShared,
     },
   ]
  },
  resolve: {
   extensions: ['.js', '.jsx', '*'],
   alias: {
     // use the source files
     'react-three-renderer': path.join(
       __dirname, 'node_modules', 'react-three-renderer', 'src'),
   },
  }
};
