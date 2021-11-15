const path = require('path');
const webpack = require('webpack');

const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dev = process.env.NODE_ENV !== 'production';

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, '/src/index.html'),
  filename: 'index.html',
  inject: 'body',
});

const DefinePluginConfig = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production'),
});

const cwd = process.cwd();
const srcPath = path.join(cwd, 'src');


module.exports = {
  devServer: {
    host: 'localhost',
    port: '3000',
    hot: true
  },
  entry: [path.join(__dirname, '/src/index.tsx')],
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        exclude: /node_modules/,
        enforce: "pre"
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
    ],
  },
  resolve: {
    modules: [srcPath, 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.json', '.mjs'],
    alias: {
      '@mui/styled-engine': '@mui/styled-engine-sc'
    }
  },
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '/build'),
  },
  mode: dev ? 'development' : 'production',
  plugins: [
    dev && new ReactRefreshPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
  ].filter(Boolean),
};