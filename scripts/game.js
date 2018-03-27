const MOVEDIST = 10;
const WIDTH = 800;
const HEIGHT = 450;
let ALLOBJECTS = [];
let annie;
let dirt;

function randInclusive(a, b) {
  return Math.floor(Math.random() * (b-a + 1)) + a;
}

class Dirtpile {
  constructor() {
    this.width = 30;
    this.height = 30;
    this.x = randInclusive(0, WIDTH-30);
    this.y = randInclusive(0,HEIGHT-30);
  }

  render() {
    fill('brown');
    rect(this.x, this.y, this.width, this.height);
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

function checkCollide(obj1, obj2) {
  
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

  annieMovement();
  checkCollide(annie, dirt);

  for(let obj of ALLOBJECTS) {
    obj.render();
  }
}
