const fs = require('fs');

let list = ['callback.js', 'promise.js', 'async.js'];
let lx = 0;

function getPath() {
  return new Promise((resolve, reject) => {
    if (lx < list.length) {
      let v = list[lx];
      lx += 1;
      resolve(v);
    } else {
      resolve(null);
    }
  });
}

function subA(path, done) {
  console.log('subA 1');
  return new Promise((resolve, reject) => {
    console.log('subA 2');
    fs.realpath(path, (err, resolvedPath) => {
      if (err) return reject(err);
      console.log('subA 3');
      resolve(resolvedPath);
    });
  });
}

function subB(path, done) {
  console.log('subB 1');
  return new Promise((resolve, reject) => {
    console.log('subB 2');
    fs.stat(path, (err, stats) => {
      if (err) return reject(err);
      console.log('subB 3');
      resolve(stats);
    });
  });
}

async function main() {
  console.log('main 1');
  do {
    try {
      let path = await getPath();
      if (!path) break;
      console.log('main 2, path=%s', path);
      let resolvedPath = await subA(path);
      console.log('main 3');
      let stats = await subB(resolvedPath);
      console.log('main 4');
    } catch (err) {
      process.exit(1);
    }
  } while(true);
  console.log('main E');
}

console.log('global 1');
main();
console.log('global 2');

/*
Result:

global 1
main 1
global 2
main 2, path=callback.js
subA 1
subA 2
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
main E
*/