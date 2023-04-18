
//https://www.jasonlzhu.com/isho
var audio; //song
var song = "testsong.mp3"; //PREFIX
var amplitude;
var fft;
var peakDetect;

// Global line variables.
var nLines = 160;
var linesArray = [];
var nforces = 4;
var nParticles = 278;
var forcesArray = [];
var fillScreen = true;
var strokeW = 1;

var backgroundColor = "blue";
var colorV = "white";

function preload(){
  audio = loadSound(song);
}

function setup() {
  createCanvas(windowWidth, windowHeight); // (500, 500)
  background(backgroundColor);
  frameRate(60);

  amplitude = new p5.Amplitude();
  amplitude.setInput(audio);
  fft = new p5.FFT();
  fft.setInput(audio);
  peakDetect = new p5.PeakDetect(20,20000,.08,1.29600362881); //https://p5js.org/reference/#/p5.PeakDetect
  audio.play();

  // Setup line and force particles.
  initialize(); 
}

function draw() {
  if (audio.isPlaying()){

    // Update audio analyzer.
    fft.analyze();
    peakDetect.update(fft);

    for (var i = 0; i < nforces; i++) {
      forcesArray[i].move();
    }

    // Standard radius
    var radius = 75 * cos(frameCount / 80);

    //If beat is detected, enlargen radius based on level of amplitude.
    if (peakDetect.isDetected){
      var radius = map(amplitude.getLevel(),.08, .3, 10, 150) * cos(frameCount/80);
    }

    // Setup a range of two colors for the gradient coloring of lines 
    // and have the gradient change as the song and animation progress.
    var highRed = map(audio.currentTime()* 3.5, 0, audio.duration() * 3, 255, 0);
    var highGreen = map(audio.currentTime()*3.5, 0, audio.duration() * 3, 0, 255);

    // Setup rate of gradient change between colors depending on amplitude 
    // of the song at that current time.
    var low = 30;
    var high = map(amplitude.getLevel(), 0, .125, 0, 255);
    
    for (var i = 0; i < linesArray.length; i++) {
      // Create interaction for every line with every force particle.
      linesArray[i].interact(radius, forcesArray[0].position.x, forcesArray[0].position.y);
      linesArray[i].interact(radius, forcesArray[1].position.x, forcesArray[1].position.y);
      linesArray[i].interact(-radius, forcesArray[2].position.x, forcesArray[2].position.y);
      linesArray[i].interact(-radius, forcesArray[3].position.x, forcesArray[3].position.y);
    
      // Color lines using a gradient.
      // var col = lerp(low, high, i / linesArray.length);
      // stroke(highRed, highGreen, col);
      stroke(colorV);

      // Change strokeweight of lines depending on amplitude of song at the given time.
      // if (strokeW >= 5){
      //   strokeW = 1;
      // }
      // strokeWeight(strokeW);

      linesArray[i].draw();
    }
  }
}

function initialize() {
  // Create and store Lines into linesArray.
  for (var i = 0; i < nLines; i++) {
    linesArray[i] = new Line(42 + 4.8* i);
    linesArray[i].addParticles();
  }
  // Create and store force particles in forcesArray.
  for (var i = 0; i < nforces; i++) {
    if (i== 0){
    forcesArray[i] = new Particle(30+ (1) * 470 / 3, 42 + (1) * 423 / 3);
    }
    if (i == 1){
      forcesArray[i] = new Particle(30+ (2) * 470 / 3, 42 + (2) * 423 / 3);
    }
    if (i == 2){
      forcesArray[i] = new Particle(30+ (1) * 470 / 3, 42 + (2) * 423 / 3);
    }
    if (i == 3){
      forcesArray[i] = new Particle(30+ (2) * 470 / 3, 42 + (1) * 423 / 3);
    }

    // Start force particles with random velocities.
    var angle = random(0, TWO_PI);
    forcesArray[i].velocity.set(cos(angle), sin(angle));
  }
}

// Line class.
var Line = function(y){
  this.y = y;
  this.particlesArray = [];
}

// Add particles to lines particlesArray.
Line.prototype.addParticles = function(){
  for (var i = 0; i < nParticles; i++){
    this.particlesArray.push(new Particle(30 + 5 * i, this.y));
  }
}

// Connect all particles in line's particleArray to draw line.
Line.prototype.draw = function(){    
  beginShape();
    for (var i = 0; i < this.particlesArray.length; i++) {
      curveVertex(this.particlesArray[i].position.x, this.particlesArray[i].position.y);
    }
  endShape();
}


// Interact line with force particles by having all of 
// line's particles individually interact with force particles.
Line.prototype.interact = function(radius, xpos, ypos) { 
  for (var i = 0; i < this.particlesArray.length; i++) {
    this.particlesArray[i].interact(radius, xpos, ypos);
  }

  // Change size of line when necessary to make for smooth texture.
  for (var i = 0; i < this.particlesArray.length-1; i++) {
    var d = dist(this.particlesArray[i].position.x, this.particlesArray[i].position.y, 
                 this.particlesArray[i+1].position.x, this.particlesArray[i + 1].position.y);
    
    // Add a new Particle to particleArray when two neighbor particles are too far apart.
    if (d > 5) {
      var x = ((this.particlesArray[i].position.x + this.particlesArray[i + 1].position.x) / 2);
      var y = ((this.particlesArray[i].position.y + this.particlesArray[i + 1].position.y) / 2);
      this.particlesArray.splice(i + 1, 0, new Particle(x, y));
    }

    // Remove a particle when 2 neighbor particles are too close.
    if (d < 1) {
      this.particlesArray.splice(i, 1);
    }
  }     
}

// Particle class.
var Particle = function(x, y){
  this.position = createVector(x, y);
  this.velocity= createVector(0, 0);
  this.acceleration = createVector(0, 0);
}

// Updates force particles' positions.
Particle.prototype.move = function(){
  // Change direction of force particles sometimes.
  if (random(1) > .97){
    var angle = random(-PI, PI);
    this.acceleration.set(cos(angle), sin(angle));
    var mod = this.acceleration.angleBetween(this.velocity);
    mod = map(mod, 0, PI, 0.1, 0.001);
    this.acceleration.mult(mod); 
  }

  // Change pace of force particle's position change
  this.velocity.add(this.acceleration);

  // Stop if current amplitude reaches or surpasses 0.675.
  // Force particle to increase impact of interaction with lines.
  if (amplitude.getLevel() > .675){
      this.velocity.set(0, 0);
  }

  // Move force particle
  this.position.add(this.velocity);

  // Check edges.
  this.position.x = (this.position.x + width)%width;
  this.position.y = (this.position.y + height)%height;
}

// Force particle to line particle interaction.
Particle.prototype.interact = function(radius, xpos, ypos){
  var dir = radius/abs(radius);
  var radius = abs(radius);

  var r = dist(this.position.x, this.position.y, xpos, ypos);
  var angle = atan2(this.position.y - ypos, this.position.x - xpos);

  // If line particle is within radius of force particle,
  // change velocity to change position of line particle.
  if (r <= radius) {
    // If current amplitude is greater than .11, generate wider,
    // radial movement from particles to highlight song's beats.
    if (amplitude.getLevel() > .1){
      var radius = 2 * dir * (radius - r) / radius;
    }
    else{ 
      var radius = .3 * dir * (radius - r) / radius;
    }
    this.velocity.set(radius * cos(angle), radius * sin(angle));
  } else {
    this.velocity.set(0, 0);
  }
  this.position.add(this.velocity);
}

function mousePressed() {
  if (audio.isPlaying()) {
    audio.stop();
  } else {
    audio.play();
  }
}