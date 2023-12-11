// 함수 호출을 통한 방법!!
import { useRef, useCallback, useEffect } from "react";

const useTimeoutFn = (fn, ms) => {
  const timeoutId = useRef();
  const callback = useRef(fn);

  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  const run = useCallback(() => {
    timeoutId.current && clearTimeout(timeoutId.current);

    timeoutId.current = setTimeout(() => {
      callback.current();
    }, ms);
  }, [ms]); // 왜 dependencies ms 하나뿐? timeoutId는..? 이거기준이뭐고,,

  const clear = useCallback(() => {
    timeoutId.current && clearTimeout(timeoutId.current);
  }, []);

  useEffect(() => clear, [clear]); // 꼭 !!
  return [run, clear];
};

export default useTimeoutFn;
