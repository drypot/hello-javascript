// creating

var foo = [ 'a', 'b', 'c' ];
var foo = new Array('a', 'b', 'c');
var foo = Array('a', 'b', 'c');

console.log(foo[0]); // 'a'
console.log(foo.length); // 3

var foo = new Array(3);
var foo = Array(3);
var foo = []; foo.length = 3;

console.log(foo); // [ undefined, undefined, undefined, ]

var foo = [ 'a', , 'c' ];

console.log(foo); // ['a', undefined , 'c']


// length

var foo = [ 'a', 'b', 'c' ];
console.log(foo.length); // 3

foo.length = 2;
console.log(foo); // ['a', 'b']

foo.length = 0;
console.log(foo); // []

foo.length = 3;
console.log(foo); // [ undefined, undefined, undefined ]


// enumerating

var colors = [ 'red', 'green', 'blue' ];

for (var i = 0; i < colors.length; i++) {
	console.log(colors[i]); // 'red', 'green', 'blue'
}

colors.forEach(function(color) { // ECMAScript 5
	console.log(color);  // 'red', 'green', 'blue'
});

console.log([ 'a', 'b', 'c' ].map(function (item) {
	return item.toUpperCase();
})); // [ 'A', 'B', 'C' ]

console.log([ 'a', 10, 'b', 20 ].filter(function (item) {
	return typeof item === 'number';
})); // [ 10, 20 ]

function isNumber(value){
	return typeof value == 'number';
}

console.log([ 1, 2, 3 ].every(isNumber)); // true
console.log([ 1, '2', 3 ].every(isNumber)); // false

console.log([ 1, 2, 3 ].some(isNumber)); // true
console.log([ 1, '2', 3 ].some(isNumber)); // true
console.log([ '1', '2', '3' ].some(isNumber)); // false

console.log([ 1, 2, 3].reduce(function(first, second) {
	return first + second;
}, 0)); // 6

console.log([ 1, 2, 3].reduceRight(function(first, second) {
	return first + second;
}, 0)); // 6


// sorting

var arr = [ 52, 97, 3, 62, 10, 63, 64, 1, 9, 3, 4 ];

arr.sort()

console.log(arr); // [ 1, 10, 3, 3, 4, 52, 62, 63, 64, 9, 97 ]

arr.sort(function(a,b) {
	if (a < b) {
		return -1; }
	if (a > b) {
		return 1;
	}
	return 0;
});

console.log(arr); // [ 1, 3, 3, 4, 9, 10, 52, 62, 63, 64, 97 ]

console.log([ 1, 2, 3 ].reverse()); // [ 3, 2, 1 ]


// push, pop

var ary = [ 1, 2, 3 ];

ary.push(10);
console.log(ary); // [ 1, 2, 3, 10 ]

console.log(ary.pop()); // 10
console.log(ary); // [ 1, 2, 3 ]

var ary = [ 1, 2, 3 ];

console.log(ary.shift()); // 1
console.log(ary); // [ 2, 3 ]

var ary = [ 1, 2, 3 ];

console.log(ary.unshift(99)); // length, 4
console.log(ary); // [ 99, 1, 2, 3 ]


// concat, slice

console.log([ 1, 2, 9 ].concat(4, 5)); // [ 1, 2, 9, 4, 5 ]
console.log([ 1, 2, 9 ].concat([ 4, 5 ])); // [ 1, 2, 9, 4, 5 ]
console.log([ 1, 2, 9 ].concat([ 4, 5 ], [ 6, 7 ])); // [ 1, 2, 9, 4, 5, 6, 7 ]

console.log([ 1, 2, 3].join('-')); // '1-2-3'

var ary = [ 'a', 'b', 'c', 'd', 'e' ];

console.log(ary.slice(1, 3)); // [ 'b', 'c' ]
console.log(ary); // [ 'a', 'b', 'c', 'd', 'e' ]

var ary = [ 'a', 'b', 'c', 'd', 'e' ];

console.log(ary.splice(1, 3)); // [ 'b', 'c', 'd' ]
console.log(ary); // [ 'a', 'e' ]

var ary = [ 'a', 'b', 'c', 'd', 'e' ];

console.log(ary.splice(1, 3, 77, 99)); // [ 'b', 'c', 'd' ]
console.log(ary); // [ 'a', 77, 99, 'e' ]

var ary = [ 'a', 'b', 'c', 'd', 'e' ];

console.log(ary.splice(1, 3, [ 77, 99 ])); // [ 'b', 'c', 'd' ]
console.log(ary); // [ 'a', [ 77, 99 ], 'e' ]

// searching

console.log([ 'a', 'b', 'a', 'b', 'a' ].indexOf('b')); // 1
console.log([ 'a', 'b', 'a', 'b', 'a' ].indexOf('b', 2)); // 3
console.log([ 'a', 'b', 'a', 'b', 'a' ].indexOf('z')); // -1

console.log([ 'a', 'b', 'a', 'b', 'a' ].lastIndexOf('b')); // 3
