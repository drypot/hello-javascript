// literal, name

console.log(0); // 0

console.log(NaN); // NaN


// ()

console.log((10 + 20) * 3); // 90


// member, new

console.log({ x : 101 }.x); // 101
console.log([ 101, 102, 103][1]); // 102
console.log(new Object()); // {}


// function call

console.log(parseInt('200')); // 200


// increment, decrement

var x = 300;
console.log(x++);
console.log(x--);


// unary

console.log(!true); // logical not
console.log(~1); // bitwise not

console.log(+10);
console.log(-10);

console.log(typeof 10); // 'number'

console.log(delete { x: 10 }.x); // true
console.log(delete { x: 10 }.y); // true

console.log(void (function () {
	console.log('in void');
	return 'out void';
})()); // 'in void', undefined, void evaluates expression but not return value


// multiplication

console.log(55 * 10); // 550
console.log(55 / 10); // 5.5
console.log(55 % 10); // 5


// addition

console.log(55 + 10);
console.log(55 - 10);


// bitwise shift

console.log(1 << 3);  // 8
console.log(8 >> 3);  // 1

console.log(-1 << 3); // -8
console.log(-8 >> 3); // -1, sign reserved
console.log(-8 >>> 3); // 536870911, zero filled


// relational

console.log(10 >= 5);
console.log(10 <= 5);
console.log(10 > 5);
console.log(10 < 5);

console.log('NaN' in global); // true

console.log('string' instanceof String); // false
console.log(new String('string') instanceof String); // true


// equality

console.log(10 == '10'); // true
console.log(10 != '10'); // false

console.log(10 === '10'); // false
console.log(10 !== '10'); // true


// bitwise and

console.log(7 & 2); // 2, bitwise operators treat operands as 32 bits


// bitwise xor

console.log(7 ^ 2); // 5


// bitwise or

console.log(4 | 2); // 6


// logical and

console.log(true && 10); // 10
console.log(false && 10); // false


// logical or

console.log(10 || 20); // 10
console.log(false || 20); // 20


// conditional

console.log(true ? 40 : 50); // 40


// assignment

console.log(x = 60); // 60


// comma

console.log((70, 80, 90)); // 90
