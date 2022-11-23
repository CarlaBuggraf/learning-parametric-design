function preload(){
  // preload assets
}

function setup() {
  createCanvas(400, 400);

}

function draw() {

  fill('rgba(0, 0, 255, 0.1)');
  strokeWeight(0.5);
  frameRate(1.5);

  /*for (let counter = 0, counter <= 10, counter += 1;){
  beginShape();
  vertex(random(0,400), random(0,200)); 
  vertex(random(0,100), random(0,300)); 
  vertex(random(0,100), random(0,200)); 
  vertex(random(0,400), random(0,200)); 
  vertex(random(0,300), random(0,200)); 
  endShape(CLOSE); 
  
  counter += 1;
  }*/

  beginShape();
  vertex(random(0,400), random(0,200)); 
  vertex(random(0,100), random(0,300)); 
  vertex(random(0,100), random(0,200)); 
  vertex(random(0,400), random(0,200)); 
  vertex(random(0,300), random(0,400)); 
  endShape(CLOSE); 

  beginShape();
  vertex(random(0,400), random(0,200)); 
  vertex(random(0,100), random(0,300)); 
  vertex(random(0,100), random(0,200)); 
  vertex(random(0,400), random(0,200)); 
  vertex(random(0,300), random(0,400)); 
  endShape(CLOSE); 

  fill('rgba(0, 255, 0, 0.1)');
  beginShape();
  vertex(random(0,400), random(0,200)); 
  vertex(random(0,100), random(0,300)); 
  vertex(random(0,100), random(0,200)); 
  vertex(random(0,400), random(0,200)); 
  vertex(random(0,300), random(0,400)); 
  endShape(CLOSE); 

  fill('rgba(255, 0, 0, 0.1)');
  beginShape();
  vertex(random(0,400), random(0,200)); 
  vertex(random(0,100), random(0,300)); 
  vertex(random(0,100), random(0,200)); 
  vertex(random(0,400), random(0,200)); 
  vertex(random(0,300), random(0,400)); 
  endShape(CLOSE); 

  //noLoop();

/*const radius = random(100, 200);
beginShape();
for(let angle = 0; angle < 360; angle += 60;) {
  let x = radius * cos(Math.PI / 180 * angle);
  let y = radius * cos(Math.PI / 180 * angle);
  vertex(x, y);
}
endShape(CLOSE);
}*/
}
