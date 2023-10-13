/*
this는 함수가 실행되는 시점에 결정된다.
*/

function Cat(name, age) {
  this.name = name;
  this.age = age;

  this.printCatInfo = () => {
    console.log(`${this.name}은 ${this.age}살 고양이`);
  };
}

/*
const tabb1 = Cat('nana', 7);
console.log(tabby1.name)
Cat함수를 실행했을 때 this는 window를 가리킨다. 
*/

// new를 사용하여 새로운 객체로 생성한다
const tabby1 = new Cat("nana", 7);
console.log(tabby1);
// >> Cat {name: "nana", age: 7, printCatInfo: ƒ}

const tabby2 = new Cat("neo", 3);
console.log(tabby2);
// >> Cat {name: "neo", age: 3, printCatInfo: ƒ}

tabby1.printCatInfo();
// >> nana은 7살 고양이
tabby2.printCatInfo();
// >> neo은 3살 고양이
