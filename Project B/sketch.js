let img;

let size = 7;

let startx = 0;
let starty = 0;

let buttons = [];
let snd1, snd2, snd3, snd4;

function preload() {
  img = loadImage("Maja.jpg");
  snd1 = loadSound("meow1.mp3");
  snd2 = loadSound("meow2.mp3");
  snd3 = loadSound("meow3.mp3");
  snd4 = loadSound("angrymeow.mp3");
}

let treats = [];
let totalNum = 140;

function setup() {
  let canvas = createCanvas(740, 600);
  canvas.parent("canvasContainer");

  img.loadPixels();
  img.resize(740, 0);
  img.updatePixels();

  buttons.push(new Button(265, 40, 75, snd2));
  buttons.push(new Button(600, 130, 75, snd2));
  buttons.push(new Button(355, 360, 35, snd1));
  buttons.push(new Button(310, 435, 40, snd3));
  buttons.push(new Button(430, 170, 65, snd3));
  buttons.push(new Button(190, 560, 95, snd4));
}

function draw() {
  clear();
  background(0);

  let size = floor(map(mouseX, 0, width * 5, 7, 40));

  for (let starty = 0; starty < img.height; starty++) {
    for (let startx = 0; startx < img.width; startx++) {
      let index = (startx + starty * img.width) * 4;
      let r = img.pixels[index + 0];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];

      let bright = 0.3 * r + 0.59 * g + 0.11 * b;

      fill(r, g, b);

      rect(startx, starty, size, size);

      startx = startx + size - 1;
    }
    starty = starty + size - 1;
  }

  for (let i = 0; i < buttons.length; i++) {
    let b = buttons[i];
    b.checkMouse();
    b.display();
  }

  for (let i = 0; i < treats.length; i++) {
    let t = treats[i];
    t.move();
    t.show();
  }
}

class Button {
  constructor(x, y, rad, snd) {
    this.sound = snd;
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.xSpd = 0;
    this.ySpd = 0;
    this.isDone = false;
  }

  checkMouse() {
    let distance = dist(this.x, this.y, mouseX, mouseY);
    if (distance < this.rad) {
      if (mouseIsPressed) {
        if (this.sound.isPlaying() == false) {
          this.sound.play();
        }
      }
    }
  }

  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }

  display() {
    push();
    noStroke();
    noFill();
    ellipse(this.x, this.y, this.rad * 2, this.rad * 2);
    pop();
  }
}

class Treat {
  constructor(x, y) {
    this.x = random(-200, 1500);
    this.y = y - 230;
    this.xSpd = 0;
    this.ySpd = random(0.4, 1.8);
  }

  move() {
    this.x += this.xSpd;
    this.y += this.ySpd * 3.5;
  }

  show() {
    push();
    translate(this.x, this.y);
    strokeWeight(1);
    stroke(0);
    fill(115, 77, 38);
    ellipse(0, 0, 80, 40);
    triangle(25, 0, 45, -20, 45, 20);
    pop();
  }
}

function giveTreats() {
  for (let i = 0; i < totalNum; i++) {
    treats.push(new Treat(200, 200, 40));
  }
}