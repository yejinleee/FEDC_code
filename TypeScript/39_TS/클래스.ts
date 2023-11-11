class Animal {
  private name: string;
  readonly sound: string;
  constructor(name: string, sound: string) {
    this.name = name;
    this.sound = sound;
  }
}
/*
class Animal {
  constructor( private name: string, readonly sound: string) {
  }
} */

class Dog extends Animal {
  public color: string;
  constructor(name: string, sound: string, color: string) {
    super(name, sound);
    this.color = color; // 이또한 위의 string
  }
  public static speak() {
    // return this.sound;
  }
  getColor() {
    return this.color;
  }
}
Dog.speak();
const dog = new Dog("흰둥", "멍멍", "white");
dog.speak();
dog.getColor();
dog.name; ///
dog.sound;
dog.color;
