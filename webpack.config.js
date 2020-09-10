var path = require("path");

module.exports = {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
        }
      ]
    },
    output: {
        path: path.resolve(__dirname, "client", "public", "js")
    },
    entry: {
        main: "./client/src/index.js"
    },
    devtool: "eval-source-map"
  };