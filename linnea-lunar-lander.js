// My first Lunar Lander-style game in JavaScript

//Keywords for cat colors
let catColor = (150, 150, 150);
let catShade = (125, 125, 125);
let catDark = (100, 100, 100);

// Starting keywords
let mode; //code adapted from Magic Monk on YouTube https://www.youtube.com/watch?v=TgHhEzKlLb4
const startText = "Kitty Lander";
const play = "Press any key to play";
//Winning keyword
const winText = "You saved one of the cat's nine lives!";
//Losing keyword
const loseText = "Be meow careful next time!";
//Play again keyword
const playAgain = "Press any key to play again";

//Canvas
function setup() {
  mode = 0; //code adapted from Magic Monk on YouTube https://www.youtube.com/watch?v=TgHhEzKlLb4
  createCanvas(600, 550);
  background(255, 255, 255);
  angleMode(DEGREES);
}

//Start screen
function startScreen() {
  background(255, 255, 255);
  fill(0, 0, 0);
  textAlign(CENTER);
  textSize(40);
  text(startText, width / 2, height / 2);
  textSize(25);
  text(play, width / 2, height / 2 + 30);
}

//Game over screen
function gameOver() {
  background(0, 0, 0);
  fill(255, 255, 0);
  textAlign(CENTER);
  textSize(25);
  text(loseText, width / 2, height / 2);
  textSize(10);
  text(playAgain, width / 2, height / 2 + 20);
}

//Game win screen
function gameWin() {
  background(0, 0, 0);
  fill(255, 255, 255);
  textAlign(CENTER);
  textSize(25);
  text(winText, width / 2, height / 2);
  textSize(10);
  text(playAgain, width / 2, height / 2 + 20);
}

//Background
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

  //tree
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

//Bird obstacles
function birds(x, y) {
  //head
  ellipse(600, 100, 30);
}

//Keywords for draw function
let birdsX = 100;
let birdsY = 100;
let catY = 100;
let catX = 100;
let velocity = 1;
let acceleration = 0.08;
let gameIsActive = true;
let angle = 0;

function draw() {
  if (mode == 0) {
    //code adapted from Magic Monk on YouTube https://www.youtube.com/watch?v=TgHhEzKlLb4
    startScreen();
  }
  if (mode == 1) {
    //background
    greenery(255, 255, 255);

    //obstacles
    birds(birdsX, birdsY);
    birdsX -= birdsX;
    birdsY = birdsY;

    //cat and its rotation
    push();
    ellipseMode(CENTER);
    translate(catX, catY);
    rotate(angle);
    angle += 1;
    cat(catX, catY);
    pop();

    //game while active if statements
    if (gameIsActive) {
      catY += velocity;
      velocity += acceleration;

      if (keyIsPressed) {
        if (keyCode == UP_ARROW) {
          //move up
          velocity -= 0.3;
        } else if (keyCode == DOWN_ARROW) {
          //move down
          velocity += 0.3;
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
        gameIsActive = false;
        noLoop();
        if (angle < 330 && angle > 30) {
          //not landing on all four paws
          gameOver();
        } else {
          //landing on all four paws
          gameWin();
        }
      }
    }
  }
}

function keyPressed() {
  //code adapted from Magic Monk on YouTube https://www.youtube.com/watch?v=TgHhEzKlLb4
  if (keyIsPressed) {
    mode = 1;
  }
}
