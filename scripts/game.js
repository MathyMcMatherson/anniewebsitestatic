const MOVEDIST = 10;
const WIDTH = 800;
const HEIGHT = 450;
const NAVWIDTH = WIDTH;
const NAVHEIGHT = 50;
const GAMEWIDTH = WIDTH;
const GAMEHEIGHT = HEIGHT - NAVHEIGHT;
let ALLOBJECTS = [];
let annie;
let dirt;
let score = 0;

function randInclusive(a, b) {
  return Math.floor(Math.random() * (b-a + 1)) + a;
}

class Dirtpile {
  constructor() {
    this.width = 30;
    this.height = 30;
    this.x = randInclusive(0, GAMEWIDTH-30);
    this.y = randInclusive(NAVHEIGHT,GAMEHEIGHT-30);
  }

  render() {
    fill('brown');
    rect(this.x, this.y, this.width, this.height);
  }

  newLocation() {
    this.x = randInclusive(0, WIDTH-30);
    this.y = randInclusive(NAVHEIGHT,GAMEHEIGHT-30);
  }

}

class Annie {
  constructor() {
    this.x = 200;
    this.y = 200;
    this.width = 25;
    this.height = 25;
  }

  render() {
    fill('white');
    ellipse(this.x, this.y, this.width, this.height);
  }

  moveLeft() {
    this.x -= MOVEDIST;
  }

  moveRight() {
    this.x += MOVEDIST;
  }

  moveUp() {
    this.y -= MOVEDIST;
  }

  moveDown() {
    this.y += MOVEDIST;
  }

}

function annieMovement() {
  if(keyIsDown(LEFT_ARROW)) {
      annie.moveLeft();
  }

  if(keyIsDown(RIGHT_ARROW)) {
      annie.moveRight();
  }

  if(keyIsDown(UP_ARROW)) {
      annie.moveUp();
  }

  if(keyIsDown(DOWN_ARROW)) {
      annie.moveDown();
  }
}

function checkAnnieDirtCollide() {
  let hit = collideRectCircle(dirt.x, dirt.y, dirt.width, dirt.height, annie.x, annie.y, annie.width, annie.height);
  if(hit) {
    dirt.newLocation();
    score++;
  }
}

function drawNavBar() {
  fill(200, 200, 200);
  rect(0, 0, NAVWIDTH, NAVHEIGHT);
  fill(0, 0, 0);
  textSize(NAVHEIGHT - 10);
  text("Score: " + score, 0, 0, NAVWIDTH, NAVHEIGHT);
}

function setup() {
  let myCanvas = createCanvas(WIDTH, HEIGHT);
  myCanvas.parent('gameContainer');
  annie = new Annie();
  ALLOBJECTS.push(annie);
  dirt = new Dirtpile();
  ALLOBJECTS.push(dirt);
}

function draw() {
  background(255, 255, 255);
  drawNavBar();

  annieMovement();
  checkAnnieDirtCollide();

  for(let obj of ALLOBJECTS) {
    obj.render();
  }
}
