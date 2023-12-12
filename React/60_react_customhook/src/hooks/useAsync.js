import { useEffect } from "react";
import useAsyncFn from "./useAsyncFn";

const useAsync = (fn, deps) => {
  const [value, callback] = useAsyncFn(fn, deps);

  useEffect(() => {
    callback();
  }, [callback]);

  return value;
};

export default useAsync;
