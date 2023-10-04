/*
함수 스코프
*/

var idiots = {
  name: "idiots",
  genre: "punk rock",
  members: {
    roto: {
      memberName: "roto",
      play: function () {
        console.log(this);
        // Object {memberName: "roto", play: ƒ}
        // memberName: "roto"
        // play: ƒ ()
        // __proto__: Object

        // 여기서 this는 roto 객체이기에 name이 없다.
        console.log(`band ${this.name}`);
        // band undefined
        console.log(`${this.memberName} play`);
        // roto play
      },
    },
  },
};
idiots.members.roto.play();

// 해결방법
var idiots = {
  name: "idiots",
  genre: "punk rock",
  members: {
    roto: {
      memberName: "roto",
      play: function () {
        console.log(`band ${idiots.name}`); // !! idiots를 바로 가리키자
        // band idiots
        console.log(`${this.memberName} play`);
        // roto play
      },
    },
  },
};
idiots.members.roto.play();
