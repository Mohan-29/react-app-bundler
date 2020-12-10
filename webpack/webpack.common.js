/**
 * Webpack Base Configuration
 */

const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const validateNodeEnv = require('../utils/validateNodeEnv');

validateNodeEnv();

const nodeEnvIsProduction = process.env.NODE_ENV === 'production';

const prodPlugins = [
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),
];

const plugins = [
  new webpack.EnvironmentPlugin([
    'NODE_ENV',
  ]),
  ...(nodeEnvIsProduction ? prodPlugins : []),
];

module.exports = {
  profile: true,
  devtool: nodeEnvIsProduction ? false : 'source-map',
  optimization: {
    minimize: nodeEnvIsProduction,
    minimizer: [
      new TerserPlugin({
        test: /\.jsx?$/i,
        extractComments: false,
        terserOptions: {
          compress: {
            drop_console: true,
          },
          keep_fnames: true,
        },
      }),
    ],
  },
  mode: nodeEnvIsProduction ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.(ttf|eot|svg|png|jpg)(\?.*)?$/,
        use: [{ loader: 'url-loader' }],
      },
      {
        test: /\.(woff|woff2)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          },
        }],
      },
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          allowInlineConfig: false,
          ignore: false,
          useEslintrc: false,
          failOnError: true,
          parser: 'babel-eslint',
          parserOptions: {
            ecmaVersion: 6,
            sourceType: 'module',
            ecmaFeatures: { modules: true },
          },
          rules: {
            'no-restricted-modules': ['error', 'create-react-class'],
            'no-restricted-imports': ['error', 'create-react-class'],
          },
        },
      },
    ],
  },
  externals: {
    react: {
      var: 'React',
      commonjs2: 'react',
    },
    'react-dom': {
      var: 'ReactDOM',
      commonjs2: 'react-dom',
    },
    redux: {
      var: 'Redux',
      commonjs2: 'redux',
    },
    'react-redux': {
      var: 'ReactRedux',
      commonjs2: 'react-redux',
    },
    reselect: {
      var: 'Reselect',
      commonjs2: 'reselect',
    },
    immutable: {
      var: 'Immutable',
      commonjs2: 'immutable',
    },
    'prop-types': {
      var: 'PropTypes',
      commonjs2: 'prop-types',
    },
    'react-helmet': {
      var: 'ReactHelmet',
      commonjs2: 'react-helmet',
    },
  },
  plugins,
};