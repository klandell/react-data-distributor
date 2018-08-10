module.exports = {
  context: __dirname,
  entry: './src/index.js',
  mode: 'development',
  devtool: false,
  output: {
    path: `${__dirname}/dist`,
    filename: 'index.js',
    libraryTarget: 'umd',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
  externals: {
    react: 'react',
  },
};
