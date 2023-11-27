import { createApp } from "vue";
import App from "./App";
import store from "~/store";

const app = createApp(App);
app.use(store); // store를 플러그인으로 등록
app.mount("#app");
