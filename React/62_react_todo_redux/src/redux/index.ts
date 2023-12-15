// 루트 리듀서
// 최상위 index.tsx에서 쓸 store값을 만들기 위해 리듀서 합치는 역할

import { combineReducers, createStore } from "redux"; // 지금 Redux라 deprecated된 createStore씀.. Redux Toolkit사용을 권장하고 있음
import { tasks } from "./tasks";

const rootReducer = combineReducers({ tasks });

export const store = createStore(rootReducer); // 이걸 최상단 index에서 불러씀. 즉 전역으로 관리할 수있는 tasks 데이터가 됨

export type RootState = ReturnType<typeof rootReducer>;
