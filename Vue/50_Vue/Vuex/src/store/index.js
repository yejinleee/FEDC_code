import { createStore } from "vuex";

export default createStore({
  state() {
    // 데이터는 함수로! 리턴!
    return {
      msg: "hello?",
      count: 1,
    };
  },
  getters: {
    // computed와 유사
    reversedMsg(state) {
      return state.msg.split("").reverse().join("");
    },
  },
  mutations: {
    increaseCount(state) {
      // 매개변수로 state가 데이터인 state이다. 이렇게 둬야 내부에서 접근 가능!
      state.count += 1;
    },
    updateMsg(state, newMsg) {
      state.msg = newMsg;
    },
  },
  actions: {
    async fetchTodo(context) {
      // 다른 actions에 접근할 수 있는 context를 제공
      // context => state, getters 접근 가능. commit, dispatch로 접근 가능
      const todo = await fetch(
        "https://jsonplaceholder.typicode.com/todos/1"
      ).then((res) => res.json());
      console.log(todo.title);
      // vuex 이전엔 mutations.updateMsg(todo.title);
      // mutations 사용할 땐 commit 사용
      context.commit("updateMsg", todo.title); // 실행할 변이메소드명, 인수
      // fetchTodo({commit}) 으로 구조분해 했다면 그냥 commit으로
    },
  },
});
