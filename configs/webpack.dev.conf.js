import webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import * as utils from './utils';
import baseWebpackConfig from './webpack.base.conf';
import config from '../config';


// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[ name ] = [ './bin/dev-client.js' ].concat(baseWebpackConfig.entry[ name ])
});


export default merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: true, extract: false })
  },
  output: {
    publicPath: `http://${config.dev.hostname}:${config.dev.port}/`
  },
  devtool: '#eval',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', `[name].js`),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
});
