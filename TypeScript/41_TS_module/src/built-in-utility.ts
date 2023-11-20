interface User {
  name: string;
  nick?: string;
  age?: number;
}
const userA: User = {
  // 여기선 age 속성이 없어서 오류!
  name: "A",
};

// const userB: Required<User> = {
//   name: "B",
// };
interface PartialUser {
  // 이런 타입이 되는 셈
  name?: string;
  age?: number;
}
