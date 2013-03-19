var assert = require('assert');

// creating function

function returnNothing() {
	return;
}

assert.equal(returnNothing(), undefined);
assert.equal(returnNothing.__proto__, Function.prototype);

function square(number) {
	return number * number;
}

assert.equal(square(10), 100);


// creating function with constructor, inefficient.

var slow = new Function('a', 'return a * a * a;');

assert.equal(slow(2), 8);


// creating anonymous function

var squareAnony = function (number) {
	return number * number
};

assert.equal(squareAnony(7), 49);


// named anonymous function to refer itself

var factorial = function fac(n) { //
	return n < 2 ? 1 : n * fac(n - 1);
};

assert.equal(factorial(3), 6);


// creating function with closure

var xyAdder = function (x) {
	var y = 20;
	return function () {
		return x + y;
	};
}

assert.equal(xyAdder(10)(), 30);


// this in normal function

function func() {
	return this;
}

assert.equal(func(), global);


// this in constructor

var Constructor = function () {
	this.x = 10;
}

assert.equal(new Constructor().x, 10);


// this in method

var foo = {
	method1: function () {
		return this;
	},
	method2: function () {
		function inner() {
			return this;
		}
		return inner();
	},
	method3: function () {
		var _this = this;
		function inner() {
			return _this;
		}
		return inner();
	}
}

assert.equal(foo.method1(), foo);
assert.equal(foo.method2(), global);
assert.equal(foo.method3(), foo);


// this on apply invocation

var xy = { x: 10, y: 20 };

var sumXyCd = function (c, d) {
	return this.x + this.y + c + d;
}

assert.equal(sumXyCd.apply(xy, [ 30, 40 ]), 100);
assert.equal(sumXyCd.call(xy, 30, 40), 100);


// function as arguments

function mother(a, fn) {
	return fn(a);
}

function gift(a) {
	return a * 10;
}

assert.equal(mother(10, gift), 100);


// arguments are maintained in an array-like object.

function print() {
	var r = [];
	for (var i = 0; i < arguments.length; i++) {
		r.push(arguments[i]);
	}
	return r;
}

assert.deepEqual(print('a', 'b', 'c'), [ 'a', 'b', 'c' ]);


// passing arguments through

function pass() {
	return print.apply(this, arguments);
}

assert.deepEqual(pass('d', 'e', 'f'), [ 'd', 'e', 'f' ]);


// memoization

var sum = (function () {
	var memo = [0];
	return function sum(n) {
		var result = memo[n];
		if (typeof result !== 'number') {
			memo[n] = result = n + sum(n-1);
		}
		return result;
	};
}());

assert.equal(sum(0), 0);
assert.equal(sum(3), 6);


// function declaration can be below the call

assert.equal(funcBelow(), 'below');

function funcBelow(){
	return 'below';
}


// functions should be at top level, SO, DO NOT THIS

if (true){
	function doNotThis() {
	}
}


// dump function source

assert.equal(typeof pass.toString(), 'string');


// function object creation

var r1 = [];
var r2 = [];
var r3 = [];

function makeFunction() {

	function inner1() {
	}

	var inner2 = function () {
	}

	r1.push(inner1);
	r2.push(inner2);
	r3.push(makeFunction);
}

makeFunction();
makeFunction();

assert.notEqual(r1[0], r1[1]);
assert.notEqual(r2[0], r2[1]);
assert.equal(r3[0], r3[1]);
