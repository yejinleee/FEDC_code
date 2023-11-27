import { createStore } from "vuex";

export default createStore({
  state() {
    // 데이터는 함수로! 리턴!
    return {
      msg: "hello?",
      count: 1,
    };
  },
  mutations: {
    increaseCount(state) {
      // 매개변수로 state가 데이터인 state이다. 이렇게 둬야 내부에서 접근 가능!
      state.count += 1;
    },
  },
  actions: {},
  getters: {}, // computed와 유사!
});
