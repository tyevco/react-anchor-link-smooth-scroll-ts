const webpack = require('webpack')
const path = require('path')
//const MinifyPlugin = require('babel-minify-webpack-plugin')

let libraryName = 'anchor-link'
let outputFile

if (process.env.NODE_ENV === 'production') {
  outputFile = libraryName + '.min.js'
} else {
  outputFile = libraryName + '.js'
}

const config = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  externals: {
    react: 'react'
  },
  plugins:[
    new webpack.DefinePlugin({
     'process.env': {
       'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
     }
   })
  ]
}

// if (process.env.NODE_ENV === 'production') {
//   config.plugins.push(new MinifyPlugin())
// }

module.exports = config
