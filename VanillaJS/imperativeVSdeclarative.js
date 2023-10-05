// 명령형 Imperative
function double(arr) {
  let results = [];
  for (let i = 0; i < arr.length; i++) {
    results.push(arr[i] * 2);
  }
  return results;
}
console.log(double([1, 2, 3, 4]));

// 선언형 Declarative
function doubleD(arr) {
  return arr.filter((a) => typeof a === "number").map((number) => number * 2);
}
console.log(doubleD([1, 2, 3, 4]));

function filterCats(cats) {
  return cats
    .filter(
      (cat) => cat && cat.colors.includes("black") && cat.ear === "unfolded"
    )
    .map((cat) => cat.name);
}
