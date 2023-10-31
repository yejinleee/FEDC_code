export const API_END_POINT = "https://kdt-frontend.cat-api.programmers.co.kr";

export const request = async (url) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`);
    if (!res.ok) {
      throw new Error("API 호출 에러");
    }
    return res.json();
  } catch (e) {
    alert(e.message);
  }
};
