// My first Lunar Lander-style game in JavaScript

let catColor = (150, 150, 150);
let catShade = (125, 125, 125);
let catDark = (100, 100, 100);

//Canvas
function setup() {
  createCanvas(600, 550);
  background(255, 255, 255);
  angleMode(DEGREES);
}

//Background
function greenery() {
  push();
  noStroke();
  fill("lightblue");
  rect(0, 0, width, height);

  fill("darkgreen");
  rect(0, 500, width, 100);
}

//Cat

function cat(x, y) {
  //tail
  noStroke();
  fill(catDark);

  beginShape();
  vertex(80, 10);
  bezierVertex(80, 10, 100, - 10, 80, - 30);
  bezierVertex(80, - 30, 60, - 40, 80, - 60);
  bezierVertex(80,  - 80, 40, - 40, 70, -20);
  bezierVertex(70, - 20, 85, - 10, 70, 0);
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
  triangle(- 15, - 5, - 4, - 12, - 15, - 20);
  triangle( 15, - 5, 4, - 12, 15, - 20);
  //whiskers
  stroke(0, 0, 0);
  line(-5, 2, -16, -2);
  line(-5, 2, -16, 2);
  line(5, 2, 16, - 2);
  line(5, 2, 16, 2);
  //eyes
  noStroke();
  fill(0, 0, 0);
  ellipse(-6, - 5, 5);
  ellipse(6, - 5, 5);
  //nose
  fill(200, 50, 50);
  triangle(-2, 0, 2, 0, 0, 4);
}

function birds(x, y) {
  //head
  ellipse(0, 0, 30);
}

let birdsX = 100;
let birdsY= 100;
let catY = 100;
let catX = 100;
let velocity = 1;
let acceleration = 0.08;
let gameIsActive = true;
let angle = 0;

function draw() {
  greenery(255, 255, 255);

  birds(birdsX, birdsY);
  birdsX -= birdsX;
  birdsY = birdsY;
 
  push();
  ellipseMode(CENTER);
  translate(catX, catY);
  rotate(angle);
  angle += 0.5;
  cat(catX, catY);
  pop();
  
  if (gameIsActive) {
    catY += velocity;
    velocity += acceleration;

    if (keyIsPressed) {
      if (keyCode == UP_ARROW) {
        velocity -= 0.3;
    } else if (keyCode == DOWN_ARROW) {
      velocity += 0.3 ;
    }
    if (keyIsPressed) {
      if (keyCode == RIGHT_ARROW) {
        catX++;
      } else if (keyCode == LEFT_ARROW) {
        catX--;
      }
    }
  }

    if (catY > 475) {
      gameIsActive = false;
      noLoop();
    }
  }
}