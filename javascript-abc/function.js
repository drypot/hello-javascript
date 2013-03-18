var assert = require('assert');

// function

function returnNothing() {
	return;
}

assert.equal(returnNothing(), undefined);
assert.equal(returnNothing.__proto__, Function.prototype);


// function with parameter

function square(number) {
	return number * number;
}

assert.equal(square(10), 100);


// if you like inefficiency.

var slow = new Function('a', 'return a * a * a;');

assert.equal(slow(2), 8);


// anonymous function

var squareAnony = function (number) {
	return number * number
};

assert.equal(squareAnony(7), 49);


// named anonymous function to refer itself

var factorial = function fac(n) { //
	return n < 2 ? 1 : n * fac(n - 1);
};

assert.equal(factorial(3), 6);


// function invocation pattern

function func() {
	return this;
}

assert.equal(func(), global);


// constructor invocation pattern

var Constructor = function () {
	this.x = 10;
}

assert.equal(new Constructor().x, 10);


// method invocation pattern

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


// apply invocation pattern

var xy = { x:10, y :20 };

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

function printArg() {
	var r = [];
	for (var i = 0; i < arguments.length; i++) {
		r.push(arguments[i]);
	}
	return r;
}

assert.deepEqual(printArg('a', 'b', 'c'), [ 'a', 'b', 'c' ]);


// passing arguments through

function passArg() {
	return printArg.apply(this, arguments);
}

assert.deepEqual(passArg('d', 'e', 'f'), [ 'd', 'e', 'f' ]);


// closure, created when the inner function exposed to outside of the outer.

function outer(name) {
	function inner() {
		return name + name + name;
	}
	return inner;
}

var inner = outer('abc');

assert.equal(inner(), 'abcabcabc');


// composing object with literal

var obj = {
	x : 10,
	getX: function () {
		return this.x;
	}
};

assert.equal(obj.getX(), 10);


// composing object with closure

var obj = (function () {
	var x = 20;

	return {
		getX: function () {
			return x;
		}
	}
})();

assert.equal(obj.getX(), 20);


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

assert.equal(typeof passArg.toString(), 'string');


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
