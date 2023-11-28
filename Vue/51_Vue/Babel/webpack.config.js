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
        test: /\.vue$/, //js를 만나면
        exclude: /node_modules/, // 이 경로는 제외
        use: "bable-loader", //바벨 실행 지정
      },
    ],
  },
  plugins: [
    new HtmlPlugin({
      template: "./index.html",
    }),
  ],
};
