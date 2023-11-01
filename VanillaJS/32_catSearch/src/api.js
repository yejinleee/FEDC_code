const API_END_POINT =
  "https://kdt-frontend.cat-search-api.programmers.co.kr/api/cats";

export const requet = async (url) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`);

    if (!res.ok) {
      throw new Error("API 호출에 실패했습니다");
    }
    return await res.json();
  } catch (e) {
    alert(e);
  }
};
