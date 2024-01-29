var speed;

function setup() {
    createCanvas(900, 700);
}

function draw() {
    background(0);
    speed = frameCount;

    push();
    translate(width/2, height/2);
    
    rotate(radians(speed/3));  //sun spin
    celestialObj(color(255,150,0), 200); // SUN
    
    rotate(radians(speed));   //earth spin
    translate(300, 0);  //Move it to orbit 300 pixels
    celestialObj(color(0,0,255), 80); //earth


    rotate(radians(-speed*2));
    translate(-100, 0);   //spins the opposite way
    celestialObj(color(255), 30); //moon 1
    
    translate(200, 0);
    //rotate(radians(-speed*2));
    celestialObj(color(155), 35); //moon 2

    rotate(radians(-speed*2));
    translate(30, 0);
    celestialObj(color(255,0,0), 15); //red tiny moon

    pop();
}

function celestialObj(c, size){
    strokeWeight(5);
    fill(c);
    stroke(0);
    ellipse(0, 0, size, size);
    line(0, 0, size/2, 0);
}
