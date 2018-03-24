const MOVEDIST = 10;
let ALLOBJECTS = [];

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

function setup() {
  let myCanvas = createCanvas(600, 400);
  myCanvas.parent('gameContainer');
  let annie = new Annie();
  ALLOBJECTS.push(annie);
}

function draw() {
  background(255, 255, 255);


  for(let obj of ALLOBJECTS) {
    obj.render();
  }
}
