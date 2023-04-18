//Variablen zum Sound
var audio;
var song = "testsong.mp3";
var amplitude;
var amplitudes = [];
var fft;

var backgroundColor = "blue";
var colorV = (255, 255, 255);


function preload(){
  audio = loadSound(song);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(backgroundColor);

  frameRate(1);
  
  audio.loop();

  amplitude = new p5.Amplitude();
  amplitude.setInput(audio);
  fft = new p5.FFT();
  fft.setInput(audio);
}


function draw() {
  const level = amplitude.getLevel();

  // translate(windowWidth/2,windowHeight/2); 
  translate(random(0, windowWidth), random(0, windowHeight));
  
  rotate(-PI/2);
  
  const amplitudes = fft.analyze();
  // circle(10, 10, level*500, level*500); //amplitude
  noFill();
  setLineDash([10, 30]);

  stroke(colorV);
  strokeWeight(2);
  // circle(windowWidth/2, windowHeight/2, 100);
  var ang=TWO_PI/256;
  for(var i = 1; i <= 256; i+=10){
    var startPos = getCoords(ang*i,100);
    if(amplitudes[i]!=null) {
      var endPos = getCoords (ang*i, 50 + amplitudes[i]);
    } 
    else {
      var endPos=getCoords(ang*i,50);
    }
    line(startPos.x,startPos.y,endPos.x,endPos.y);
  }
  
//console.log(audio.isPlaying());
// console.log(level);
}

function mousePressed() {
  if (audio.isPlaying()) {
    audio.stop();
  } else {
    audio.play();
  }
}

function getCoords(angle,radius){
   return {x:cos(angle)*radius,y:sin(angle)*radius}
}

function setLineDash(list) { //https://editor.p5js.org/squishynotions/sketches/Ax195WTdz
  drawingContext.setLineDash(list);
}