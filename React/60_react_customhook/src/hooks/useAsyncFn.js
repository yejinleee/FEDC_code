import { useCallback, useRef, useState } from "react";

const useAsyncFn = (fn, deps) => {
  const [state, setState] = useState({ isLoading: false }); // 리턴될 value, 에러일 경우 error 등 undefined 속성 더 있음.ts 라면 미리 타입 지정필요

  const lastCallId = useRef(0); // 여러번 호출시 마지막 값을 보내기 위해서 식별할 아이디값

  // 실행할 (비동기) 함수
  const callback = useCallback((...args) => {
    const callId = ++lastCallId.current;
    if (!state.isLoading) {
      setState({ ...state, isLoading: true });
    }

    return fn(...args).then(
      ///인자로 받은 비동기함수fn 실행하고, 그게 성공/실패 인지에 따라 리턴값 지정
      (value) => {
        // id 값 같을때만 상태변경
        callId === lastCallId.current && setState({ value, isLoading: false });
        return value;
      },
      (error) => {
        callId === lastCallId.current && setState({ error, isLoading: false });
        return error;
      }
    );
    //eslint-disable-next-line
  }, deps);

  return [state, callback];
};

export default useAsyncFn;
