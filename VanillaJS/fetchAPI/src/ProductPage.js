import ProductOptions from "./ProductOptions.js";
import { request } from "./api.js";
import Cart from "./Cart.js";

export default function ProductPage({ $target, initialState }) {
  const $product = document.createElement("div");
  $target.appendChild($product);

  this.state = initialState;

  const productOptions = new ProductOptions({
    $target: $product,
    initialState: [],
    onSelect: (option) => {
      console.log(option);
    },
  });

  const cart = new Cart({
    $target: $product,
    initialState: {
      productName: "기본상품명",
      basePrice: 10000,
      selectedOptions: [
        {
          optionName: "cart더미_옵션1",
          optionPrice: 1000,
          ea: 1,
        },
        {
          optionName: "cart더미_옵션2",
          optionPrice: 2002,
          ea: 2,
        },
        {
          optionName: "cart더미_옵션3",
          optionPrice: 300,
          ea: 3, //선택한 갯수
        },
      ],
    },
    onRemove: () => {},
  });

  this.setState = (nextState) => {
    if (nextState.productId !== this.state.productId) {
      // 선택바뀌면 다시불러오는
      fetchOptionData(nextState.productId);
      return;
    }
    this.state = nextState;
    productOptions.setState(this.state.optionData);
    // Cart.setState({
    //   basePrice: product.basePrice,
    //   selectedProduct: this.state.selectedProduct,
    // });
  };

  this.render = () => {
    // 마크업을 그릴건 아님
  };
  this.render();

  const fetchOptionData = (productId) => {
    return request(`/products/${productId}`)
      .then((product) => {
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

        productOptions.setState(productData);
      });
  };

  fetchOptionData(this.state.productId);
}
