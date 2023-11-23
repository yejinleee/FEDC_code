const path = require("path"); // 기본내장기능 path 가져옴
const { VueLoaderPlugin } = require("vue-loader"); // vue-loader설치후 사용가능. 플러그인 에러해결하기위함
const HtmlPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.js", // 웹팩이 해석할때 진입점
  output: {
    // path: 결과물 반환 위치, filename :파일의 이름(기본은 위의 entry js명)
    // entry와 다르게 이 파일 주변을 찾는걸 보장할 수 없음! path.resolve 써야함.
    path: path.resolve(__dirname, "dist"), // (경로, 폴더명)
    // __dirname 은 nodejs의 전역변수임. 루트경로에 대한 정보
    // 폴더명은 통상 dist , public 등
    clean: true, //dist폴더의 불필요한거 지워버림
  },
  module: {
    rules: [
      {
        test: /\.vue$/, // 정규표현식을 통해 .vue 찾음 // 정규표현식.text()로 탐지하는 역할
        use: "vue-loader", // js만 해석할 수 있는 webpack이 vue도 해석할 수 있도록 하는 패키지/ npm i -D vue-loader@next
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlPlugin({
      template: "./src/index.html", //해석할 파일 경로. 이또한 path.resolve사용한 절대경로로 지정이 필요한대 내부적으로 실행해쥼. path.resolve(__dirname, "./src/index.html") 와 같음
    }),
  ],
};
