var audio;
var song = "testsong.mp3";
var amplitude;
var amplitudes = [];
var fft;

var endPositions = []; //Endpositionen der Amplituden Linien
var outlines = [];
var boundingbox = 10; //Höhe und Breite tbc
var maxBoxes = 10;

var backgroundColor = "blue";
var outlineColor = (255, 255, 255);



function preload(){
  // audio = loadSound(song);

  for (let b = 0; b < maxBoxes; b ++) { // Teil1 HitTest //https://parametric-design.fh-potsdam.de/de/bonus/hittest/
    let newBox;
    let hit = true;
    while(hit){
      hit = false;
      newBox = {
        x: Math.random() * windowWidth,
        y: Math.random() * windowHeight
      };
      for (let bb = 0; bb < outlines.length; bb ++) {
        if (hitTest(newBox, outlines[bb])) {
          hit = true;
        }
      }
    }
    outlines.push(newBox);
  }

  function hitTest(box1, box2) {
    let x1Min = box1.x - boundingbox / 2;
    let x1Max = box1.x + boundingbox / 2;
    let y1Min = box1.y - boundingbox / 2;
    let y1Max = box1.y + boundingbox / 2;
  
    let x2Min = box2.x - boundingbox / 2;
    let x2Max = box2.x + boundingbox / 2;
    let y2Min = box2.y - boundingbox / 2;
    let y2Max = box2.y + boundingbox / 2;
  
    if (
      ((x2Min < x1Max && x2Min > x1Min) ||
      (x2Max < x1Max && x2Max > x1Min)) &&
      ((y2Min < y1Max && y2Min > y1Min) ||
      (y2Max < y1Max && y2Max > y1Min))
    ) {
      return true;
    } else {
      return false;
    }
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight); 
  background(backgroundColor);

  frameRate(1);
  
  // audio.loop();
  // audio.setVolume(0.1);

  amplitude = new p5.Amplitude();
  amplitude.setInput(audio);
  fft = new p5.FFT();
  fft.setInput(audio);
}


function draw() {
  // var randomFillColor = random(140, 255);
  // var fillColor = (randomFillColor, randomFillColor, randomFillColor);

  // // background(0); //
  // const level = amplitude.getLevel();
  // translate(random(0, windowWidth), random(0, windowHeight));

  // rotate(-PI/2);

  // const amplitudes = fft.analyze();

  // endPositions = []; //
  // var ang=TWO_PI/10;
  // for(var i = 1; i <= 10; i++){
  //   var startPos = getCoords(ang*i,0);
  //   if(amplitudes[i*20]!=null){ //
  //     var endPos = getCoords (ang*i, 50 + amplitudes[i*20]); //
  //     endPositions.push(amplitudes[i*20]); //
  //   }  
  //   else {
  //     var endPos=getCoords(ang*i,50);
  //   }
  // }

  // const offset = Math.PI/180 * 10;

  // beginShape();
  // for (var i = 0; i < endPositions.length; i++){
  //   endPos = getCoords (ang*i, 50 + endPositions[i]);
  //   stroke(outlineColor, 0);
  //   line(startPos.x,startPos.y,endPos.x,endPos.y); //

  //   stroke(outlineColor);
  //   // noStroke();
  //   fill(fillColor);
  //   if(i==0) {
  //     controll1 = getCoords ((ang*(i-1))+offset, 50 + endPositions[endPositions.length-1]);
  //   } 
  //   else{
  //     controll1 = getCoords ((ang*(i-1))+offset, 50 + endPositions[i-1]);
  //   }
  //   controll2 = getCoords (ang*i-offset, 50 + endPositions[i]);
    
  //   if (i==0) {
  //     let startPos = getCoords (ang*(endPositions.length-1), 50 + endPositions[endPositions.length-1]);
  //     vertex(startPos.x, startPos.y)
  //   }

  //   bezierVertex(controll1.x, controll1.y, controll2.x, controll2.y, endPos.x, endPos.y);
  // }
  // endShape();

  for (let b = 0; b < outlines.length; b += 1) { //HitTest Teil 2
    fill('white');
    stroke('black');
    circle(outlines[b].x, outlines[b].y, boundingbox);
    noFill();
    stroke('red');
    rect(
      outlines[b].x - boundingbox / 2,
      outlines[b].y - boundingbox / 2,
      boundingbox,
      boundingbox
    );
  }

// console.log(outlines);
// console.log(audio.isPlaying());
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
