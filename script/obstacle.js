// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Obstacle >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
game.createObstacle = function(width, height, x, y, speedInPixelsPerSecond, safe=true, imgSrc) {
  let obstacle = {};

  // if(imgSrc) obstacle = loadImage(imSrc);

  obstacle.width = width;
  obstacle.height = height;
  obstacle.pos = { 
    x, 
    y,
    center: {
      x: x + obstacle.width / 2, 
      y: y + obstacle.height / 2, 
    }
  };
  obstacle.speed = speedInPixelsPerSecond;
  obstacle.safe = safe;


  // ---------------------------------- Main Functions ------------------------------------
  function update(elapsedTime) { 
    offsetPos_(obstacle.speed * elapsedTime * .001);
  }

  function render() { 
    drawHitbox_(game.context);
  }


  // -------------------------------- Getters and Setters----------------------------------
  let isSafe = () => obstacle.safe;
  let getHitbox = () => [
    obstacle.pos,
    { x: obstacle.pos.x + obstacle.width, y: obstacle.pos.y }, 
    { x: obstacle.pos.x + obstacle.width, y: obstacle.pos.y + obstacle.height },
    { x: obstacle.pos.x, y: obstacle.pos.y + obstacle.height },
    obstacle.pos
  ];
  let getCenter = () => { 
    updateCenter_();
    return obstacle.pos.center;
  }

  let setSafe = safe => obstacle.safe = safe;


  // --------------------------------- Private Functions ----------------------------------
  let drawHitbox_ = context => {
    let hitbox = getHitbox();

    context.strokeStyle = 'white';
    context.fillStyle = 'black';
    context.lineWidth = 6;
    context.beginPath();
    context.moveTo(hitbox[0].x, hitbox[0].y);

    for(let i = 1; i < hitbox.length; i++) {
      context.lineTo(hitbox[i].x, hitbox[i].y);
    }

    context.closePath();
    context.stroke();
    context.fill();
  }

  let setPos_ = (x=obstacle.pos.x, y=obstacle.pos.y) => {
    obstacle.pos = { x, y };
    updateCenter_();
  }

  let offsetPos_ = (xDif=0, yDif=0) => {
    obstacle.pos = { x: obstacle.pos.x + xDif, y: obstacle.pos.y + yDif };
    updateCenter_();
  }

  let updateCenter_ = () => {
    obstacle.pos.center = {
      x: obstacle.pos.x + obstacle.width / 2, 
      y: obstacle.pos.y + obstacle.height / 2, 
    }; 
  }


  // -------------------------------------- Return ----------------------------------------
  return ({
    // Main Functions
    update,
    render,

    // Helper Functions
    // Getters and Setters
    isSafe,
    getHitbox,
    getCenter,

    setSafe,
  });
}


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Obstacle Row >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

game.createObstacleRow = function(x, y, width, height, speedInPixelsPerSecond, safe, obstacleSafeArr, obstacleWidthArr, freqArr, fillImgSrc, obstacleImgSrcArr) {
  let row = {};
  // if(imgSrc) row = loadImage(fillImgSrc);

  row.pos = {
    x,
    y,
    center: {
      x: game.gameWidth / 2,
      y: y + height / 2,
    },
  }
  row.safe = safe;
  row.height = height;
  row.width = width;
  row.speed = speedInPixelsPerSecond;
  row.posDir = row.speed > 0 ? true : false;
  row.obstacleSafe = {
    arr: obstacleSafeArr,
    iterator: 0,
  };
  row.obstacleWidth = {
    arr: obstacleWidthArr,
    iterator: 0,
  }
  // row.obstacleImgSrc = {
  //   arr: obstacleImgSrcArr,
  //   iterator: 0,
  // };
  row.frequency = {
    arr: freqArr,
    iterator: 0,
    timer: 0,
  };
  row.obstacles = [];



  // ---------------------------------- Main Functions ------------------------------------
  function update(elapsedTime) {
    updateObstacles_(elapsedTime);
    generateNewObstacles_(elapsedTime);
  }

  function render() {
    for(let i = 0; i < row.obstacles.length; i++) {
      row.obstacles[i].render();
    }

  }


  // -------------------------------- Getters and Setters----------------------------------


  // --------------------------------- Private Functions ----------------------------------
  let updateCenter_ = () => {
    obstacle.pos.center = {
      x: obstacle.pos.x + obstacle.width / 2, 
      y: obstacle.pos.y + obstacle.height / 2, 
    }; 
  }

  function updateObstacles_(elapsedTime) {
    for(let i = 0; i < row.obstacles.length; i++) {
      row.obstacles[i].update(elapsedTime);
      hitbox = row.obstacles[i].getHitbox();
      for(let j = 0; j < hitbox.length; j++) {
        if(!(hitbox[j].x < 0 || hitbox[j].x > row.width))
          break;
        else if(j === hitbox.length - 1) {
          // TODO: Make sure that this doesn't throw an error
          row.obstacles.splice(i, 1);
          i--;
        }
      }
    }
  }

  function generateNewObstacles_(elapsedTime) {
    row.frequency.timer -= elapsedTime;
    if(row.frequency.timer < 0) {
      // Generate new obstacle
      let newObstacle = game.createObstacle(
        row.obstacleWidth.arr[row.obstacleWidth.iterator], 
        row.height,
        row.posDir ? row.pos.x - row.obstacleWidth.arr[row.obstacleWidth.iterator] : row.width, 
        row.pos.y, 
        row.speed,
        row.obstacleSafe.arr[row.obstacleSafe.arr.iterator],
        // row.obstacleImgSrc.arr[row.obstacleImgSrc.iterator]
      );
      row.obstacles.push(newObstacle);

      // Restart timer
      row.obstacleSafe.iterator = (row.safe.iterator + 1) % row.obstacleSafe.arr.length;
      row.obstacleWidth.iterator = (row.obstacleWidth.iterator + 1) % row.obstacleWidth.arr.length;
      // row.obstacleImgSrc.iterator = (row.obstacleImgSrc.iterator + 1) % row.obstacleImgSrc.arr.length;
      row.frequency.iterator = (row.frequency.iterator + 1) % row.frequency.arr.length;

      row.frequency.timer += row.frequency.arr[row.frequency.iterator];
    }
  }


  // -------------------------------------- Return ----------------------------------------
  return ({
    update,
    render,

  });
}