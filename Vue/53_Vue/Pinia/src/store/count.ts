import { defineStore } from 'pinia';

// (스토어이름, 옵션객체)
export const useCountStore = defineStore('count', {
  // 하나의 함수(변수)임
  state: () => ({
    // 반응형데이터. "함수"로 만들어야함!
    count: 1,
  }),
  getters: {
    double(state) {
      return state.count * 2;
    },
  },
  actions: {
    increase() {
      // 인자로 context 안씀. 내부에서 this로 접근 가능
      this.count += 1;
    },
    decrease() {
      this.count -= 1;
    },
  },
});
