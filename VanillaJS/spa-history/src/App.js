import HomePage from "./Pages/HomePage.js";
import ProductPage from "./Pages/ProductPage.js";

export default function App({ $target }) {
  const homePage = new HomePage({ $target });
  const productPage = new ProductPage({ $target, initialState: {} });

  this.route = () => {
    //pathname에 따라 페이지 렌더링 처리 ;
    const { pathname } = location;

    $target.innerHTML = ""; // 기존거 지우기
    if (pathname === "/") {
      homePage.render();
    } else if (pathname.indexOf("/products/") > -1) {
      // ProductPage
      // url에서 productId 얻기
      // pathname.split('/') 이면 [~~, products, ~ ]  일테니까
      // const productId = pathname.split('/products/')[1]; 혹은
      const [, , productId] = pathname.split("/");
      productPage.setState({ productId });
    } else {
      $target.innerHTML = "404 Not Found";
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

  window.addEventListener("popstate", () => this.route());
  this.init();
}
