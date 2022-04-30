let baseURLImage = 'https://oscaraccorsi.github.io/pictures/';
let img, logo;
palette = [];

let boxes = [];
let co;
let numb = [25, 50, 100, 200];

let fibo = [55, 89, 144, 233]
let w;
let h = 1;

let limitW, limitH;

let drone;
let lowFilter; 

function preload() {
  
  drone = new Tone.Player('assets/scanner.mp3').toDestination();
  img = loadImage(baseURLImage + 'schneiderMio.png');
  logo = loadImage(baseURLImage + 'good one white.png');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//-----------------------------------------------SETUP
function setup() {
  createCanvas(windowWidth, windowHeight);
  xLogo = windowWidth-40;
  img.resize(100, 200);
  img.loadPixels();
//-----------------------------suono  
  drone.loop = true;
  drone.autostart = true;
  
//----------------------------------palette  
  for (let i=0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i]; 
    let g = img.pixels[i+1]; 
    let b = img.pixels[i+2]; 
    let c = color(r, g, b, 150);
    palette.push(c);    
  }
  w = random(fibo);
  limitH = random(fibo);
  co = random(0.1, 0.01);
  for(let i = 0; i < random(numb) ; i++) {
    
    //fill(random(palette));
    noStroke();
    
    boxes[i] = {
      x: random(120,width-120),
      y: height/2,
      speedX: random(-co, co),
      speedY: random(-co, co),
      col: random(palette),
    };
  }
}   

//------------------------------------------DRAW
function draw() {
  //background(15, 15, 15);
  
  rectMode(CENTER);
  
  // stroke(255);
  // for(i = 0; i < boxes.lengh; i++) {
  //   let box = boxes[i];
  
  for (b of boxes) {
    fill(b.col);
    rect(b.x, b.y, w, h, 5);
    
    // b.x += b.speedX;
    b.y += b.speedY;

    // if (b.x < 100 || b.x > width-100) {
    //   b.speedX = -b.speedX; 
    // }
    if (b.y < limitH/2 || b.y > windowHeight-limitH/2) {
      clear();
      clear();
      riparti();
    }
    //w += 0.002
    h += 0.002
    if (h >= limitH) {
      h = limitH;
    }
    if (w >= limitW) {
      w = limitW;
    }
  }
}
function riparti() {
  boxes.lenght = 0;
  clear();
  h = 1;
  notSetUp();
}
//-------------------------------------------notSetUp
function notSetUp() {
   w = random(fibo);
  limitH = random(fibo);
  co = random(0.1, 0.01);
  for(let i = 0; i < random(numb) ; i++) {
    
    //fill(random(palette));
    noStroke();
    
    boxes[i] = {
      x: random(120,width-120),
      y: height/2,
      speedX: random(-co, co),
      speedY: random(-co, co),
      col: random(palette),
    };
  }
}

function mousePressed() {
  imageMode(CENTER);
  logo.resize(40, 0);
  image(logo, xLogo, windowHeight-25);
  tint(200); 
  save();
  clear();
  //background(15, 15, 15);
}

