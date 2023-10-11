// state 형태
// {
//   productName : 상품명,
//   basePrice : 상품 기본 가격,
//   selectedOptions: [Option]
// }

export default function Cart({ $target, initialState, onRemove }) {
  const $cart = document.createElement("div");
  $target.appendChild($cart);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const calcurateTotalPrice = () => {
    const { basePrice, selectedOptions } = this.state;
    return selectedOptions.reduce(
      (acc, option) => acc + (basePrice + option.optionPrice) * option.ea,
      0
    );
  };

  this.render = () => {
    const { productName, basePrice, selectedOptions } = this.state;
    $cart.innerHTML = `
    <ul>
      ${
        Array.isArray(selectedOptions) &&
        selectedOptions
          .map(
            (option) => `
          <li>
            ${productName} - ${option.optionName} | ${
              basePrice + option.optionPrice
            }
            x ${option.ea}개
          </li>`
          )
          .join("")
      }
    </ul>
    <div>
      총 가격 : ${calcurateTotalPrice()}
    </div>`;
  };

  this.render();
}
