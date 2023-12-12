// 함수 호출을 통한 방법!!
import { useRef, useCallback, useEffect } from "react";

const useIntervalFn = (fn, ms) => {
  const intervalId = useRef();
  const callback = useRef(fn); // 함수 최적화 - 인터벌인 경우 필수 !

  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  const run = useCallback(() => {
    intervalId.current && clearInterval(intervalId.current);

    intervalId.current = setInterval(() => {
      callback.current();
    }, ms);
  }, [ms]);

  const clear = useCallback(() => {
    intervalId.current && clearInterval(intervalId.current);
  }, []);

  useEffect(() => clear, [clear]); // 뒷정리 꼭 !!
  return [run, clear];
};

export default useIntervalFn;
