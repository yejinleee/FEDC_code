export const API_END_POINT = "https://kdt-frontend.todo-api.programmers.co.kr";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json", //<<-- !!!! 이렇게 !
      },
    });
    if (res.ok) {
      //ok 검사 꼭 !!
      return res.json();
    }
    throw new Error("API 호출 오류");
  } catch (e) {
    // 여기서 ui 처리도 있는게 베스트 ~
    alert(e.message);
  }
};
