// 전역 오염을 최소화하기 위해 즉시실행함수(IIFE)를 이용하자
export const storageSetItem = (key, value) => {
  try {
    window.localStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};
export const storageGetItem = (key, defaultValue) => {
  try {
    const storedValue = window.localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }
    return defaultValue;
  } catch (e) {
    console.log(e);
    return defaultValue;
  }
};
