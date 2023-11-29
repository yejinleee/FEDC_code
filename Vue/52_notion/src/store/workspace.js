import router from "~/routes";

export default {
  namespaced: true,
  state() {
    return {
      workspaces: [],
      currentWorkspace: {},
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
      const workspace = await fetch(
        "https://kdt-frontend.programmers.co.kr/documents",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-username": "yejin",
          },
          body: JSON.stringify({
            title: "",
            parent: parentId,
          }),
        }
      ).then((res) => res.json());
      await dispatch("readWorkspaces");
      router.push({
        name: "Workspace",
        params: {
          id: workspace.id,
        },
      });
    },
    async readWorkspaces({ commit, dispatch }) {
      //전체목록
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
      if (workspaces.length === 0) {
        dispatch("createWorkspace");
      }
    },
    async readWorkspace({ commit }, payload) {
      //개별
      const { id } = payload;
      try {
        const workspace = await fetch(
          `https://kdt-frontend.programmers.co.kr/documents/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-username": "yejin",
            },
          }
        ).then((res) => res.json());
        console.log(workspace);
        commit("assignState", {
          currentWorkspace: workspace,
        });
      } catch (error) {
        router.push("/error");
      }
    },
    async updateWorkspace({ dispatch }, payload) {
      const { id, title, content } = payload;
      await fetch(`https://kdt-frontend.programmers.co.kr/documents/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-username": "yejin",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      }).then((res) => res.json());
      dispatch("readWorkspaces");
    },
    async deleteWorkspace({ state, dispatch }, payload) {
      const { id } = payload;
      await fetch(`https://kdt-frontend.programmers.co.kr/documents/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-username": "yejin",
        },
      }).then((res) => res.json());
      await dispatch("readWorkspaces");
      if (id === parseInt(router.currentRoute.value.params.id, 10)) {
        router.push({
          name: "Workspace",
          params: {
            id: state.workspaces[0].id, // context를 구조분해해서 가져온 state임!
          },
        });
      }
    },
  },
};
