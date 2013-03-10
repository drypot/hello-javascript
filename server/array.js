// creating array

var assert = require('assert');

var foo = ['a', 'b', 'c']; // all same
var foo = new Array('a', 'b', 'c');
var foo = Array('a', 'b', 'c');

assert.equal(foo[0], 'a');
assert.equal(foo.length, 3);

var foo = new Array(3); // all same
var foo = Array(3);
var foo = []; foo.length = 3;

var foo = ['a', , 'c'];

assert.equal(foo[0], 'a'); // 'a', undefined , 'c'
assert.equal(foo[1], undefined);

// length

var foo = ['a', 'b', 'c'];
assert.equal(foo.length, 3);

foo.length = 2;
assert.equal(foo.length, 2);
assert.equal(foo[0], 'a');
assert.equal(foo[1], 'b');
assert.equal(foo[2], undefined);

foo.length = 0;
assert.equal(foo.length, 0);
assert.equal(foo[0], undefined);

foo.length = 3;
assert.equal(foo.length, 3);
assert.equal(foo[0], undefined);
assert.equal(foo[1], undefined);
assert.equal(foo[2], undefined);

// Enumerating

var colors = ['red', 'green', 'blue'];

for (var i = 0; i < colors.length; i++) {
	console.log(colors[i]); // 'red', 'green', 'blue'
}

colors.forEach(function(color) { // ECMAScript 5
	console.log(color);  // 'red', 'green', 'blue'
});

// Sorting

var arr = [52, 97, 3, 62, 10, 63, 64, 1, 9, 3, 4];

arr.sort()

console.log(arr);

arr.sort(function(a,b) {
	if (a < b) {
		return -1; }
	if (a > b) {
		return 1;
	}
	return 0;
});

console.log(arr);
