interface User {
  name: string;
}

function greet(this: User, msg: string) {
  // name이란 속성이 꼭 존재해야함. 이 this가 최소 User의 구조를 가진다고 명시적으로 알려주는것
  return `Hello ${this.name}, ${msg}`;
}

const hero = {
  name: "hero",
  greet: greet,
};

hero.greet("Good morning");

const neo = {
  name: "Neo",
};
greet.call(neo, "Have a good day");
