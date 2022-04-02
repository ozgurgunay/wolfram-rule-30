let resolution = 10;
//an array of 0s and 1s-0 ve 1 array consisting
let cells;

//we arbitrarily start with just the middle cell having a state of
let generation = 0;

//an array to store the ruleset, for example {0,0,0,1,1,1,1,0}(rule 30)-
//-ornegin kural kümesini saklamak icin kullanılan bir dizi 
let ruleset = [0, 0, 0, 1, 1, 1, 1, 0];


// var el = document.getElementById('#button');
// if(el){
//   console.log('yes')
//   el.addEventListener('click', swapper, false);
// }


// document.querySelector('.rule-button').addEventListener("click", function(){

//   let in1 = document.querySelector('#0').value;

//   console.log(in1)

// })



function setup() {
  createCanvas(800, 400);
  cells = Array(floor(width / resolution));  //floor(width / resolution) eger bu bölüm tam cıkmazsa tam sayının altına yuvarlaması icin koyuldu
  for (let i = 0; i < cells.length; i++) {
    cells[i] = 0;
  }
  cells[cells.length/2] = 1;

}

function draw() {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i] == 1) {
      fill(255);
    } else {
      fill(0);
      noStroke(255);
      rect(i * resolution, generation * resolution, resolution, resolution);
    }
  }
  if (generation < height/resolution) {
    generate();
  }
}

//the process of creating the new generation
function generate() {
  //first we create an empty array for the new values
  let nextgen = Array(cells.length);
  //for every spot, determine new state by examing current state, and neighbor state
  //ignore edges that only have one neighbor
  for (let i = 1; i < cells.length-1; i++) {
    let left = cells[i-1];    //left neighbor state
    let me   = cells[i];      //current state
    let right = cells[i+1];   //right neighbor state
    nextgen[i] = rules(left, me, right);  //compute next generation
  }
  //the current generation is the new generation
  cells = nextgen;
  generation++;

}

//implementing the Wolfram rules
//could be improved and made more concise, but here we can explicitly
function rules(a, b, c) {
  if (a == 1 && b == 1 && c == 1) return ruleset[0];
  if (a == 1 && b == 1 && c == 0) return ruleset[1];
  if (a == 1 && b == 0 && c == 1) return ruleset[2];
  if (a == 1 && b == 0 && c == 0) return ruleset[3];
  if (a == 0 && b == 1 && c == 1) return ruleset[4];
  if (a == 0 && b == 1 && c == 0) return ruleset[5];
  if (a == 0 && b == 0 && c == 1) return ruleset[6];
  if (a == 0 && b == 0 && c == 0) return ruleset[7];
  return 0;
}

