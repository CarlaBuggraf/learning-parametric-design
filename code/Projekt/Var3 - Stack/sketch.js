var audio;
var song = "testsong.mp3";
var amplitude;
var amplitudes = [];
var fft;

var endPositions = [];

// var backgroundColor = "blue";
var backgroundColor = ("white");
// var outlineColor = (255, 255, 255);
var outlineColor = (0, 0, 0); //Plotter


function preload(){
  audio = loadSound(song);
}


function setup() {
  createCanvas(windowWidth, windowHeight); 
  background(backgroundColor);

  // frameRate(1);
  audio.setVolume(0.3); 

  amplitude = new p5.Amplitude();
  amplitude.setInput(audio);
  fft = new p5.FFT();
  fft.setInput(audio);
}


function draw() {
  // var randomFillColor = random(140, 255); //Grey
  // var fillColor = (randomFillColor, randomFillColor, randomFillColor);

  // var fillWhite = (255, 255, 255);
  // var fillBlack = (0, 0, 0);
  // var fillColor = random (fillBlack, fillWhite);

  // var randomFillColor = random(0, 255); //Blue
  // var fillColor = (0, 0, randomFillColor);

  var fillColor = ('rgba(255, 255, 255, 0.1)');

  translate(windowWidth/2, windowHeight/2);
  rotate(-PI/2);

  const amplitudes = fft.analyze();

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
  }

  const offset = Math.PI/180 * 10;

  beginShape();
  for (var i = 0; i < endPositions.length; i++){
    endPos = getCoords (ang*i, 50 + endPositions[i]);
    stroke(outlineColor, 0);
    line(startPos.x,startPos.y,endPos.x,endPos.y);

    stroke(outlineColor);
    fill(fillColor);
    if(i==0) {
      controll1 = getCoords ((ang*(i-1))+offset, 50 + endPositions[endPositions.length-1]);
    } 
    else{
      controll1 = getCoords ((ang*(i-1))+offset, 50 + endPositions[i-1]);
    }
    controll2 = getCoords (ang*i-offset, 50 + endPositions[i]);
    
    if (i==0) {
      let startPos = getCoords (ang*(endPositions.length-1), 50 + endPositions[endPositions.length-1]);
      vertex(startPos.x, startPos.y)
    }
    bezierVertex(controll1.x, controll1.y, controll2.x, controll2.y, endPos.x, endPos.y);
  }
  endShape();
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
