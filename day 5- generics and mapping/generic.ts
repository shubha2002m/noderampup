// Generic function that returns the same type of value
function identity<T>(arg: T): T {
    return arg;
  }
  
  let num = identity(42);  // T is inferred as number
  let str = identity("Hello World");  // T is inferred as string
  let bool = identity(true);  // T is inferred as boolean
  
  console.log(num);  // Output: 42
  console.log(str);  // Output: Hello World
  console.log(bool);  // Output: true
  
  //Multiple generics, A generic function that swaps two values of any type
// function swap<A, B>(a: A, b: B): [B, A] {
//   return [b, a];
// }

// let swapped = swap(1, "hello");  // A = number, B = string
// console.log(swapped);  // Output: ["hello", 1]
