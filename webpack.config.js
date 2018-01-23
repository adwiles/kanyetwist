var path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


module.exports = {
  entry: './js/main.js',
  output: { 
    filename: 'bundle.js', 
    path: path.resolve(__dirname, 'sketch')
  }, 
  module: {
    loaders: [{
        loader: 'babel-loader',
        query: { presets: ['es2015'] }
      }]
  },
  plugins: [
    new UglifyJsPlugin()
  ],
  stats: { colors: true },
}
