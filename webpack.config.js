const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nestSwaggerPlugin = require('@nestjs/swagger/plugin');

module.exports = {
  entry: {
    server: path.resolve(__dirname, './src/index.ts')
  },
  target: "node",
  devtool: "inline-source-map",
  mode: process.env.ENV || "development",
  externals: [ nodeExternals() ],
  module: {
    rules: [
      { 
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            getCustomTransformers: (program) => ({
              before: [nestSwaggerPlugin.before({}, program)],
            })
          }
        }
      },
    ],
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: [ '.tsx', '.ts' ],
  },
  node: {
    __dirname: false
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  }
};