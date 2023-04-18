var audio;
var song = "testsong.mp3";
var amplitude;
var amplitudes = [];
var fft;
  
var endPositions = [];
  
var backgroundColor = "blue";
var outlineColor = (255, 255, 255);
    
function preload(){
  audio = loadSound(song);
}
  
  
function setup() {
  createCanvas(windowWidth, windowHeight); 
  background(backgroundColor);
  
  // frameRate(1);
  audio.setVolume(0.3); 

  audio.play();
  
  amplitude = new p5.Amplitude();
  amplitude.setInput(audio);
  fft = new p5.FFT();
  fft.setInput(audio);
}
  
  
function draw() {
  translate(random(windowWidth/2-150, windowWidth/2+150), random(windowHeight/2-200, windowHeight/2+200));

  
  rotate(-PI/2);
  
  const amplitudes = fft.analyze();

  frameRate(2);

  noFill();
  setLineDash([2, 15]);
  stroke(outlineColor);
  strokeWeight(2);
  
  endPositions = [];
  var ang=TWO_PI/10;
  for(var i = 1; i <= 10; i++){
    var startPos = getCoords(ang*i,0);
    if(amplitudes[i*20]!=null){ 
      var endPos = getCoords (ang*i, 50 + amplitudes[i*20]);
      endPositions.push(amplitudes[i*20]); 
    }  
    else {
      var endPos=getCoords(ang*i,50);
    }
    line(startPos.x,startPos.y,endPos.x,endPos.y);
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