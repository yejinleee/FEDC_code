import { request } from "../api.js";

export default function HomePage({ $target }) {
  const $home = document.createElement("div");

  // 여기서 바로 $target.appendChild 안한다!
  // App.js의 route()에서 어떤걸 렌더링할지 정하기 때문에

  this.render = () => {
    request("/products").then((products) => {
      $home.innerHTML = `
      <h1>HomePage</h1>
      <ul>
        ${products
          .map(
            (product) =>
              `<li>
              <a class="link" href="/products/${product.id}">
                ${product.name}
              </a>
            </li>`
          )
          .join("")}
      </ul>
      `;
      // 여기서 append
      $target.appendChild($home);
    });
  };
}
