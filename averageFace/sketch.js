var imgs = [];
var avgImg;
var numOfImages = 30;


//////////////////////////////////////////////////////////
function preload() { // preload() runs once
  // Step 1: Load all images into the imgs array
  for(var i = 0; i< numOfImages; i++){
    var filename = "assets/" + i + ".jpg";
    imgs.push(loadImage(filename));
    //console.log(filename);
  }
}
//////////////////////////////////////////////////////////
function setup() {
  // Step 2: Update canvas 
  createCanvas(imgs[0].width * 2, imgs[0].height);
  pixelDensity(1);
  background(125);
  // Step 2: draw first image
  image(imgs[0], 0, 0);
  // Step 3: Create empty buffer for calculations
  avgImg = createGraphics(imgs[0].width, imgs[0].height);
  noLoop();

  // Step 7: Idea 1
  // Method1: Button to cycle through different faces
  var nextButton = createButton("Next Face");
  nextButton.mousePressed(function() {
    image(random(imgs), 0, 0);
    loop(); 
  });
  
}
////////////////////////////////////////////////////////
function draw() {
  loadPixels();
  
  // Step 4: Access the pixel data of all the images
  for (var i = 0; i<imgs.length; i++){
    imgs[i].loadPixels();
  }
  avgImg.loadPixels();

  // Step 5: Looping over all pixels on the first image in the array
  for (var x = 0; x < imgs[0].width; x++){
    for (var y = 0; y < imgs[0].height; y++){
      
      // Step 5: Convert the x and y coordinates to a pixel index value
      var index = (x + y * imgs[0].width) * 4;
      var brightRed;
      brightRed = avgImg.pixels[index] = 255; // image is bright red color
      
      // Step 6: Create three variables
      var sumR = 0;
      var sumG = 0;
      var sumB = 0;

      // Step 6: Looping through all the images in the imgs array 
      for (var i = 0; i < imgs.length; i++){
        sumR += imgs[i].pixels[index + 0]; // add red channel value to sumR
        sumG += imgs[i].pixels[index + 1]; // add green channel value to sumG
        sumB += imgs[i].pixels[index + 2]; // add blue channel value to sumB

        avgImg.pixels[index + 0] = sumR / imgs.length; // set red channel
        avgImg.pixels[index + 1] = sumG / imgs.length; // set green channel
        avgImg.pixels[index + 2] = sumB / imgs.length; // set blue channel
        avgImg.pixels[index + 3] = 255; // set transparency 
      }
      
    }
  }
  // Step 5: The avgImg has had its data changed
  avgImg.updatePixels();
  // Step 5: Draw the avgImg to the right of the existing image
  image(avgImg, imgs[0].width, 0);
  // Step 5: only need to do them once
  noLoop(); 
}

// Step 7: Idea 1 
// Method2: Image drawn on the left is a random face by pressing any key
function keyPressed() {
  var randomImg = random(imgs);
  image(randomImg, 0, 0);
  loop();
}

// Step 7: Idea 2 
// mouse moved on the second image transition between the randomly selected image and the average image
function mouseMoved() {
  var t = map(mouseX, 0, width, 0, 1); //the average image based on the mouseX value
  var lerpImg = lerpImage(avgImg, random(imgs), t);
  image(lerpImg, imgs[0].width, 0);
}

//Calculates pixel values of the second image transition between the randomly selected image
//When mouse is more on the left shows the average image
//When mouse is more on the right shows a clear random image
function lerpImage(img1, img2, t) {
  var result = createImage(img1.width, img1.height);
  result.loadPixels();
  for (var i = 0; i < result.pixels.length; i += 4) {
    var r = lerp(img1.pixels[i + 0], img2.pixels[i + 0], t);   
    var g = lerp(img1.pixels[i + 1], img2.pixels[i + 1], t);
    var b = lerp(img1.pixels[i + 2], img2.pixels[i + 2], t);
    var a = lerp(img1.pixels[i + 3], img2.pixels[i + 3], t);
    result.pixels[i + 0] = r;
    result.pixels[i + 1] = g;
    result.pixels[i + 2] = b;
    result.pixels[i + 3] = a;
  }
  result.updatePixels();
  return result;
}