let baseUrlPictures = 'https://oscaraccorsi.github.io/pictures/';
let img, logo;
let palette = [];
let palettes = [];
let pictureList = ['riley57.jpeg', 
                   'Rothko01.jpg', 
                   'Rothko04.jpg', 
                   'Rothko06.jpg',
                   'Rothko07.jpg', 
                   'Rothko09.jpg', 
                   'klee.jpg',  
                   'riley5.jpeg', 
                   'riley6.jpeg',
                   'veronesi04.jpeg',
                   'mond.jpg', 
                   'schneiderMio.png',
                   'munariluce.png',
                   'munariluce.png', 
                   'munariluce02.png',
                   'munariluce03.png'];

let dy, hou;

let boxes = [];
let co;
let numb = [];

let fibo = [];
let w;
let h;

let limitW;

let drone;
let lowFilter; 

function preload() {
  dy = day()%16;
  img = loadImage(baseUrlPictures + pictureList[dy]);
  drone = new Tone.Player('assets/scanner.mp3').toDestination();
  logo = loadImage(baseUrlPictures + 'good one white.png');  
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//--------------------------------------------------------SETUP
function setup() {
  createCanvas(windowWidth, windowHeight);
  xLogo = windowWidth-40;
  setInterval(reloadPage, 1000*60);
  
//--------------------------------------------------------arrays
  fibo = [width/10, width/8, width/6, width/4, width/3];
  numb = [width/80, width/50, width/25, width/10];
  
  img.resize(200, 0);
  img.loadPixels();
  
//--------------------------------------------------suono  
  drone.loop = true;
  drone.autostart = true;
  
//-------------------------------------------------palette  
  for (let i=0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i]; 
    let g = img.pixels[i+1]; 
    let b = img.pixels[i+2];
    let alph = round(random(50, 150));
    let c = color(r, g, b, 100);
    palette.push(c);    
  }
  w = random(fibo);
  co = random(0.1, 0.01);
  
//----------------------------------------------------objects      
  for(let i = 0; i < round(random(numb)) ; i++) {
    
    boxes[i] = {
      x: random(w,width-w),
      y: height/2,
      speedX: random(-co, co),
      speedY: random(-co, co),
      col: random(palette),
    };
  }
}   

//----------------------------------------------------------DRAW
function draw() {
  noStroke();
  rectMode(CENTER);
  
  for (b of boxes) {
    fill(b.col);
    rect(b.x, b.y, w, 5, 5);
    b.y += b.speedY
  }
}
//------------------------------------reloadPage
function reloadPage() {
   window.location.reload();
}
//--------------------------------------------mousePressed
function mousePressed() {
  imageMode(CENTER);
  logo.resize(40, 0);
  image(logo, xLogo, windowHeight-25);
  tint(200); 
  save();
  clear();
  //background(15, 15, 15);
}
