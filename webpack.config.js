var path = require('path');

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
  stats: { colors: true },
}
