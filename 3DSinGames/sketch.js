//step5
//create two global arrays for confetti
//store the location of each confetti
var confLocs = [];
//store the initial angle of each confetti
var confTheta =[];

function setup() {
    createCanvas(900, 800, WEBGL);
    angleMode(DEGREES);

    
    //step5
    //push 200 3D vectors into confLocs
    for (var i = 0; i < 200; i++){
        let vector = createVector(random(-500,500), random(-800,800), random(-500,500));
        confLocs.push(vector);
        confTheta.push(random(360));
    }
    
}

function draw() {
    textSize(16);
    fill(255);
    text("Press N for Night Mode", 100, 100);
    //Step 7 - Ideas for further development
    //Idea 2 - Creates a "night mode" version of the scene that can be activated by pressing the "n" key
    if(keyIsPressed && key === 'n'){
        background(0);
        strokeWeight(2);
        stroke(255);
        noFill();
    }
    else{
        background(125);
        //step 2
        //Set the material to normal
        normalMaterial();
        //use a stroke weight of two
        strokeWeight(2);
        //set the stroke to zero
        stroke(0);

        //Step 7 - Ideas for further development
        //Idea 1 - Add ambient lighting to the scene
        ambientLight(100);

    }

    
    //step 1
    //the camera at location (800, -600, 800) and have it point at the centre of the scene
    //step 4
    //get the camera to fly in a circle around the structure
    let camX = 800 * cos(frameCount * 0.1);
    let camZ = 800 * sin(frameCount * 0.1);
    camera(camX, -600, camZ, 0, 0, 0, 0, 1, 0);
    //in step 1, i used the stable camera
    //camera(800, -600, 800, 0, 0, 0, 0, 1, 0);
    

    //step 1
    //Using a nested for loop, create a grid of boxes in the x-axis and z-axis
    for (var x = -400; x< 400; x+=50){
        for (var z = -400; z< 400; z+=50){
            //step 3
            //Calculate its distance from the centre of the coordinate system for each box
            let distance = dist(x, z, 0, 0);
            //set the height of the boxes using length variable
            //Add frameCount to distance in order to animate the wave
            //let length = map(sin(frameCount /2 + distance), -1, 1, 100, 300);

            let length = sin(frameCount  + distance);
            let mapping = map((length), -1, 1, 100, 300);
            push();
            translate(x, mapping, z);
            box(50, mapping, 50);
            pop();
        }
    }

    //call the function to have confetti rain
    confetti();
}

//step 5
//a function to loop over the confLocs array
function confetti() {
    for (var i = 0; i<confLocs.length; i++){
        push();
        //for each entry translate to that location the 3D vector describes
        translate(confLocs[i].x, confLocs[i].y, confLocs[i].z);
        //rotate by the corresponding theta 
        rotateY(confTheta[i]);
        //draw a plane of size 15x15
        plane(15);
        pop();

        //step 6
        //Increment the y-coordinate of the specific confetti by 1 so that it keeps travelling downwards
        confLocs[i].y +=1;
        //increment the rotation by 10 so that it keeps spinning
        confTheta[i] += 10;

        //check if the y-coordinate of the confetti 
        if (confLocs[i].y > 0){
            //if it has reached the middle of the coordinate system, set the specific vector’s y component to -800
            confLocs[i].y =-800;
        }
    }
}