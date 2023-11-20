interface TypeName {
  name: string;
}
interface TypeAge extends TypeName {
  age: number;
}

const nameNage: TypeAge = {
  name: "a",
  age: 0,
};

interface WidhLength {
  length: number;
}

const a: WidhLength = [1, 2, 3];
