import { reactive } from "vue";

export const state = reactive({
  msg: "Hello vue?",
  count: 1,
});
export const getters = {
  // computed에 지정해주는 옵션과 비슷하게 만들어봄
  reversedMsg() {
    return state.msg.split("").reverse().join(""); // msg반전
    // 여기서 state.msg는 반응형 데이터다. 이 데이터가 바뀌면 이 계산도 새로 동작할 수 있도록, World.vue의 computed옵션에 등록해야함!
  },
};
export const mutations = {
  increaseCount() {
    state.count += 1;
  },
  decreaseCount() {
    state.count -= 1;
  },
  updateMsg(newMsg) {
    state.msg = newMsg;
  },
};
export const actions = {
  // actions는, store의 데이터로 다양한 로직을 처리한다., 반면 mutations는 데이터를 수정하는 요동로만 쓰인다. 데이터 변경처리를 위해 만든 객체니까!
  // 그래서 여기서 actions는 그 mutations을 제외한 모든 처리로직이 가능하도록 작성하는 메소드들의 집합(Ex비동기)

  //ex
  async fetchTodo() {
    const todo = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    ).then((res) => res.json());
    console.log(todo);
    mutations.updateMsg = todo.title; // title 갱신!
  },
};
