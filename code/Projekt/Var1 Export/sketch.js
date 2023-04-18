var audio;
var song = "testsong.mp3";
var amplitude;
var amplitudes = [];
var fft;

var backgroundColor = "white";
var outlineColor = (0, 0, 0);


function preload(){
  audio = loadSound(song);
}

function setup() {
  createCanvas(windowWidth, windowHeight, SVG); 
  background(backgroundColor);
  
  audio.play();

  frameRate(5);

  amplitude = new p5.Amplitude();
  amplitude.setInput(audio);
  fft = new p5.FFT();
  fft.setInput(audio);
}


function draw() {
  background(backgroundColor);
  const level = amplitude.getLevel();
  translate(windowWidth/2,windowHeight/2); 
  
  rotate(-PI/2);
  
  amplitudes.unshift(level);
  setLineDash([1, 2]);
  noFill();
  stroke(outlineColor);

  //https://editor.p5js.org/The_Exceptionist/sketches/LlPuwRLM2 
  var ang=TWO_PI/60;
  for(var i = 1; i <= 60; i++){
    var startPos = getCoords(ang*i,0);
    if(amplitudes[i]!=null){
      var endPos = getCoords (ang*i, 50 + 500 * amplitudes[i]);
    } 
    else {
      var endPos=getCoords(ang*i,50);
    }
      line(startPos.x,startPos.y,endPos.x,endPos.y);
    }

  if (frameCount%30==0) { //bei frameRate(1) und frameCount%60 = 1 Bild/Minute //
    save("Export.svg");
  }
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