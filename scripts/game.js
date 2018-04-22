const MOVEDIST = 10;
const WIDTH = 800;
const HEIGHT = 450;
const NAVWIDTH = WIDTH;
const NAVHEIGHT = 50;
const GAMEWIDTH = WIDTH;
const GAMEHEIGHT = HEIGHT - NAVHEIGHT;
const WINSCORE = 10;
const NAVOBJS = [];
let ENEMIES = [];
let STAGE = 0;
let annie;
let dirt;
let score = 0;
let annieImg;

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

  constructor(xs, ys) {
    this.x = xs;
    this.y = ys;
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
    if(score >= WINSCORE) {
      STAGE++;
    }
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

function startButton() {
  fill(100, 100, 255);
  rect(0, GAMEHEIGHT + NAVHEIGHT - 75, GAMEWIDTH, 75);
  fill(0, 0, 0);
  textSize(50);
  text("Play Game!", 0, GAMEHEIGHT + NAVHEIGHT - 75, GAMEWIDTH, 75);
}

function directions() {
  textSize(20);
  fill(0, 0, 0);
  text("You play as Annie, who starts off as a perfectly white circle", 50, 50, 600, 50);
  text("But Annie likes to get dirty, so she tries to find the brown dirt piles", 50, 100, 600, 50);
  text("As she does, Annie gets dirtier and dirtier. You win once Annie is filthy and needs a bath", 50, 150, 600, 50);
  text("But watch out for the water puddles! If she runs through one, it will clean off all the dirt", 50, 225, 600, 50);
}

function startScreen() {
  background(255,255, 255);
  directions();
  startButton();
  if(mouseIsPressed) {
    if(collidePointRect(mouseX, mouseY, 0, GAMEHEIGHT + NAVHEIGHT - 75, GAMEWIDTH, 75)) {
      annie = new Annie(randInclusive(50, GAMEWIDTH - 50), randInclusive(NAVHEIGHT + 50, GAMEHEIGHT - NAVHEIGHT - 50));
      dirt = new Dirtpile();
      STAGE++;
    }
  }
}

function gameScreen() {
  background(255, 255, 255);
  drawNavBar();
  generateWater();

  annieMovement();
  checkAnnieDirtCollide();
  checkAnnieEnemiesCollide();

  renderAll();
}

function endScreen() {
    background(255, 255, 255);
    textSize(50);
    fill(0, 0, 0);
    text("YOU WON! LOOK HOW DIRTY ANNIE IS!", 0, NAVHEIGHT, GAMEWIDTH, 200);
    //sets scale to 0.5, which multiplies global scale factor by 0.5
    scale(0.5, 0.5);
    image(annieImg, GAMEWIDTH, NAVHEIGHT + 200);
    //sets scale to 2, which multiplies global scale factor by 2
    //Combined with earlier 0.5 scale, this will reset back to 1
    scale(2, 2);
    fill(0, 0, 255);
    rect(0, HEIGHT - 100, 200, 100);
    fill(0, 0, 0);
    text("Replay?", 0, HEIGHT - 100, 200, 100);
}



function setup() {
  let myCanvas = createCanvas(WIDTH, HEIGHT);
  myCanvas.parent('gameContainer');
  annieImg = loadImage('https://mathymcmatherson.github.io/anniewebsitestatic/images/annie_game.jpg');

}

function draw() {
  if(STAGE == 0) {
    startScreen();
  } else if (STAGE == 1) {
    gameScreen();
    //STAGE++; //REMOVE THIS LATER!
  } else if (STAGE == 2) {
    endScreen();
    STAGE++;
  } else if (STAGE == 3) {
    if(mouseIsPressed) {
      if(collidePointRect(mouseX, mouseY, 0, HEIGHT - 100, 200, 100)) {
        annie.reset();
        STAGE = 1;
      }
    }
  }
}
