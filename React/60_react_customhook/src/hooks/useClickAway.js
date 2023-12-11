import { useEffect, useRef } from "react";
const events = ["mousedown", "touchstart"];

const useClickAway = (handler) => {
  const ref = useRef(null);
  const savedHandler = useRef(handler);

  useEffect(() => {
    // 다시 렌더링되지 않고 ref 값 만 바꾸도록 할 수 있음!
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleEvent = (e) => {
      !element.contains(e.target) && savedHandler.current(e); // 원래 여기 handler(e)
      // handler가 바뀔때마다 이벤트를 add하고 remove 했어야했음..
    };

    for (const event of events) {
      document.addEventListener(event, handleEvent);
    }
    return () => {
      for (const event of events) {
        document.removeEventListener(event, handleEvent);
      }
    };
  }, [ref]);

  return ref;
};

export default useClickAway;
