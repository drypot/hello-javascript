var largeObject = {};
var smallObject = {};

var x, i;

for (i = 0; i < 1000000; i++) {
   largeObject['a' + i] = i;
}

for (i = 0; i < 1000; i++) {
   smallObject['b' + i] = i;
}

console.time('10k Accesses from largeObject');
for (i = 0; i < 10000; i++) x = largeObject['a' + (i % 1000000)];
console.timeEnd('10k Accesses from largeObject');

console.time('10k Accesses from smallObject');
for (i = 0; i < 10000; i++) x = largeObject['a' + (i % 1000)];
console.timeEnd('10k Accesses from smallObject');