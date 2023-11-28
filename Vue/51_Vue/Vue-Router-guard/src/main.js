import { createApp } from "vue";
import App from "./App";
import router from "~/routes"; // routes/폴더의 index.js를 가져와 router로 제어한다는 의미! index.js에서 export default한 것들을 쓸 수 있게 되는 것이다

const app = createApp(App);
app.use(router);
app.mount("#app");
