import ProductOptions from "./ProductOptions.js";
import ProductPage from "./ProductPage.js";
import { request } from "./api.js";

const $target = document.querySelector("#app");

new ProductPage({
  $target,
  initialState: {
    productId: 1,
  },
});

/*
state 구조
{
	productId : 1,
	product: Product, //첫번째 api로 불러온 product 데이터
	optionData: [], // 우리에게 필요한 데이터 모아서저장했던 데이터
}
*/
