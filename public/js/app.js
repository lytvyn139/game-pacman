let score = 0;
let ninjaman = {
  horizontal: 10,
  vertical: 10
};

const worldDict = {
  0: "blank",
  1: "wall",
  2: "sushi",
  3: "onigiri",
};

function drawNinjaMan() {
  document.getElementById("ninjaman").style.top = ninjaman.vertical * 40 + "px";
  document.getElementById("ninjaman").style.left = ninjaman.horizontal * 40 + "px";
}

function worldGenerator(width, height) {
  let world = [];
  for (let i = 0; i < width; i++) {
    world[i] = [];
    for (let j = 0; j < height; j++) {
      world[i][j] = Math.floor(Math.random() * 4);
      world[i].push("1");
    }
  }
  return world;
}

function drawWorld() {
  let output = "";
  for (let row = 0; row < world.length; row++) {
    output += "<div class = 'row'>";
    for (let horizontal = 0; horizontal < world[row].length; horizontal++) {
      output += "<div class = '" + worldDict[world[row][horizontal]] + "'></div>";
    }
    output += "</div>";
  }
  document.getElementById("world").innerHTML = output;
}

function scoreInfo() {
  if (world[ninjaman.vertical][ninjaman.horizontal] === 2) {
    score++;
  } else if (world[ninjaman.vertical][ninjaman.horizontal] === 3) {
    score += 5;
  }
  world[ninjaman.vertical][ninjaman.horizontal] = 0;
  document.getElementById("score-result").innerHTML = `score: ${score}`;
  world[ninjaman.vertical][ninjaman.horizontal] = 0;
}

function keyPressLogic() {
  document.onkeydown = function (event) {
    const leftMoveKey = event.keyCode === 37 || event.keyCode === 65;
    const rightMoveKey = event.keyCode === 39 || event.keyCode === 68;
    const downMoveKey = event.keyCode === 40 || event.keyCode === 83;
    const upMoveKey = event.keyCode === 38 || event.keyCode === 87;


    if (leftMoveKey) {
      if (world[ninjaman.vertical][ninjaman.horizontal - 1] !== 1) { 
        ninjaman.horizontal --;
      }
    } else if (rightMoveKey) {
      if (world[ninjaman.vertical][ninjaman.horizontal + 1] !== 1) {
        ninjaman.horizontal ++;
      }
    } else if (upMoveKey) {
      if (world[ninjaman.vertical - 1][ninjaman.horizontal] !== 1) {
        ninjaman.vertical --;
      }
    } else if (downMoveKey) {
      if (world[ninjaman.vertical +1][ninjaman.horizontal] !== 1) {
        ninjaman.vertical ++;
      } 
    } 
    scoreInfo();
    drawNinjaMan();
    drawWorld();
  };
}

let world = worldGenerator(20, 20);
drawWorld();
drawNinjaMan();
keyPressLogic();
