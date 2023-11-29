export default {
  namespaced: true,
  state() {
    return {
      workspaces: [],
    };
  },
  getters: {},
  mutations: {
    assignState(state, payload) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key]; // payload가 {workspaces: workspaces}로 오니까 key가 workspaces가 됨
      });
    },
  },
  actions: {
    async createWorkspace({ dispatch }, payload = {}) {
      // 최상의 목록은 parentId가 없기 때문에 undefined가 넘어온다. 이때 디폴트로 {}처리
      const { parentId } = payload;
      await fetch("https://kdt-frontend.programmers.co.kr/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-username": "yejin",
        },
        body: JSON.stringify({
          title: "",
          parent: parentId,
        }),
      }).then((res) => res.json());
      dispatch("readWorkspaces");
    },
    async readWorkspaces({ commit }) {
      const workspaces = await fetch(
        "https://kdt-frontend.programmers.co.kr/documents",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-username": "yejin",
          },
        }
      ).then((res) => res.json());
      commit("assignState", { workspaces });
      console.log(workspaces);
    },
    updateWorkspace() {},
    async deleteWorkspace({ dispatch }, payload) {
      const { id } = payload;
      await fetch(`https://kdt-frontend.programmers.co.kr/documents/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-username": "yejin",
        },
      }).then((res) => res.json());
      dispatch("readWorkspaces");
    },
  },
};
