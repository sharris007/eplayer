var webpack = require('webpack');

module.exports = function (config) {
  config.set({

    browsers: [ 'Chrome' ],

    frameworks: [ 'mocha' ],

    files: [
      'tests.webpack.js'
    ],

    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'dots' ],

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
          { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader' },
          { test: /\.json$/, loader: 'json'},
          { test: /\.scss/, loader: 'style!css!sass' },
        ]
      }
    },

    webpackServer: {
      noInfo: true
    }

  });
};
