import { useEffect, useRef } from "react";
const events = ["mousedown", "touchstart"];

const useClickAway = (handler) => {
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleEvent = (e) => {
      !element.contains(e.target) && handler(e);
    };

    for (const event of events) {
      document.addEventListener(event, handleEvent);
    }
    return () => {
      for (const event of events) {
        document.removeEventListener(event, handleEvent);
      }
    };
  }, [ref, handler]);

  return ref;
};

export default useClickAway;
