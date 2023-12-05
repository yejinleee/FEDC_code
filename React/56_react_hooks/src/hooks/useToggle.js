import { useCallback, useState } from "react";

const useToggle = (initalState = false) => {
  const [state, setState] = useState(initalState);
  const toggle = useCallback(() => setState((state) => !state), []);

  return [state, toggle];
};

export default useToggle;
