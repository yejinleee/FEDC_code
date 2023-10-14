const storage = window.localStorage;

export const setItem = (key, value) => {
  try {
    // setItem은 브라우저 용량들의 이슈로 오류가 날 수 있으므로 try catch 이용 권장
    storage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

export const getItem = (key, value, defaultValue) => {
  // key에 해당하는 value가 없을 경우 defaultValue를 반환
  try {
    const storedValue = storage.getItem(key);
    if (!storedValue) {
      return defaultValue;
    }
    const parsedValue = JSON.parse(storedValue);
    return parsedValue;
  } catch (e) {
    return defaultValue;
  }
};
export const removeItem = (key) => {
  storage.removeItem(key);
};
