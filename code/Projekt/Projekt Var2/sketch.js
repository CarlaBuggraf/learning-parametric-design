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
  
  audio.loop();

  frameRate(2);

  amplitude = new p5.Amplitude();
  amplitude.setInput(audio);
  fft = new p5.FFT();
  fft.setInput(audio);
}


function draw() {
  // background(0, 0, 225, 125);
  const level = amplitude.getLevel();
  translate(random(0, windowWidth), random(0, windowHeight));
  
  rotate(-PI/2);
  
  amplitudes.unshift(level);
  // const amplitudes = fft.analyze();
  //fill("white");

  noFill();
  stroke(colorV, 110);

    var ang=TWO_PI/20;
  for(var i = 1; i <= 20; i++){
    var startPos = getCoords(ang*i,100);
    if(amplitudes[i]!=null){
    var endPos = getCoords (ang*i, 50 + 500 * amplitudes[i]); //amplitude
    } 
  else{var endPos=getCoords(ang*i,50);} //ähnlcih wie Polarkoordinaten Fkt. ang*i = Winkel
    line(startPos.x,startPos.y,endPos.x,endPos.y);
  }

  
  //console.log(audio.isPlaying());
  console.log(level);
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
