const MOVEDIST = 10;
const WIDTH = 800;
const HEIGHT = 450;
const NAVWIDTH = WIDTH;
const NAVHEIGHT = 50;
const GAMEWIDTH = WIDTH;
const GAMEHEIGHT = HEIGHT - NAVHEIGHT;
let ENEMIES = [];
let annie;
let dirt;
let score = 0;

function randInclusive(a, b) {
  return Math.floor(Math.random() * (b-a + 1)) + a;
}

class Water {

  constructor() {
    this.radius = 50;
    this.x = randInclusive(0, GAMEWIDTH-30);
    this.y = randInclusive(NAVHEIGHT,GAMEHEIGHT-30);
  }

  render() {
    if(this.radius > 0) {
      fill('blue');
      ellipse(this.x, this.y, this.radius, this.radius);
      this.radius -= 0.5;
      return true;
    } else {
      return false;
    }
  }

  checkCollide(a) {
    let hit = collideCircleCircle(this.x, this.y, this.radius, a.x, a.y, a.radius);
    if(hit) {
      a.reset();
      this.radius = 0;
      return true;
    } else {
      return false;
    }
  }

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
    return true;
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
    this.radius = 25;
    this.lightness = 100;
    this.color = color('hsl(16, 58%, ' + this.lightness + '%)');
  }

  updateColor(value) {
    this.lightness -= value;
    this.color = color('hsl(16, 58%, ' + this.lightness + '%)');
  }

  render() {
    fill(this.color);
    ellipse(this.x, this.y, this.radius, this.radius);
    return true;
  }

  moveLeft() {
    if(this.x - MOVEDIST > 0) {
        this.x -= MOVEDIST;
    }
  }

  moveRight() {
    if(this.x + MOVEDIST < GAMEWIDTH) {
      this.x += MOVEDIST;
    }
  }

  moveUp() {
    if(this.y - MOVEDIST > NAVHEIGHT) {
        this.y -= MOVEDIST;
    }
  }

  moveDown() {
    if(this.y + MOVEDIST < NAVHEIGHT + GAMEHEIGHT) {
      this.y += MOVEDIST;
    }
  }

  reset() {
    score = 0;
    this.lightness = 100;
    this.color = color('hsl(16, 58%, ' + this.lightness + '%)');
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
  let hit = collideRectCircle(dirt.x, dirt.y, dirt.width, dirt.height, annie.x, annie.y, annie.radius, annie.radius);
  if(hit) {
    dirt.newLocation();
    annie.updateColor(5);
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

function generateWater() {
    if(randInclusive(0, 50) == 1) {
       w = new Water();
       ENEMIES.push(w);
    }
}

function renderAll() {
  annie.render();
  dirt.render();
  for(let i = ENEMIES.length - 1; i >= 0; i--) {
    let obj = ENEMIES[i];
    if(!obj.render()) {
        ENEMIES.splice(i, 1);
    }
  }
}

function checkAnnieEnemiesCollide() {
    for(let i = ENEMIES.length - 1; i >= 0; i--) {
        let obj = ENEMIES[i];
        if(obj.checkCollide(annie)) {
          ENEMIES.splice(i, 1);
        }
    }
}

function setup() {
  let myCanvas = createCanvas(WIDTH, HEIGHT);
  myCanvas.parent('gameContainer');
  annie = new Annie();
  dirt = new Dirtpile();
}

function draw() {
  background(255, 255, 255);
  drawNavBar();
  generateWater();

  annieMovement();
  checkAnnieDirtCollide();
  checkAnnieEnemiesCollide();

  renderAll();
}
