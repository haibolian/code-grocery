const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: 'dist',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: 'public'
  }
}