const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      publicPath: '/public/dist',
      port: 9000,
      watchOptions: {
        poll: true
      }
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: 'assets/src/images',
          to: 'images'
        },
      ]),
    ]
})