// My first Lunar Lander-style game in JavaScript

//Keywords for cat colors
let catColor = color(150, 150, 150);
let catShade = color(125, 125, 125);
let catDark = color(100, 100, 100);

// Starting keywords
const startText = "Kitty Lander";
const play = "Press any key to play";
//Winning keyword
const winText = "You saved one of the cat's nine lives!";
//Losing keyword
const loseText = "Be meow careful next time!";
//Play again keyword
const playAgain = "Press any key to play again";

//game logic

//gameMode code adapted from Magic Monk on YouTube
//https://www.youtube.com/watch?v=TgHhEzKlLb4

let gameMode = "start";
let catY = 100;
let catX = width / 2;
let velocity = 1;
let acceleration = 0.2;
let isGameActive = false;
let angle = 0;

//canvas setup
function setup() {
  createCanvas(600, 550);
  background(255, 255, 255);
  angleMode(DEGREES);
}

//start screen
function startScreen() {
  background(255, 255, 255);
  fill(0, 0, 0);
  textAlign(CENTER);
  textSize(40);
  text(startText, width / 2, height / 2);
  textSize(25);
  text(play, width / 2, height / 2 + 30);
}

//game over screen
function gameOver() {
  // clear();
  fill(0, 0, 0);
  textAlign(CENTER);
  textSize(25);
  text(loseText, width / 2, height / 2);
  textSize(10);
  text(playAgain, width / 2, height / 2 + 20);
  resetGame();
}

//game win screen
function gameWin() {
  // clear();
  fill(0, 0, 0);
  textAlign(CENTER);
  textSize(25);
  text(winText, width / 2, height / 2);
  textSize(10);
  text(playAgain, width / 2, height / 2 + 20);
  resetGame();
}

//background
function greenery() {
  //sky
  push();
  noStroke();
  fill("lightblue");
  rect(0, 0, width, height);

  //grass
  fill("darkgreen");
  rect(0, 500, width, 100);

  //clouds
  fill("white");
  ellipse(70, 220, 50);
  ellipse(100, 200, 60);
  ellipse(130, 170, 70);
  ellipse(180, 180, 60);
  ellipse(210, 200, 50);
  ellipse(240, 220, 45);
  ellipse(100, 230, 50);
  ellipse(150, 220, 80);
  ellipse(200, 220, 60);

  push();
  translate(400, 100);
  scale(0.7);
  ellipse(70, 220, 50);
  ellipse(100, 200, 60);
  ellipse(130, 170, 70);
  ellipse(180, 180, 60);
  ellipse(210, 200, 50);
  ellipse(240, 220, 45);
  ellipse(100, 230, 50);
  ellipse(150, 220, 80);
  ellipse(200, 220, 60);
  pop();

  //tree
  fill("brown");
  rect(100, 200, 50, 300);
}

//Cat components
function cat(x, y) {
  //tail
  noStroke();
  fill(catDark);

  beginShape();
  vertex(80, 10);
  bezierVertex(80, 10, 100, -10, 80, -30);
  bezierVertex(80, -30, 60, -40, 80, -60);
  bezierVertex(80, -80, 40, -40, 70, -20);
  bezierVertex(70, -20, 85, -10, 70, 0);
  endShape();

  //legs and feet
  ellipse(5, 30, 10, 40);
  ellipse(3, 45, 10);

  ellipse(20, 40, 10, 40);
  ellipse(18, 55, 10);

  ellipse(50, 30, 10, 40);
  ellipse(48, 45, 10);

  ellipse(70, 40, 10, 40);
  ellipse(68, 55, 10);

  //body
  fill(catShade);
  ellipse(40, 10, 80, 40);
  //head
  fill(catColor);
  ellipse(0, 0, 30);
  triangle(-15, -5, -4, -12, -15, -20);
  triangle(15, -5, 4, -12, 15, -20);
  //whiskers
  stroke(0, 0, 0);
  line(-5, 2, -16, -2);
  line(-5, 2, -16, 2);
  line(5, 2, 16, -2);
  line(5, 2, 16, 2);
  //eyes
  noStroke();
  fill(0, 0, 0);
  ellipse(-6, -5, 5);
  ellipse(6, -5, 5);
  //nose
  fill(200, 50, 50);
  triangle(-2, 0, 2, 0, 0, 4);
}

//game states
function draw() {
  //next line of code (gameModes) originally adapted from Magic Monk
  //on YouTube bc i was confused about states
  //https://www.youtube.com/watch?v=TgHhEzKlLb4

  if (gameMode === "start") {
    startScreen();
    if (keyIsPressed === true) {
      gameMode = "play";
    }
  } else if (gameMode === "play") {
    let isGameActive = true;

    //background
    greenery(255, 255, 255);

    //cat and its rotation
    push();
    ellipseMode(CENTER);
    translate(catX, catY);
    rotate(angle);
    angle += 2.5;
    cat(catX, catY);
    pop();

    //game while active if statements
    if (isGameActive === true) {
      catY += velocity;
      velocity += acceleration;

      if (keyIsPressed) {
        if (keyCode == UP_ARROW) {
          //move up
          velocity -= 0.5;
        } else if (keyCode == DOWN_ARROW) {
          //move down
          velocity += 0.5;
        }
        if (keyIsPressed) {
          if (keyCode == RIGHT_ARROW) {
            //move right
            catX++;
          } else if (keyCode == LEFT_ARROW) {
            //move left
            catX--;
          }
        }
      }
      if (catY > 490) {
        //lowest catY can fall before game stops
        if ((angle < 330 && angle > 30) || velocity > 4) {
          //not landing on all four paws OR at high speed
          isGameActive = false;
          gameMode = "lose";
          gameOver();
        } else {
          //landing on all four paws at low speed
          isGameActive = false;
          gameMode = "win";
          gameWin();
        }
      }
    }
  } else if (gameMode === "lose") {
    if (keyIsPressed === true) {
      gameMode = "play";
      isGameActive = true;
    }
  } else if (gameMode === "win") {
    if (keyIsPressed === true) {
      gameMode = "play";
      isGameActive = true;
    }
  }
}

function resetGame() {
  isGameActive = false;
  velocity = 1;
  catY = 100;
  catX = 300;
  angle = 0;
}
