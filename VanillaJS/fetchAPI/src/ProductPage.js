import ProductOptions from "./ProductOptions.js";
import { request } from "./api.js";

export default function ProductPage({ $target, initialState }) {
  const $product = document.createElement("div");
  $target.appendChild($product);

  const productOptions = new ProductOptions({
    $target: $product,
    initialState: [],
    onSelect: (option) => {
      console.log(option);
    },
  });

  this.state = initialState;

  this.setState = (nextState) => {
    console.log(nextState.productId, this.state.productId);
    if (nextState.productId !== this.state.productId) {
      // 선택바뀌면 다시불러오는
      fetchOptionData(nextState.productId);
      return;
    }
    this.state = nextState;
    productOptions.setState(this.state.optionData);
  };

  this.render = () => {
    // 마크업을 그릴건 아님
  };
  this.render();

  const fetchOptionData = (productId) => {
    return request(`/products/${productId}`)
      .then((product) => {
        console.log("!!", product);
        this.setState({
          ...this.state,
          product, // 프로덕트(이하소분류)정보
          optionData: [],
        });
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
        //강의에선 optionData라 명명
        const productData = optionData.map((optionDataEach, idx) => {
          const stock = stocksData[idx][0].stock;
          return {
            id: optionDataEach.id,
            optionName: optionDataEach.optionName,
            optionPrice: optionDataEach.optionPrice,
            stock: stock,
          };
        });
        this.setState({
          ...this.state,
          optionData: productData,
        });
        console.log(this.state);

        productOptions.setState(productData);
      });
  };

  fetchOptionData(this.state.productId);
}
