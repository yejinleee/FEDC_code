import { useState } from "react";
import { ITask } from "../utils/types/taskType";

const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, typeof setValue] => {
  // typeof setValue는 (value: ITask[]) => void 이거 대신쓴걸까?
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: ITask[]) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(err);
    }
  };
  return [storedValue, setValue];
};

export default useLocalStorage;
