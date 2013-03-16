

console.log(0);        // there is no integer type.
console.log(42);       // always 64bit floating point.
console.log(3.14159);
console.log(1e2);      // 100

console.log(10);       // base 10
console.log(070);      // base 8
console.log(0x1123);   // base 16

console.log(NaN);      // global.NaN
console.log(Infinity); // global.Infinity, greater than 1.79769313486231570e+308

console.log(parseInt('11'));   // 11
console.log(parseInt('11.1')); // 11
console.log(parseInt('11xx')); // 11
console.log(parseInt('xx'));   // NaN
console.log(parseInt(''));     // NaN

console.log(parseFloat('11.1')); // 11.1

console.log(typeof '11');   // 'string'
console.log(typeof +'11');  // 'number'

