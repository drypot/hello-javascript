const fs = require('fs');

let list = ['callback.js', 'promise.js', 'async.js'];
let lx = 0;

function getPath(next) {
  if (lx < list.length) {
    let v = list[lx];
    lx += 1;
    next(null, v);
  } else {
    next(null, null);
  }
}

function subA(path, done) {
  console.log('subA 1');
  fs.realpath(path, (err, resolvedPath) => {
    if (err) return done(err);
    console.log('subA 3');
    done(null, resolvedPath);
  });
  console.log('subA 2');
}

function subB(path, done) {
  console.log('subB 1');
  fs.stat(path, (err, stats) => {
    if (err) return done(err);
    console.log('subB 3');
    done(null, stats);
  });
  console.log('subB 2');
}

function main() {
  console.log('main 1');
  (function loop() {
    getPath((err, path) => {
      if (err) process.exit(1);
      if (!path) return;
      console.log('main 2, path=%s', path);
      subA(path, (err, resolvedPath) => {
        if (err) process.exit(1);
        console.log('main 3');
        subB(resolvedPath, (err, stats) => {
          if (err) process.exit(1);
          console.log('main 4');
          setImmediate(loop);
        });          
      });
    });
  })();
  console.log('main E');
}

console.log('global 1');
main();
console.log('global 2');

/*
Result:

global 1
main 1
main 2, path=callback.js
subA 1
subA 2
main E
global 2
subA 3
main 3
subB 1
subB 2
subB 3
main 4
main 2, path=promise.js
subA 1
subA 2
subA 3
main 3
subB 1
subB 2
subB 3
main 4
main 2, path=async.js
subA 1
subA 2
subA 3
main 3
subB 1
subB 2
subB 3
main 4
*/