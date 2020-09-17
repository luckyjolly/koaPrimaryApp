const webpackMerge = require('webpack-merge');
const { module } = require('./webpack.config.base');
const baseWebpackConfig = require('./webpack.config.base');

const webpackConfig = webpackMerge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  stats: { children: false}//不输出webpack日志
});

module.exports = webpackConfig;