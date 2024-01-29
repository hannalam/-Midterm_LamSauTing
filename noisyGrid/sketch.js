var stepSize = 20;

function setup() {
  createCanvas(500, 500);
}
///////////////////////////////////////////////////////////////////////
function draw() {
  background(125);

  colorGrid();
  compassGrid();
}
///////////////////////////////////////////////////////////////////////
function colorGrid(){
  // your code here
  
  push();
  //create a 25x25 grid of rectangles, two for loops
  for (var i = 0; i< 25; i++){
    for (var j = 0; j < 25; j++){
      //fill(255); //fill to white for setup checking
      //stroke(0); //stroke to black for setup checking
      noStroke();
      
      //resign for the colors and style
      var from = color(0, 50, 255);   
      var to = color(255, 0, 0);
      var speed = mouseX/2;
      
      //using the tile’s x and y coordinate as well as the frameCount so that the noise values change over time
      //a grid of tiles with slowly changing colors
      fill(lerpColor(from, to, noise(i/100, j/100, frameCount/speed)));
      rect(stepSize * i, stepSize * j, stepSize, stepSize);
    }
  }
  pop();
}
///////////////////////////////////////////////////////////////////////
function compassGrid(){
  // your code here

  //compass is at the center of each tile
  translate(25/2, 25/2);

  //create a grid of 25x25 lines
  for (var i = 0; i< 25; i++){
    for (var j = 0; j < 25; j++){
      
      push();
      stroke(0);
      strokeWeight(2);
      //move to the center of each grid
      translate(stepSize * i, stepSize * j);

      //compass’ movement speed be dependent on the x coordinate of the mouse
      var change = mouseX*25;
      //compass’ x and y coordinate with the frameCount, the noise values change over time
      //noise value with map() to generate an angle between 0 and 720 degrees
      //value to rotate the compass
      rotate(map(noise(i/250, j/250, frameCount/change), 0, 1, 0, 720));
      //25x25 lines of length stepSize
      line(0, 0, stepSize, stepSize-stepSize);
      pop();
    }
  }
  
}
