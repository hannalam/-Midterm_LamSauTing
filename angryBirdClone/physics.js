////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){
  // your code here
  // set up a rectangle and add to the world
  propeller = Bodies.rectangle(150, 480, 200, 15, {
    isStatic: true, angle: angle
  });
  World.add(engine.world, [propeller]);

}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
  push();
  // your code here
  fill(255);
  drawVertices(propeller.vertices);
  Body.setAngle(propeller, angle);
  Body.setAngularVelocity(propeller, angleSpeed);
  angle += angleSpeed;
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
  // set up a bird and add to the world, push bird in birds array
  var birdSize = random(10, 50);  //changing the size of bird
  var bird = Bodies.circle(mouseX, mouseY, birdSize, {friction: 0,
      restitution: 0.95 });
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  push();
  //your code here
  var redTrans = random(200,255); //changing the colors in  different transparency
  fill(255, 0, 0, redTrans);
  for (var i = 0; i < birds.length; i++){ 

    //if the bird has left the screen, remove it from the physics world
    if (isOffScreen(birds[i])){
      removeFromWorld(birds[i]);
      birds.splice(i, 1);
      //decrement for-loop counter in order not to break the code
      i--;  
    }
    else{
      drawVertices(birds[i].vertices);
    }
  }
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
  //you code here
  //Build a tower in six boxes high, three boxes wide
  for (var i = 0; i< 6; i++)
  {
    for (var j = 0; j < 3; j++)
    {
      //random shades of green onto the colors array
      //var green = color(0, random(50,255), 0);
      //colors.push(green);

      //changing blue color of the tower
      var blue = color(0, 0, random(50,255));
      colors.push(blue);

      //Each box size 80x80 pixels
      var box = Bodies.rectangle(650 + j*80, 140 + i*80, 80, 80);
      boxes.push(box); 
    }
  }
  World.add(engine.world, boxes);
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  push();
  //your code here
  for (var i = 0; i<18; i++){
    //colors inside the colors array
    fill(colors[i]);
    drawVertices(boxes[i].vertices);
  }
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
//your code here
//initialise slingshotBird as a body 
slingshotBird = Bodies.circle(150, 200, 20, {friction: 0,
  restitution: 0.95 });

// the mass of the slingshotBird as ten times its original mass
Matter.Body.setMass(slingshotBird, slingshotBird.mass*10);

slingshotConstraint = Constraint.create({
  bodyB: slingshotBird,
  pointA: { x: 150, y: 200 },
  stiffness: 0.01,
  length:25,
  damping: 0.0001
});

//add both the bird and the constraint to the world
World.add(engine.world, [slingshotBird, slingshotConstraint]);
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
  // your code here
  fill(255, 165, 0);
  drawVertices(slingshotBird.vertices);
  drawConstraint(slingshotConstraint);
  pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}
/////////////////////////////////////////////////////////////////
function drawCount(){
  fill(255);
  textSize(20);
  text("Angry Ball", 20, 30)
}
