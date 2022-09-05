const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devServer = (isDev) =>
  !isDev
    ? {}
    : {
        devServer: {
          open: true,
          hot: true,
          port: 8080,
        },
      };


module.exports = ({ develop }) => ({
  mode: develop ? 'development' : 'production',
  devtool: develop ? 'inline-source-map' : false,
  entry: path.resolve(__dirname, './src/index.ts'),
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        loader: require.resolve('ts-loader'),
        options: {
          configFile: path.resolve(__dirname, './tsconfig.json'),
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(?:ico|gif|png|jpeg|jpg|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // title: "Demo webpack",
      //Will create html file with title "Demo webpack"
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      // filename: '[name].[contenthash].css',
      filename: '[name].css',
    }),
    new CopyPlugin({
      patterns: [
        { from: './public' }
      ]
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
  ],
  output: {
    // filename: '[name].[contenthash].js',
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    assetModuleFilename: 'assets/[name][ext]',
  },
  ...devServer(develop),
});
