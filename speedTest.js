// Offset had little effect
// Randomizing access order gave 4x difference
// accessing property through method gave another 2x difference
// Accessing property through method without random access gave about 7x difference

// Conclusions:
// - JIT compilers are very powerful
// - When iterating over a list of objects, calling a method is a lot slower than accessing a property (7x)
// - Randomly accessing objects in a large array is slower than randomly accessing integers (4x)

const numItems = 2000000;
const offset =0;

console.log("The number of items is:" + numItems);
console.log("The offset is: " + offset);

// Integer Iteration Test

let startCreationTime = new Date();

var x = [];
for (let i = 0; i < numItems; i++) {
  x.push(Math.round(Math.random() * 10));
}

let xx = Uint8Array.from(x);

var count = 0;
let startTestTime = new Date();

for (let i = 0; i < numItems-offset; i++) {
  let index = i; //Math.round(Math.random()*numItems-offset) - 1;
  if (xx[index] + xx[index + offset]> 5) {
    count++;
  }
}

let endTime = new Date();

console.log(count / (numItems - offset) + "% of items were above 5");
console.log("The integer test took " + (endTime - startTestTime) + "ms");
console.log("Creating the integer array took " + (startTestTime - startCreationTime) + "ms");

// Object Iteration Test

startCreationTime = new Date();

let y = [];
for (let i = 0; i < numItems; i++) {
  let obj = {
    a: Math.round(Math.random() * 10),
    c: new Array(Math.round(Math.random() * 50)),
    d: { 
         da: "another object",
    },
    getNum: function() { return this.a; }
  }
  y.push(obj);
}

count = 0;
startTestTime = new Date();

for (let i = 0; i < numItems-offset; i++) {
  let index = i; //Math.round(Math.random()*numItems-offset) -1;
  if (y[index].getNum() +y[index + offset].getNum() > 5) {
    count++;
  }
}

endTime = new Date();

console.log("The object test took " + (endTime - startTestTime) + "ms");
console.log("Creating the array of objects took " + (startTestTime - startCreationTime) + "ms");

