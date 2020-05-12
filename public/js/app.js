let score = 0;
let ninjaman = {
  x: 1,
  y: 1,
};

const worldDict = {
  0: "blank",
  1: "wall",
  2: "sushi",

};

function drawNinjaMan() {
  document.getElementById("ninjaman").style.top = ninjaman.y * 40 + "px";
  document.getElementById("ninjaman").style.left = ninjaman.x * 40 + "px";
}

function worldGenerator(width, height){
  let world = [];
  for (let i = 0 ; i < width; i++) {
      world[i] = [];
      for (let j = 0; j < height; j++) {
        world[i][j] = Math.floor(Math.random()*3);
        world[i][1];
      }
  }
  return world;
}

function drawWorld() {
  let output = "";
  for (let row = 0; row < world.length; row++) {
    output += "<div class = 'row'>";
    for (let x = 0; x < world[row].length; x++) {
      output += "<div class = '" + worldDict[world[row][x]] + "'></div>";
    }
    output += "</div>";
  }
  document.getElementById("world").innerHTML = output;
}

function keyPressLogic() {

  document.onkeydown = function (event) {
    const leftMoveKey = event.keyCode === 37 || event.keyCode === 65;
    const rightMoveKey = event.keyCode === 39 || event.keyCode === 68;
    const downMoveKey = event.keyCode === 40 || event.keyCode === 83;
    const upMoveKey = event.keyCode === 38 || event.keyCode === 87;

    if (leftMoveKey) {
      if (world[ninjaman.y][ninjaman.x - 1] !== 1) {
        ninjaman.x --;
      }
    } else if (rightMoveKey) {
      if (world[ninjaman.y][ninjaman.x + 1] !== 1) {
        ninjaman.x ++;
      }
    } else if (upMoveKey) {
      if (world[ninjaman.y - 1][ninjaman.x] !== 1) {
        ninjaman.y --;
      }
    } else if (downMoveKey) {
      if (world[ninjaman.y +1][ninjaman.x] !== 1) {
        ninjaman.y ++;
      } 
    } 
    
    world[ninjaman.y][ninjaman.x] = 0;
    
    drawNinjaMan();
    drawWorld();
  };
}

let world = worldGenerator(13, 13);
drawWorld();
drawNinjaMan();
keyPressLogic();

