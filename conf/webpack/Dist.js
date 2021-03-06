'use strict';

/**
 * Dist configuration. Used to build the
 * final output when running npm run dist.
 */
const webpack = require('webpack');
const WebpackBaseConfig = require('./Base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

class WebpackDistConfig extends WebpackBaseConfig {

  constructor() {
    super();
    this.config = {
      cache: false,
      devtool: 'source-map',
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': '"production"'
        }),
        new HtmlWebpackPlugin({
          template: 'index.html'
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoErrorsPlugin(),
        new OfflinePlugin({
          safeToUseOptionalCaches: true,

          // caches: {
          //   main: [
          //     'app.js'
          //   ],
          //   additional: [
          //     '*.woff',
          //     '*.woff2'
          //   ],
          //   optional: [
          //     ':rest:'
          //   ]
          // },

          ServiceWorker: {
            events: true
          },
          AppCache: {
            events: true
          }
        })
      ]
    };
  }

  /**
   * Get the environment name
   * @return {String} The current environment
   */
  get env() {
    return 'dist';
  }
}

module.exports = WebpackDistConfig;
