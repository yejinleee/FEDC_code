// 이렇게 한 파일에 여러개를 export 하거나, 그런경우라 각 function이름과 파일명이 다를 땐 default 붙이지 말자

export function request(url, successCallback, failCallback) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", (e) => {
    if (xhr.readyState == 4) {
      if (xhr.status === 200) {
        successCallback(JSON.parse(xhr.responseText));
      } else {
        failCallback(xhr.statusText);
      }
    }
  });
  xhr.addEventListener("error", (e) => failCallback(xhr.statusText));

  xhr.open("GET", url);
  xhr.send();
}
