import { HashMap } from "./hashmap.js";

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.bucket);
console.log(`Length: ${test.bucket.length}`);

test.set("moon", "silver");
console.log(test.bucket);
console.log(`Length: ${test.bucket.length}`);

console.log(`${test.has("kite")}`);
test.remove("dog");
console.log(test.entries());
