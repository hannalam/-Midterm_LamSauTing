class Spaceship {

  constructor(){
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width/2, height/2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem();
    this.size = 50;
  }

  run(){
    this.bulletSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();
  }

  draw(){
    fill(200, 120, 0);
    triangle(this.location.x - this.size/2, this.location.y + this.size/2,
        this.location.x + this.size/2, this.location.y + this.size/2,
        this.location.x, this.location.y - this.size/2);
    //adding jets thrusters
    fill(150);
    rect(this.location.x - this.size/2, this.location.y + this.size/2, this.size, this.size);
    fill(255,100,0);
    ellipse(this.location.x - this.size/2, this.location.y + this.size/2*3, this.size/3, this.size/2);
    ellipse(this.location.x + this.size/2, this.location.y + this.size/2*3, this.size/3, this.size/2);
  }

  move(){
      // YOUR CODE HERE (4 lines)
      this.velocity.add(this.acceleration);
      this.location.add(this.velocity);
      this.acceleration.mult(0);
      this.velocity.limit(this.maxVelocity);

  }

  applyForce(f){
    this.acceleration.add(f);
  }

  interaction(){
      if (keyIsDown(LEFT_ARROW)){
        this.applyForce(createVector(-0.1, 0));
      }
      if (keyIsDown(RIGHT_ARROW)){
      // YOUR CODE HERE (1 line)
        this.applyForce(createVector(+0.1, 0));
      }
      if (keyIsDown(UP_ARROW)){
      // YOUR CODE HERE (1 line)
        this.applyForce(createVector(0, -0.1));
      }
      if (keyIsDown(DOWN_ARROW)){
      // YOUR CODE HERE (1 line)
        this.applyForce(createVector(0, +0.1));
      }
  }

  fire(){
    this.bulletSys.fire(this.location.x, this.location.y);
  }

  edges(){
    if (this.location.x<0) this.location.x=width;
    else if (this.location.x>width) this.location.x = 0;
    else if (this.location.y<0) this.location.y = height;
    else if (this.location.y>height) this.location.y = 0;
  }

  setNearEarth(){
    //YOUR CODE HERE (6 lines approx)
    //Step 9
    //pulls the spaceship towards the earth
    this.applyForce(new createVector(0, 0.05));
    //friction and the spaceship in empty space
    this.applyForce(-this.velocity/30);
  }
}
