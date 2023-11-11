interface UserBase {
  name: string;
  age: number;
}

interface User extends UserBase {
  updateInfo(newUser: UserBase): User; // 여기엔 두번쨰 매개변수가 없는거다. 그래서 아래에 age? 임.
  updateInfo(name: string, age: number): User;
} // 같은 updateInfo가 두번 선언되었음. 속성 순서는 중요!!!!

const user: User = {
  name: "hero",
  age: 80,
  updateInfo: function (nameOrUser: UserBase | string, age?: number) {
    if (typeof nameOrUser === "string" && age !== undefined) {
      this.name = nameOrUser;
      this.age = age;
    } else if (typeof nameOrUser === "object") {
      this.name = nameOrUser.name;
      this.age = nameOrUser.age;
    }
    return this; // 현재 객체 User 반환
  },
};

console.log(user.updateInfo("Leon", 49)); // if에 들어감
// {naem : 'Leon', age : 49, updateInfo: f} // 객체데이터 반환

console.log(user.updateInfo({ name: "Neo", age: 22 })); // UserBase 객체임 -> else if
// {naem : 'Neo', age : 22, updateInfo: f} // 객체데이터 반환
