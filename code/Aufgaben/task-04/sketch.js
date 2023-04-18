function preload(){
  // preload assets
}

let canvasHeight = 750;
let canvasWidth = 1200;
let colorPalet = ('rgb(0, 0, random(0, 255)');
// let colorPalet = `rgb(0, 0, ${Math.floor(Math.random()*255)})`;
//let colorGrey = random(0, 255);
let inputField;
let x = 150;
let y = 150;
let j = 1;
let counter = 0;

let rectangleKl = rect(0, 100, x/2, y/2);
let rectangleMed = rect(0, 100, x, y/2);
let rectangleGr = rect(0, 100, x, y);
let rectangles = [rectangleKl, rectangleMed, rectangleGr];
//let ractangle = random(rectangles);


function setup() {
  createCanvas(canvasWidth, canvasHeight);

  inputField = createInput();
  inputField.position(10, 755); 
  inputField.size(100);
  
}

function draw() {
  background('beige');
  //background(colorPalet);
  fill('grey');
  rect(0, 0, canvasWidth, 50);

  for (let i = 0; i <= (inputField.value()-1); i += 1) {
  
  push();
  translate(150 * (i%9) , y*Math.floor(i/9));
  fill(random(0, 255));
  frameRate(1);
  rect(0, 100, x, y); //kleines Rect
  //random(rectangles);

  //console.log();
  //if (i % 19 == 0){
    //j += 1;
    //noLoop();
    //console.log(j);
  //}

  //if (random(rectangles) == rectangleKl) {
  //  counter ++ 4;
  //} else if (random(rectangles) == rectangleMed) {
  //  counter ++ 2;
  //} else {
  //  counter ++ 1;
  //}


  pop();
  }
}

random(choices);

  //inputField.value()

