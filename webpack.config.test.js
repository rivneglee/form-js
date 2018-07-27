module.exports = {
  entry: './src/index.js',
  mode: 'test',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader?plugins=babel-plugin-rewire',
        },
      },
      {
        test: /\.scss$/,
        loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]
      },
      {
        test: /\.css$/,
        loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]
      },
    ]
  },
};
