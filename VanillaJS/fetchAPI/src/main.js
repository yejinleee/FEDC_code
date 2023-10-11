import ProductOptions from "./ProductOptions.js";

const dummyData = [
  {
    id: 1,
    optionName: "더미데이터",
    optionPrice: 10000,
    stock: 10,
  },
  {
    id: 2,
    optionName: "더미데이터2",
    optionPrice: 2000,
    stock: 0,
  },
  {
    id: 3,
    optionName: "더미데이터3",
    optionPrice: 441,
    stock: 100,
  },
];

const $target = document.querySelector("#app");
new ProductOptions({
  $target,
  initialState: dummyData,
  onSelect: (selectedOption) => {
    console.log(selectedOption.optionName);
  },
});
