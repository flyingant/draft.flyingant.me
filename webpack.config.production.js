const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const extractCustomerStyle = new ExtractTextPlugin('style.css');
const extractCSSLib = new ExtractTextPlugin('lib.css');

module.exports = {

  entry: {
    bundle: './src/index.js'
  },

  mode: 'production',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.(png|jpg|gif|ico|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ]
      },
      {
        test: /\.(png|jpg|gif|ico|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: 'url-loader', // works like file loader but can return a DataURL if the file is smaller than a byte limit.
            options: {
              limit: 8192
            },
          },
        ]
      },
      {
        test: /\.json$/,
        use: ["json-loader"]
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, "src/scss"),
        loader: extractCustomerStyle.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.css$/,
        use: extractCSSLib.extract({
          fallback: "style-loader",
          use: ['css-loader']
        })
      },
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx','.scss', '.sass', '.css'],
  },

  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.min.js'
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    extractCSSLib,
    extractCustomerStyle,
    new HtmlWebpackPlugin({
      title: "MaYi's Draft Tool",
      template: 'src/templates/index.html'
    }),
    new CopyWebpackPlugin([
      {from: './src/assets', to: './assets'}
    ])
  ]
};