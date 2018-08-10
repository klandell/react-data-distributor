module.exports = {
  context: __dirname,
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: `${__dirname}/dist`,
    filename: 'index.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
      },
    }],
  },
  externals: {
    react: 'React',
  },
};
