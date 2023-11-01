const storage = window.sessionStorage;

export const getSessionItem = (key, defaultValue) => {
  try {
    const storedValue = storage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }
    return defaultValue;
  } catch {
    return defaultValue;
  }
};

export const setSessionItem = (key, value) => {
  storage.setItem(key, JSON.stringify(value));
};
