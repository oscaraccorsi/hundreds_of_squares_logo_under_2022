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
let numb = [25, 50, 100, 200];

let fibo = [55, 89, 144, 233]
let w;
let h;

let limitW, limitH;

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

//-----------------------------------------------SETUP
function setup() {
  createCanvas(windowWidth, windowHeight);
  xLogo = windowWidth-40;
  setInterval(reloadPage, 1000*60);
  
  
  img.resize(200, 0);
  img.loadPixels();
  
  
//-----------------------------suono  
  drone.loop = true;
  drone.autostart = true;
  
//----------------------------------palette  
  for (let i=0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i]; 
    let g = img.pixels[i+1]; 
    let b = img.pixels[i+2];
    let alph = round(random(50, 150));
    let c = color(r, g, b, 100);
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
  
  
  rectMode(CENTER);
  
  for (b of boxes) {
    fill(b.col);
    rect(b.x, b.y, w, dy, 5);
    
    
    b.y += b.speedY
  }
}

function reloadPage() {
   window.location.reload();
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
