const MOVEDIST = 10;
const WIDTH = 800;
const HEIGHT = 450;
let ALLOBJECTS = [];
let annie;

class Annie {
  constructor() {
    this.x = 200;
    this.y = 200;
    this.width = 25;
    this.height = 25;
  }

  render() {
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

function setup() {
  let myCanvas = createCanvas(WIDTH, HEIGHT);
  myCanvas.parent('gameContainer');
  annie = new Annie();
  ALLOBJECTS.push(annie);
}

function draw() {
  background(255, 255, 255);

  annieMovement();

  for(let obj of ALLOBJECTS) {
    obj.render();
  }
}
