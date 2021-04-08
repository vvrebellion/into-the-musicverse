var mic;
let CITY_SIZE = 1000;
let BUILDING_MAX_SIZE = 80;
let gridSz = CITY_SIZE / BUILDING_MAX_SIZE;
let map = [];

function resetMap() {
  for (let i = 0; i < gridSz; i++)
    for (let j = 0; j < gridSz; j++) {
      map[i][j] = false;
    }
}

function setup() {
  mic = new p5.AudioIn();
  mic.start();
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(RGB);
  // init map
  for (let i = 0; i < gridSz; i++) {
    map[i] = [];
    for (let j = 0; j < gridSz; j++) {
      map[i][j] = false;
    }
  }}


function draw() {
  background(0);
  randomSeed(0);
  
  //sound interaction

  let volM = mic.getLevel();
  let total = random(5,10)* 100*volM;
  let nBuildings = total;
  //constant rotation
    rotateZ(frameCount * 0.01);

  
  //mouse interaction
  orbitControl();
  rotateZ(0.5);


  //lights
  directionalLight(255, 0, 255,1,0,0);
  //directionalLight(0, 255, 0, -1, 0, 0);
  //directionalLight(0, 0, 255, -1, 0, 0);
  //directionalLight(255, 255, 0, 0, 1, 0);
  directionalLight(0, 255, 255, 0, 0, 1);
  directionalLight(30, 0, 180, 0, 0, -1);
  
  //move your mouse to change light direction
  let dirX = (mouseX / width - 0.5) * 2;
  let dirY = (mouseY / height - 0.5) * 2;
  directionalLight(250, 250, 0, -dirX, -dirY, -1);
  

  //rotateX(HALF_PI);
  //fill(0.2);
  //plane(1000, 1000); // draw ground
  //fill(0.5);
  
  //appearance of buildings
  noStroke();
  specularMaterial(255);
  shininess(20);
  
  //number of buildings
  

  translate(-CITY_SIZE / 2, -CITY_SIZE / 2);
  for (let i = 0; i < nBuildings; i++) {
    let foundEmptySpot = false;
    let x = 0,
        y = 0;

    // loop until it finds an empty spot
    while (foundEmptySpot == false) {
      x = floor(random(0, gridSz));
      y = floor(random(0, gridSz));
      if (map[x][y] == false) {
        foundEmptySpot = true;
        map[x][y] = true;
      }
    }
    // randomly determine building dimensions
    let w = random(10, BUILDING_MAX_SIZE);
    let h = random(10, BUILDING_MAX_SIZE);
    let d = random(10, 200); // building height
    // render a building
    push();
    let z = random(-windowHeight,windowHeight);
    translate(x * BUILDING_MAX_SIZE, y * BUILDING_MAX_SIZE, d);
    box(w, h, d);
    pop();
  }

  resetMap();
}