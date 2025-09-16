const path = require('path');

module.exports = {
  entry: './pages/index.js',   // Use index.js in pages/ as entry
  output: {
    filename: 'bundle.js',     // Webpack will bundle everything here
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '/'), // Serve project root
    },
    compress: true,
    port: 3000,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  mode: 'development',
};