const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './index.web.simple.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: [
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              ['@babel/plugin-transform-private-methods', { loose: true }],
              ['@babel/plugin-transform-private-property-in-object', { loose: true }],
            ],
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset/resource',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.web.js', '.js', '.web.ts', '.ts', '.web.tsx', '.tsx', '.json'],
    alias: {
      'react-native$': 'react-native-web',
      // React Navigation の ESM インポート問題を修正
      '@react-navigation/native': path.resolve(__dirname, 'node_modules/@react-navigation/native/lib/module'),
      '@react-navigation/core': path.resolve(__dirname, 'node_modules/@react-navigation/core/lib/module'),
      '@react-navigation/elements': path.resolve(__dirname, 'node_modules/@react-navigation/elements/lib/module'),
      '@react-navigation/bottom-tabs': path.resolve(__dirname, 'node_modules/@react-navigation/bottom-tabs/lib/module'),
    },
    fallback: {
      fs: false,
      path: false,
      crypto: false,
      http: false,
      https: false,
      os: false,
      util: false,
      stream: false,
      zlib: false,
      net: false,
      tls: false,
    },
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
    host: '0.0.0.0',
    allowedHosts: 'all',
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    compress: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './web/index.html',
      inject: true,
      minify: false,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.DEBUG': JSON.stringify('false'),
      'process.env.BABEL_ENV': JSON.stringify('development'),
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
  devtool: 'cheap-module-source-map',
  performance: {
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000,
    hints: false,
  },
};
