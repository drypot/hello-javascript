import * as fs from 'fs';

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

function main() {
  console.log('main 1');
  subA('promise.js').then((resolvedPath) => {
    console.log('main 3');
    return subB(resolvedPath);
  }).then((stats) => {
    console.log('main 4');
  }).catch((err) => {
    console.log('system error.');
    process.exit(1);
  });
  console.log('main 2');
}

console.log('global 1');
main();
console.log('global 2');

/*
Result:

global 1
main 1
subA 1
subA 2
main 2
global 2
subA 3
main 3
subB 1
subB 2
subB 3
main 4
*/
