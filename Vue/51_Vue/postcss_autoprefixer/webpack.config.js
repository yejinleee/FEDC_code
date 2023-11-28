const HtmlPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./main.js",
  output: {
    // path: path.resolve(__dirname, 'dist') // 기본이라 생략가능
    publicPath: "/", // html에서 main.js 찾는 경로 시작을 / 로 해서 절대경로로 지정
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new HtmlPlugin({
      template: "./index.html",
    }),
  ],
};
