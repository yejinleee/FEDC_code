import HomePage from "./Pages/HomePage.js";

export default function App({ $target }) {
  const homePage = new HomePage({ $target });
  this.route = () => {
    //pathname에 따라 페이지 렌더링 처리 ;

    const { pathname } = location;

    $target.innerHTML = ""; // 기존거 지우기
    if (pathname === "/") {
      //HomePage
      homePage.render();
    } else if (pathname.indexOf("/products/") > 0) {
      // ProductPage
    } else {
      $target.innerHTML = "404 Not Found";
      // 404처리?
    }
  };

  this.init = () => {
    this.route();
  };

  // 화면이동을 시킬 요소를 눌렀을 때 발생할것
  // 실제 화면이동이 아니라 url만 업데이트한다!!!
  window.addEventListener("click", (e) => {
    if (e.target.className === "link") {
      e.preventDefault();

      const { href } = e.target;
      history.pushState(null, null, href.replace(location.origin, ""));
      this.route();
    }
  });

  window.addEventListener("popstate", () => this.route);
  this.init();
}
