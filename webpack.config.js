var packageJson = require('./package.json');

var path = require('path');

const babelLoaderConfigShared = {
  test: /\.jsx?$/,
  loader: 'babel-loader',
  query: {
    ...packageJson.babel,
    cacheDirectory: true,
  },
};

module.exports = {
  entry: './lib/main.js',
  output: {
    filename: './bundle.js',
  },
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
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '*'],
    alias: {
      // use the source files
      'react-three-renderer': path.join(
        __dirname, 'node_modules', 'react-three-renderer', 'src'),
    },
  }
};
