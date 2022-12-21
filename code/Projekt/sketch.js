
var audio;
var song = "testsong.mp3";
var amplitude;
var fft;


function preload(){
  audio = loadSound(song);
}

function setup() {
  createCanvas(400, 400);
  background('blue');
  audio.loop();

  amplitude = new p5.Amplitude();
  amplitude.setInput(audio);
  fft = new p5.FFT();
  fft.setInput(audio);
  audio.play();
}

function draw() {
  const level = amp.getLevel();
  circle(width/2, height/2, level, level);


}