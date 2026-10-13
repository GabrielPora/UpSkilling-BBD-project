console.log("hello world");

console.log("Generic class example");
// @strict: false
class BeeKeeper {
  hasMask: boolean = true;
}

class ZooKeeper {
  nametag: string = "Mikle";
}

class Animal {
  numLegs: number = 4;
}

class Bee extends Animal {
  numLegs = 6;
  keeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
console.log(createInstance(Lion).keeper.nametag);
console.log(createInstance(Lion).numLegs);
console.log(createInstance(Bee).keeper.hasMask);
console.log(createInstance(Bee).numLegs);

console.log("Generic function example");

function loggingIdentity<Type>(arg: Array<Type>): Array<Type> {
  console.log(arg.length); // Array has a .length, so no more error
  return arg;
}

loggingIdentity([1, 2, 3]);
loggingIdentity(["a", "b", "c"]);
loggingIdentity([true, false, true]);
loggingIdentity([{ name: "Alice" }, { name: "Bob" }]);

console.log("Generic interface example");

interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: GenericIdentityFn = identity;
console.log(myIdentity("hello"));
console.log(myIdentity(42));
console.log(myIdentity(true));

console.log("Generic class example 2");

class GenericNumber<NumType> {
  zeroValue: NumType | undefined;
  add: ((x: NumType, y: NumType) => NumType) | undefined;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
  return x + y;
};

console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));

console.log("Generic constraints example");

interface Lengthwise {
  length: number;
}

function loggingIdentity2<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}

loggingIdentity2({ length: 10, value: 3 });
console.log(loggingIdentity2({ length: 10, value: 3 }));

console.log("Using Type Parameters in Generic Constraints");

function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

console.log(getProperty(x, "a"));
console.log(getProperty(x, "b"));
console.log(getProperty(x, "c"));
console.log(getProperty(x, "d"));

