const path = require("path"); // 기본내장기능 path 가져옴
const { VueLoaderPlugin } = require("vue-loader"); // vue-loader설치후 사용가능. 플러그인 에러해결하기위함
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  resolve: {
    extensions: [".vue", ".js"], // 확장자
    alias: {
      "~": path.resolve(__dirname, "src"),
    }, // 경로 별칭
  },
  entry: "./src/main.js", // 웹팩이 해석할때 진입점
  output: {
    // path: 결과물 반환 위치, filename :파일의 이름(기본은 위의 entry js명)
    // entry와 다르게 이 파일 주변을 찾는걸 보장할 수 없음! path.resolve 써야함.
    path: path.resolve(__dirname, "dist"), // (경로, 폴더명)
    // __dirname 은 nodejs의 전역변수임. 루트경로에 대한 정보
    // 폴더명은 통상 dist , public 등
    publicPath: "/",
    clean: true, //dist폴더의 불필요한거 지워버림
  },
  module: {
    rules: [
      {
        test: /\.vue$/, // 정규표현식을 통해 .vue 찾음 // 정규표현식.text()로 탐지하는 역할
        use: "vue-loader", // js만 해석할 수 있는 webpack이 vue도 해석할 수 있도록 하는 패키지/ npm i -D vue-loader@next
      },
      {
        test: /\.s?css$/,
        use: [
          "vue-style-loader",
          "css-loader", // 순서 중요! 아래부터, 오른쪽부터 평가됨. 먼저 해석되어야 하는 로더를 마지막에 작성!!!!
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlPlugin({
      template: "./src/index.html", //해석할 파일 경로. 이또한 path.resolve사용한 절대경로로 지정이 필요한대 내부적으로 실행해쥼. path.resolve(__dirname, "./src/index.html") 와 같음
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "static",
          // to: "dist", // from에서 to로 파일 복사할 경로 지정. to는 기본이 output 옵션의 값
        },
      ],
    }),
  ],
  devServer: {
    //실제서버X, 개발서버옵션
    historyApiFallback: true,
  },
};
