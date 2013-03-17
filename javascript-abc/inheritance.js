

// prototype of empty object

var emptyObj = {};



// prototype of constructed object

function Super() {
	this.superProp = 'from super';
}

var su = new Super();

console.log(su.__proto__ === Object.prototype); // false


function Sub() {
	this.subProp = 'from sub';
}

Sub.prototype = new Super();

var sub = new Sub();

console.log(sub.__proto__ === Sub.prototype); // true
console.log(sub instanceof Sub);              // true, shortcut


//

for (var p in sub) {
	console.log(p); // 'subProp', 'superProp'
}

for (var p in sub) {
	if (sub.hasOwnProperty(p)) {
		console.log(p); // 'subProp'
	}
}


//

sub.superProp = 'from sub';

for (var p in sub) {
	if (sub.hasOwnProperty(p)) {
		console.log(p); // 'subProp', 'superProp'
	}
}

console.log(sub.superProp); // 'from sub';
console.log(sub.__proto__.superProp); // 'from super'





// http://ejohn.org/blog/simple-javascript-inheritance/

(function () {



	var initializing = false,
		superPattern = /xyz/.test(function () { xyz; }) ? /\b_super\b/ : /.*/;

	Object.subClass = function (properties) {
		var _super = this.prototype;

		initializing = true;
		var proto = new this();
		initializing = false;

		for (var name in properties) {
			proto[name] = typeof properties[name] == "function" &&
				typeof _super[name] == "function" &&
				superPattern.test(properties[name]) ?
				(function (name, fn) {
					return function () {
						var tmp = this._super;
						this._super = _super[name];
						var ret = fn.apply(this, arguments);
						this._super = tmp;
						return ret;
					};
				})(name, properties[name]) :
				properties[name];
		}

		function Class() {
			// All construction is actually done in the init method
			if (!initializing && this.init)
				this.init.apply(this, arguments);
		}

		Class.prototype = proto;
		Class.constructor = Class;
		Class.subClass = arguments.callee;
		return Class;
	}
})();

// TODO: 셈플 코드
