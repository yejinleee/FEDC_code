import ProductOptions from "./ProductOptions.js";
import { request } from "./api.js";

const $target = document.querySelector("#app");

const fetchOptionData = (productId) => {
  return request(`/products/${productId}`)
    .then((product) => {
      return request(`/product-options?product.id=${product.id}`);
    })
    .then((productOptions) => {
      return Promise.all([
        Promise.resolve(productOptions),
        Promise.all(
          productOptions
            .map((productOption) => productOption.id)
            .map((id) => {
              return request(`/product-option-stocks?productOption.id=${id}`);
            })
        ),
      ]);
    })
    .then((data) => {
      const [optionData, stocksData] = data;
      const productData = optionData.map((optionDataEach, idx) => {
        const stock = stocksData[idx][0].stock;
        return {
          id: optionDataEach.id,
          optionName: optionDataEach.optionName,
          optionPrice: optionDataEach.optionPrice,
          stock: stock,
        };
      });
      productOptions.setState(productData);
    });
};
fetchOptionData(1);

const productOptions = new ProductOptions({
  $target,
  initialState: [],
  onSelect: (selectedOption) => {
    console.log(selectedOption.optionName);
  },
});
