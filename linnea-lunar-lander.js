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