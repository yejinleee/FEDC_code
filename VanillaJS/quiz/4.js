/*
함수 스코프와 this
*/

/*
function RockBand(members) {
  this.members = members;
  this.perform = function () {
    setTimeout(function () {
      this.members.forEach(function (member) {
        member.perform();
      });
    }, 1000);
  };
}
var ciga = new RockBand([
  {
    name: "takuya",
    perform: function () {
      console.log("Sing : a e u i  ae eu i");
    },
  },
]);
ciga.perform();

// TypeError: Cannot read properties of undefined (reading 'forEach') /script.js:5
*/

// 해결법 1 : 화살표 함수
function RockBand(members) {
  this.members = members;
  this.perform = function () {
    setTimeout(() => {
      console.log(this);
      // RockBand {members: Array(1), perform: ƒ}
      this.members.forEach(function (member) {
        member.perform();
      });
    }, 1000);
  };
}

// 해결법 2 : bind 사용
function RockBand(members) {
  this.members = members;
  this.perform = function () {
    setTimeout(
      function () {
        this.members.forEach(function (member) {
          member.perform();
        });
      }.bind(this),
      1000
    );
  };
}

//해결법 3: 클로져 사용
function RockBand(members) {
  var that = this;
  this.members = members;
  this.perform = function () {
    setTimeout(
      function () {
        that.members.forEach(function (member) {
          member.perform();
        });
      }.bind(this),
      1000
    );
  };
}
