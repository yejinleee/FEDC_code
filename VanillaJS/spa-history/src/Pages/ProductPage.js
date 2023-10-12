import ProductOptions from "../ProductOptions.js";
import { request } from "../api.js";
import Cart from "../Cart.js";
//state
// {
// 	productId : 1,
// 	product: Product, //첫번째 api로 불러온 product 데이터
// 	optionData: [], // 우리에게 필요한 데이터 모아서저장했던 데이터
// }
export default function ProductPage({ $target, initialState }) {
  const $product = document.createElement("div");
  // $target.appendChild($prod uct); //바로 append 놉!

  this.state = initialState;

  const productOptions = new ProductOptions({
    $target: $product,
    initialState: [],
    onSelect: (option) => {
      const nextState = { ...this.state }; /// 객체임!
      const { selectedOptions } = nextState;
      const selectedOptionIndex = selectedOptions.findIndex(
        (selectedOption) => selectedOption.optionId === option.id
      ); ///그냥 .id
      // -1이었다가 0 이됨. -1일때는 실행되면 안되니까
      if (selectedOptionIndex > -1) {
        nextState.selectedOptions[selectedOptionIndex].ea++;
      } else {
        nextState.selectedOptions.push({
          optionId: option.id, ///그냥 .id
          optionName: option.optionName,
          optionPrice: option.optionPrice,
          ea: 1,
        });
      }
      this.setState(nextState);
    },
  });

  const cart = new Cart({
    $target: $product,
    initialState: {
      productName: "",
      basePrice: 0,
      selectedOptions: [],
    },
    onRemove: (selectedOptionIndex) => {
      const nextState = { ...this.state };
      // selectedOptionIndex에 해당하는걸 빼자
      // array에선 slice이용 혹은 splice!!
      //splice : selectedOptionIndex에서부터 1개 빼서 새로운 배열 만들라는 뜻
      // 그걸 받는게 없으니까 그냥 날라가는겨
      nextState.selectedOptions.splice(selectedOptionIndex, 1);

      this.setState(nextState);
    },
  });

  this.setState = (nextState) => {
    if (nextState.productId !== this.state.productId) {
      // 선택바뀌면 다시불러오는
      fetchOptionData(nextState.productId);
      return;
    }
    this.state = nextState;
    const { product, selectedOptions, optionData } = this.state;

    productOptions.setState(this.state.optionData);

    cart.setState({
      productName: product.name, /// name 임@
      basePrice: product.basePrice,
      selectedOptions: selectedOptions, /// 키이름 selectedOptions임!
    });

    this.render(); // 여기에 추가
  };

  this.render = () => {
    $target.appendChild($product);
  };
  // this.render(); //이거도 실행 x

  const fetchOptionData = (productId) => {
    return request(`/products/${productId}`)
      .then((product) => {
        this.setState({
          ...this.state,
          product, // 프로덕트(이하소분류)정보
          optionData: [],
          selectedOptions: [], /// .... 이걸추가해야해암튼
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

  // fetchOptionData(this.state.productId);
  // 실제로 렌더링이 되지 않더라도 ProductPage가 생성되는 순간 fetchOptionData등이 실행되면서 문제 생길 수 있음
}
