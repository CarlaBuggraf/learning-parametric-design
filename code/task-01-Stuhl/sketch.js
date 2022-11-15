function preload(){
  // preload assets
}

function setup() {
  pixelDensity(1);
  createCanvas(400, 400);
}

function draw(){

  background('#82acff');

  stroke('black');
  strokeWeight(4);
  line(20, 20, 120, 380);
  //lange Seite links
 
  stroke('black');
  strokeWeight(4);
  line(220, 20, 320, 380);
  //lange Seite rechts

  stroke('black');
  strokeWeight(4);
  line(120, 380, 320, 380);
  //Bodenstück, vorne

  stroke('black');
  strokeWeight(4);
  line(20, 20, 220, 20);
  //Lehne oben

  stroke('black');
  strokeWeight(4);
  line(70, 200, 25, 360);
  //Stuhlbein hinten links

  stroke('black');
  strokeWeight(4);
  line(270, 200, 225, 360);
  //Stuhlbein hinten rechts

  stroke('black');
  strokeWeight(4);
  line(25, 360, 225, 360);
  //Bodenstück, hinten

  stroke('black');
  strokeWeight(4);
  line(40, 100, 240, 100);
  //Lehne unten

  stroke('black');
  strokeWeight(4);
  line(70, 200, 270, 200);
  //Sitzfläche hinten

  stroke('black');
  strokeWeight(4);
  line(180, 260, 360, 260);
  //Sitzfläche vorne

  stroke('black');
  strokeWeight(4);
  line(70, 200, 180, 260);
  //Sitzfläche links

  stroke('black');
  strokeWeight(4);
  line(270, 200, 360, 260);
  //Sitzfläche rechts

}