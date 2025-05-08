// A generic function with a constraint that T must be a type that has a 'length' property
function logLength<T extends { length: number }>(arg: T): T {
    console.log(arg.length);
    return arg;
  }
  
  logLength([1, 2, 3]);  // Array of numbers
  logLength("Hello");    // String
  
  // logLength(42);  // Error: Argument of type '42' is not assignable to parameter of type '{ length: number; }'.
  

//   The T type must have a length property. You can pass types like string or array which have the length property, but you cannot pass a number or an object that doesn't have length.

//generic constraints with multiple types
// interface Product {
//     name: string;
//     price: number;
//   }
  
//   function printProduct<T extends Product>(product: T): void {
//     console.log(`${product.name} costs ${product.price}`);
//   }
  
//   const product = { name: "Laptop", price: 1200 };
//   printProduct(product);  // Output: Laptop costs 1200
  