// creating

var emtpyObj = {};

var foo = {
	a: 10,
	b: 20
};

console.log(foo.a); // 10


// constructor

function Foo(a, b) {
	this.a = a;
	this.b = b;
}

var foo = new Foo(10, 20);

console.log(foo); // { a: 10, b: 20, }


// properties

var foo = {};

foo.type = 'dot syntax';
foo['date created'] = 'string with space';
foo[''] = 'even an empty string';

console.log(foo);
//	{
//		type: 'dot syntax',
//		'date created': 'string with space',
//		'': 'even an empty string'
//	};


// Object.create ...

// enumerating properties

var foo = {
	a: 10,
	b: 'bbb'
}

for (var i in foo) {
	console.log(i); // 'a', 'b'
}

var bar = {
	c: 'xyz'
};

bar.__proto__ = foo;

for (var i in bar) {
	console.log(i); // 'c', 'a', 'b'
}

for (var i in bar) {
	if (bar.hasOwnProperty(i)) {
		console.log(i); // 'c'
	}
}

console.log(Object.keys(foo)); // [ 'a', 'b' ]
console.log(Object.keys(bar)); // [ 'c' ]


// prototype ...


// method

var foo = {
	f: function () {
		this.a = 10;
		console.log('hi');
	}
};

console.log(foo.a); // undefined
foo.f(); // 'hi'
console.log(foo.a); // 10


// method on constructor

var goodDay = function () {
	return 'good day';
}

var Foo = function () {
	this.goodDay = goodDay;
}

var foo = new Foo();

console.log(foo.goodDay()); // 'good day'


// getters, setters

var foo = {
	a: 7,
	get b() {
		return this.a + 1;
	},
	set c(x) {
		this.a = x / 2;
	}
};

console.log(foo.a); // 7
console.log(foo.b); // 8
//console.log(foo.c); // undefined

foo.c = 20;

console.log(foo.a); // 10
console.log(foo.b); // 11
//console.log(foo.c); // undefined


// deleting property

var foo = {
	a: 10,
	b: 20
};

delete foo.a;
console.log(foo); // { b: 20 }


// deleting global var

g = 17;
console.log(g);
delete g;
//console.log(g); // ReferenceError: g is not defined

