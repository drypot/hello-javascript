var Obj = function() {
  this.value = 10;
}

Obj.prototype = {
  set value(v) {
    this.value2 = v + 30;
  },
  get value() {
    return this.value2;
  }
}

var o = new Obj();
console.log(o);
o.value = 30;
console.log(o);

// 결과

// { value2: 40 }
// { value2: 60 }
