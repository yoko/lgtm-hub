const path = require('path')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
const CleanAssetsPlugin = require('clean-assets-webpack-plugin')

module.exports = {
  // modeをわたすようにしたい
  mode: 'production',
  entry: {
    'index': [
      path.resolve(__dirname, 'src/index.jsx')
    ]
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'public/js/dist'),
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new ManifestPlugin({ fileName: path.resolve(__dirname, 'manifest.json') }),
    new CleanAssetsPlugin()
  ],
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader?modules'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};