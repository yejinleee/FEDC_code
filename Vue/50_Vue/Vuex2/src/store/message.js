export default {
  namespaced: true,
  state() {
    return {
      msg: "hi from message.js",
    };
  },
  getters: {
    // computed같은 계산된 데이터
    reversedMsg(state) {
      return state.msg.split("").reverse().join("");
    },
  },
  mutations: {
    updateMsg(state, newMsg) {
      state.msg = newMsg;
    },
  },
  actions: {
    async fetchTodo({ commit }) {
      const todo = await fetch(
        "https://jsonplaceholder.typicode.com/todos/1"
      ).then((res) => res.json());
      commit("updateMsg", todo.title); // 여기선 네임스페이스 필요없음!message 모듈 내부니까!
    },
  },
};
