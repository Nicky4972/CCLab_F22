let particles = [];
let totalNum = 800;
let cloudx = 100;
let cloudy = 100;

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("canvasContainer");
  angleMode(DEGREES);

  for (let i = 0; i < totalNum; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

function draw() {
  if (mouseIsPressed) {
    background(31, 31, 122);
  } else background(128, 212, 255);

  //ground
  rectMode(CENTER);
  fill(244, 244, 244);
  rect(300, 570, 600, 300);

  //backgound mountain
  fill(115, 115, 115);
  triangle(360, 130, 760, 530, -40, 530);
  fill(244, 244, 244);
  beginShape();
  vertex(360, 130);
  vertex(477, 246);
  vertex(390, 200);
  vertex(360, 250);
  vertex(320, 217);
  vertex(234, 255);
  endShape(CLOSE);

  //front mountain
  fill(140, 140, 140);
  triangle(100, 180, 500, 530, -260, 530);
  fill(2544, 244, 244);
  beginShape();
  vertex(100, 180);
  vertex(215, 280);
  vertex(145, 250);
  vertex(120, 290);
  vertex(70, 260);
  vertex(-20, 286);
  endShape(CLOSE);

  makeCloud(cloudx - 400, cloudy - 30);
  makeCloud(cloudx - 600, cloudy - 10);
  makeCloud(cloudx - 200, cloudy - 50);
  makeCloud(cloudx + 400, cloudy - 40);
  makeCloud(cloudx, cloudy - 10);
  makeCloud(cloudx + 210, cloudy - 40);
  fill(255, 255, 255);
  noStroke();
  cloudx += 0.5;

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.move();
    p.limitPos();
    p.display();
    p.slowDown();
    p.shrink();
    p.repelledFrom(mouseX, mouseY);
  }

  //snowman body
  fill(255);
  ellipse(150, 505, 80, 80);
  ellipse(150, 455, 65, 65);
  ellipse(150, 415, 45, 45);

  //eyes
  fill(0);
  ellipse(140, 405, 5, 5);
  ellipse(160, 405, 5, 5);

  //nose
  fill(255, 117, 26);
  triangle(148, 411, 148, 421, 163, 417);

  //arms
  stroke(139, 69, 19);
  strokeWeight(5);
  // left arm
  push();
  translate(118, 447);
  let angleL = sin(frameCount * 1.5) * 30;
  rotate(angleL);
  line(0, 0, 85 - 118, 424 - 447);
  pop();
  //right arm
  push();
  translate(182, 447);
  let angleR = sin(frameCount * 1.5) * 30;
  rotate(angleR);
  line(0, 0, 216 - 182, 424 - 447);
  pop();
  noStroke();

  //buttons
  fill(0);
  ellipse(150, 442, 6, 6);
  ellipse(150, 454, 6, 6);
  ellipse(150, 466, 6, 6);

  //scarf
  fill(204, 0, 0);
  rect(150, 430, 55, 10, 5);
  rect(173, 447, 10, 37, 5);
}

function makeCloud(cloudx, cloudy) {
  fill(255, 255, 255);
  noStroke();
  ellipse(cloudx, cloudy, 70, 50);
  ellipse(cloudx + 20, cloudy + 10, 70, 50);
  ellipse(cloudx - 20, cloudy + 10, 70, 50);
}

function keyPressed() {
  if (key == "s") {
    particles.push(new Particle(random(width), random(height)));
    particles.push(new Particle(random(width), random(height)));
    particles.push(new Particle(random(width), random(height)));
    particles.push(new Particle(random(width), random(height)));
    particles.push(new Particle(random(width), random(height)));
    particles.push(new Particle(random(width), random(height)));
    particles.push(new Particle(random(width), random(height)));
    particles.push(new Particle(random(width), random(height)));
    particles.push(new Particle(random(width), random(height)));
    particles.push(new Particle(random(width), random(height)));
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = random(-100, 40);
    this.dia = random(3, 8);
    this.xSpd = random(-1.3, 1.3);
    this.ySpd = random(0.1, 1.8);
  }

  repelledFrom(targetX, targetY) {
    let distance = dist(this.x, this.y, targetX, targetY);
    if (distance < 14) {
      let xAcc = (targetX - this.x) * -0.05;
      let yAcc = (targetY - this.y) * -0.05;
      this.xSpd += xAcc;
      this.ySpd += yAcc;
    }
  }

  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }

  limitPos() {
    this.y = constrain(this.y, -100, 530);
  }
  slowDown() {
    this.xSpd = this.xSpd * 0.9995;
    this.ySpd = this.ySpd * 0.9995;
  }

  shrink() {
    this.dia = this.dia * 0.9995;
    this.dia = constrain(this.dia, 0, 10);
  }

  display() {
    push();

    translate(this.x, this.y);
    noStroke();
    circle(0, 0, this.dia);

    pop();
  }
}
