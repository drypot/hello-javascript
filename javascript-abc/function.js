// function

function returnNothing() {
	return;
}

console.log(returnNothing()); // undefined


// function with parameter

function square(number) {
	return number * number;
}

console.log(square(10)); // 100


// if you like inefficiency.

var slow = new Function('a', 'return a * a * a;');

console.log(slow(2)); // 8


// anonymous function

var squareAnony = function (number) {
	return number * number
};

console.log(squareAnony(7)); // 49


// named anonymous function to refer itself

var factorial = function fac(n) { //
	return n < 2 ? 1 : n * fac(n - 1);
};

console.log(factorial(3)); // 6


// function as arguments

function mother(a, fn) {
	return fn(a);
}

function gift(a) {
	return a * 10;
}

console.log(mother(10, gift)); // 20


// closures are created when the inner function made available to outside of the outer function.

function outer(name) {
	function inner() {
		return name + name + name;
	}
	return inner;
}

console.log(outer('abc')()); // 'abcabcabc'


// arguments are maintained in an array-like object.

function printArg() {
	for (var i = 0; i < arguments.length; i++) {
		console.log(arguments[i]);
	}
}

printArg('a', 'b', 'c'); // a, b, c


// passing arguments through

function passArg() {
	printArg.apply(this, arguments);
}

passArg('d', 'e', 'f'); // d, e, f


// function declaration can be below the call

console.log(funcBelow());

function funcBelow(){
	return 'below';
}


// functions should be at top level, SO, DO NOT THIS

if (true){
	function doNotThis() {
	}
}


// dump function source

console.log(passArg.toString());
