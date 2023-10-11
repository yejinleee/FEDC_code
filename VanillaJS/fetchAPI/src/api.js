// 서버 앞단 도메인을 상수로 두는게 좋다.
// 실무에선 운영서버, 개발 서버가 다를 수 있다. 그래서 앞 도메인만 뽑아두는게 ㅈㅎ음
const API_END_POINT = "https://kdt-frontend.programmers.co.kr";

export const request = (url) => {
  if (url.startsWith("/")) {
    url = url.replace("/", "");
  }
  return fetch(`${API_END_POINT}/${url}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(`${res.status} Error`);
    })
    .catch((e) => alert(e.message));
};
