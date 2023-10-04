/*
클로져
*/

/*
const numbers = [0,1,2,3,4]
for (var i=0; i<numbers.length; i++){
  (function(idx){
    setTimeout(function(){
    console.log(`[${idx}] number ${numbers[idx]} turn!`)
  }, i*1000)
  })(i)
}
// 출력은 1초마다 모두 [5] number undefined turn! 가 된다.
*/

//해결법 1 : IIFE (즉시 실행 함수)
const numbers = [0, 1, 2, 3, 4];
for (var i = 0; i < numbers.length; i++) {
  (function (idx) {
    setTimeout(function () {
      console.log(`[${idx}] number ${numbers[idx]} turn!`);
    }, i * 1000);
  })(i);
}

// 해결법 2 : var 대신 let
const numbers2 = [0, 1, 2, 3, 4];
for (let i = 0; i < numbers2.length; i++) {
  setTimeout(function () {
    console.log(`[${i}] number ${numbers2[i]} turn!`);
  }, i * 1000);
}

// 해결법 3 : for 대신 forEach
const numbers3 = [0, 1, 2, 3, 4];
numbers3.forEach(function (number, i) {
  setTimeout(function () {
    console.log(`[${i}] number ${numbers3[i]} turn!`);
  }, i * 1000);
});
