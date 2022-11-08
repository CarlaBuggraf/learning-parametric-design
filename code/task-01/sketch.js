function preload(){
  // preload assets
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background('#189e8e');

  strokeWeight(1);
  fill("#8ccbff");
  arc(
    200, 200,150, 150,
    Math.PI / 180 * 270,
    Math.PI / 180 * 360,
    PIE
  );
  //Winkel rechts, oben
  
  strokeWeight(1);
  fill("#fa675f");
  arc(
    200, 200,150, 150,
    Math.PI / 180 * 0,
    Math.PI / 180 * 90,
    PIE
  );
  //Winkel rechts, unten

  strokeWeight(1);
  fill("black");
  circle(230, 170, 10);
  //Auge
 
  strokeWeight(1);
  fill("#f7b86f");
  arc(
    200, 162.5, 100, 130,
    Math.PI / 180 * 90,
    Math.PI / 180 * 270,
    PIE
  );
  //Winkel li

  strokeWeight(1);
  fill("#fff9bd");
  rect(190, 125, 10, 75);
  //Nase

  strokeWeight(3);
  stroke("black");
  line(150, 250, 190, 250 );
  //Mund o, li

  strokeWeight(3);
  stroke("#1c4d20");
  line(190, 250, 199, 250 );
  //Mund o, re

  strokeWeight(1);
  fill("#db7b8e");
  rect(160, 260, 30, 5);
  //Mund u, li

  strokeWeight(1);
  fill("#b35064");
  rect(190, 260, 10, 5);
  //Mund u, re

 
}