// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg
var imgIn;
var imgOut;
var filter = 1;
var matrix = [
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64]
];
/////////////////////////////////////////////////////////////////
function preload() {
    imgIn = loadImage("assets/husky.jpg");
}
/////////////////////////////////////////////////////////////////
function setup() {
    createCanvas((imgIn.width * 2), imgIn.height);
}
/////////////////////////////////////////////////////////////////
function draw() {
    background(125);
    image(imgIn, 0, 0);
    image(earlyBirdFilter(imgIn), imgIn.width, 0);
    noLoop();
}
/////////////////////////////////////////////////////////////////
function mousePressed(){
  loop();
}
/////////////////////////////////////////////////////////////////
function earlyBirdFilter(img){
  imgOut = createImage(img.width, img.height);
  var resultImg = createImage(imgIn.width, imgIn.height);

  // filter 1 is the standard sepia + radial Blur
  if(filter == 1){  
    resultImg = sepiaFilter(imgIn); //Step 1
    resultImg = radialBlurFilter(resultImg); //Step 3
  }
  // filter 2 is dark Corners + radial Blur
  else if (filter == 2){
    resultImg = sepiaFilter(imgIn); //Step 1
    resultImg = darkCorners(resultImg); //Step 2
    resultImg = radialBlurFilter(resultImg); //Step 3
  }
  // filter 3 is radial Blur + border Filter
  else if (filter == 3){
    resultImg = sepiaFilter(imgIn); //Step 1
    resultImg = radialBlurFilter(resultImg); //Step 3
    resultImg = borderFilter(resultImg) //Step 4
  }
  // the default filter is filter 1
  else {
    resultImg = sepiaFilter(imgIn); //Step 1
    resultImg = radialBlurFilter(resultImg); //Step 3
  }
  return resultImg;
}

//Step 1 Turn the image into sepia
function sepiaFilter(img){
  
  imgOut.loadPixels();
  img.loadPixels();

  for (x = 0; x < imgOut.width; x++) {
      for (y = 0; y < imgOut.height; y++) {

        var index = (x + y * imgOut.width) * 4;
        
        //store the values from each channel
        var oldRed = img.pixels[index + 0];
        var oldGreen = img.pixels[index + 1];
        var oldBlue = img.pixels[index + 2];

        //implementation involves each channel of all pixels
        var newRed = (oldRed * .393) + (oldGreen *.769) + (oldBlue * .189)
        var newGreen = (oldRed * .349) + (oldGreen *.686) + (oldBlue * .168)
        var newBlue = (oldRed * .272) + (oldGreen *.534) + (oldBlue * .131)

        //set the new values of each channel
        imgOut.pixels[index+0] = newRed;
        imgOut.pixels[index+1] = newGreen;
        imgOut.pixels[index+2] = newBlue;
        imgOut.pixels[index+3]= 255;
      }
  }
  imgOut.updatePixels();
  return imgOut;
}

//Step 2 Adding dark corners -- vignetting
function darkCorners(img){
  var maxDist = constrain(0, 0, img.width/2, img.height/2);
  var dynLum = 0; //hold the scaling that will be required for each channel

  imgOut.loadPixels();
  img.loadPixels();

  for (x = 0; x < imgOut.width; x++) {
      for (y = 0; y < imgOut.height; y++) {

        var index = (x + y * imgOut.width) * 4;
        var oldRed = img.pixels[index + 0];
        var oldGreen = img.pixels[index + 1];
        var oldBlue = img.pixels[index + 2];

        var d = dist(x, y, img.width/2, img.height/2);
        
        if (d < 300) {  
          //no adjustment (multiply each channel by 1)
          dynLum = 1;
        } else if (d < 450) { 
          //from 300 to 450 scale by 1 to 0.4 depending on distance
          //remap the distance of each pixel
          dynLum = map(d, 300, 450, 1, 0.4);
        } else { 
          //450 and above scale by a value between 0.4 and 0
          //remap the distance of each pixel
          dynLum = map(d, 450, maxDist, 0.4, 0);
        }
        //set the values of each channel
        imgOut.pixels[index+0] = dynLum * oldRed;
        imgOut.pixels[index+1] = dynLum * oldGreen;
        imgOut.pixels[index+2] = dynLum * oldBlue;
      }
  }
  imgOut.updatePixels();
  return imgOut;

}

//Step 3 blur filter
function radialBlurFilter(img){
  var imgOut = createImage(img.width, img.height);
  var matrixSize = matrix.length;

  imgOut.loadPixels();
  img.loadPixels();

  // read every pixel
  for (var x = 0; x < imgOut.width; x++) {
      for (var y = 0; y < imgOut.height; y++) {

          var index = (x + y * imgOut.width) * 4;
          var c = convolution(x, y, matrix, matrixSize, img);

          var r = img.pixels[index + 0]; //red channel in the original image
          var g = img.pixels[index + 1]; //green channel in the original image
          var b = img.pixels[index + 2]; //blue channel in the original image
          
          var dynBlur = dist(mouseX, mouseY, x + img.width, y); //distance from the mouse
          dynBlur = map(dynBlur, 100, 300, 0, 1); //remap the distance from a range 100 to 300  to a new range from 0 to 1 
          dynBlur = constrain(dynBlur,0,1); //return value from 0 to 1 

          imgOut.pixels[index + 0] = c[0]*dynBlur + r*(1-dynBlur); // new red channel
          imgOut.pixels[index + 1] = c[1]*dynBlur + g*(1-dynBlur); // new green channel
          imgOut.pixels[index + 2] = c[2]*dynBlur + b*(1-dynBlur); // new blue channel
          imgOut.pixels[index + 3] = img.pixels[index + 3];
      }
  }
  imgOut.updatePixels();
  return imgOut;
}

function convolution(x, y, matrix, matrixSize, img) {
    var totalRed = 0.0;
    var totalGreen = 0.0;
    var totalBlue = 0.0;
    var offset = floor(matrixSize / 2);

    // convolution matrix loop
    for (var i = 0; i < matrixSize; i++) {
        for (var j = 0; j < matrixSize; j++) {
            // Get pixel loc within convolution matrix
            var xloc = x + i - offset;
            var yloc = y + j - offset;
            var index = (xloc + img.width * yloc) * 4;
            // ensure we don't address a pixel that doesn't exist
            index = constrain(index, 0, img.pixels.length - 1);

            // multiply all values with the mask and sum up
            totalRed += img.pixels[index + 0] * matrix[i][j];
            totalGreen += img.pixels[index + 1] * matrix[i][j];
            totalBlue += img.pixels[index + 2] * matrix[i][j];
        }
    }
    // return the new color
    return [totalRed, totalGreen, totalBlue];
}

// Step 4 Add a border around the image
function borderFilter(img){
    //create a local buffer of the same size as the input image
    var buffer = createGraphics(img.width, img.height); 

    buffer.image(img, 0, 0); //Draw the img onto the buffer
    buffer.noFill(); 
    buffer.stroke(255); //white color
    buffer.strokeWeight(45); // big, fat, white rectangle
    buffer.rect(0, 0, img.width, img.height, 55); //rectangle with rounded corners
    buffer.strokeWeight(15);
    buffer.rect(0, 0, img.width, img.height); //another rectangle without rounded corners
    return buffer;
}

function keyPressed(){
  if (key == "1") {  // press 1 go to filter 1
    filter = 1;
    loop();
  }
  else if ( key == "2"){ // press 2 go to filter 2
    filter = 2;
    loop();
  } 
  else if ( key == "3"){ // press 3 go to filter 3
    filter = 3;
    loop();
  }
}