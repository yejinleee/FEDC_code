import { createStore } from "vuex";
import message from "./message"; // 여긴 경로별칭 안쓰는게 좋음
import count from "./count";

export default createStore({
  state() {
    return {
      msg: "hi from index state msg",
    };
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    // !!
    message,
    count, // 이름 변경 가능 hello: count
  },
});
