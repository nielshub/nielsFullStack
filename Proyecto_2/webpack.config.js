const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: "src/images", to: "images" },
      { from: "src/style.css", to: "style.css" },
      { from: "src/cartas/jpeg", to: "cartas/jpeg" }
    ]),
    new HtmlWebpackPlugin({
      title: "Juego de Póker",
      template: "src/index.html"
    })
  ]
};
