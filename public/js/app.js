let score = 0;

let ninjaman = {
  vertical: 1,
  horizontal: 5
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

function borderControl() {
  console.log(`COL: ${ninjaman.horizontal}/ROW: ${ninjaman.vertical}`);
  if (ninjaman.horizontal === 30) {
    ninjaman.horizontal = 29;
    drawNinjaMan();
  } else if (ninjaman.horizontal === 0) {
    ninjaman.horizontal = 29;
    drawNinjaMan();
  }
}

function timerInfo(duration, display) {
  let timeleft = 15;
  let timeBar = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(timeBar);
      alert(`GAME OVER. SCORE: ${score}`);
    }
    console.log(`seconds left: ${timeleft}`);
    
    document.getElementById("timeleft").innerHTML = `time left: ${timeleft} sec.`;
    timeleft -= 1;
  }, 1000);
}

function keyPressLogic() {
  document.onkeydown = function (event) {
    const leftMoveKey = event.keyCode === 37 || event.keyCode === 65;
    const rightMoveKey = event.keyCode === 39 || event.keyCode === 68;
    const downMoveKey = event.keyCode === 40 || event.keyCode === 83;
    const upMoveKey = event.keyCode === 38 || event.keyCode === 87;
    if (leftMoveKey) {
      if (world[ninjaman.vertical][ninjaman.horizontal - 1] !== 1) {
        ninjaman.horizontal--;
        borderControl();
      }
    } else if (rightMoveKey) {
      if (world[ninjaman.vertical][ninjaman.horizontal + 1] !== 1) {
        ninjaman.horizontal++;
        borderControl();
      }
    } else if (upMoveKey) {
      if (world[ninjaman.vertical - 1][ninjaman.horizontal] !== 1) {
        ninjaman.vertical--;
        borderControl();
      }
    } else if (downMoveKey) {
      if (world[ninjaman.vertical + 1][ninjaman.horizontal] !== 1) {
        ninjaman.vertical++;
        borderControl();
      }
    }
    scoreInfo();
    drawNinjaMan();
    drawWorld();
  };
}

let world = worldGenerator(20, 30);
timerInfo();
drawWorld();
drawNinjaMan();
keyPressLogic();
