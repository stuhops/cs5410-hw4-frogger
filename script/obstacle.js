// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Obstacle >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
game.createObstacle = function(width, height, x, y, speedInPixelsPerSecond, safeArr, imgSrc) {
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
  obstacle.safe = safeArr[0].bool;
  if(!safeArr[0]) {
    console.log('ERROR');
  }
  obstacle.safe = {
    arr: safeArr,
    bool: safeArr[0].bool,
    iter: 0,
    timer: safeArr[0].duration,
  };


  // ---------------------------------- Main Functions ------------------------------------
  function update(elapsedTime) { 
    offsetPos_(obstacle.speed * elapsedTime * .001);
    updateState_(elapsedTime);
  }

  function render() { 
    drawHitbox_(game.context);
  }


  // -------------------------------- Getters and Setters----------------------------------
  let isSafe = () => obstacle.safe.bool;
  let getHitbox = () => [
    { x: obstacle.pos.x, y: obstacle.pos.y + obstacle.height / 8}, 
    { x: obstacle.pos.x + obstacle.width, y: obstacle.pos.y + obstacle.height / 8}, 
    { x: obstacle.pos.x + obstacle.width, y: obstacle.pos.y + obstacle.height - obstacle.height / 8},
    { x: obstacle.pos.x, y: obstacle.pos.y + obstacle.height - obstacle.height / 8},
    { x: obstacle.pos.x, y: obstacle.pos.y + obstacle.height / 8}, 
  ];
  let getCenter = () => { 
    updateCenter_();
    return obstacle.pos.center;
  }
  let getDeltaX = () => obstacle.speed * .001;

  let setSafe = safe => obstacle.safe.bool = safe;


  // --------------------------------- Private Functions ----------------------------------
  let drawHitbox_ = context => {
    let hitbox = getHitbox();

    context.strokeStyle = obstacle.safe.bool ? 'black' : 'white';
    context.fillStyle = obstacle.safe.bool ? 'green' : 'red';
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

  function updateState_(elapsedTime) {
    obstacle.safe.timer -= elapsedTime;
    if(obstacle.safe.timer < 0) {
      obstacle.safe.iter = (obstacle.safe.iter + 1) % obstacle.safe.arr.length;

      obstacle.safe.bool = obstacle.safe.arr[obstacle.safe.iter].bool;
      // obstacle.img = obstacle.safe.arr[obstacle.safe.iter].img
      obstacle.safe.timer += obstacle.safe.arr[obstacle.safe.iter].duration;
    }
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
    getDeltaX,

    setSafe,
  });
}


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Obstacle Row >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

game.createObstacleRow = function(x, y, width, height, speedInPixelsPerSecond, safe, obstacleSafeArr, obstacleWidthArr, freqArr, timeOffset=0, fillImgSrc, obstacleImgSrcArr) {
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
    timer: timeOffset,
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
  function getCollisionType(hitCircle) {
    for(let i = 0; i < row.obstacles.length; i++) {
      let obst = row.obstacles[i];
      let hitbox = obst.getHitbox();

      for(let j = 0; j < hitbox.length - 1; j++) {
        if(game.collision.lineCircleIntersection(hitbox[j], hitbox[j+1], hitCircle)) {
          if(obst.isSafe()) {
            return ({ type: 2, deltaX: obst.getDeltaX() });
          }
          else {
            return ({ type: 0, deltaX: 0 });
          }
        }
      }

    }
    // If no collision return the safeness of the row
    if(row.safe)
      return({ type: 1, deltaX: 0 });
    else
      return({ type: 0, deltaX: 0 });
  }


  // --------------------------------- Private Functions ----------------------------------
  let updateCenter_ = () => {
    obstacle.pos.center = {
      x: obstacle.pos.x + obstacle.width / 2, 
      y: obstacle.pos.y + obstacle.height / 2, 
    }; 
  }

  // safeStateArr = [ {safe, img, duration} ]
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
          break;
        }
      }
    }
  }

  // safeStateArr = [ {safe, img, duration} ]
  function generateNewObstacles_(elapsedTime) {
    row.frequency.timer -= elapsedTime;
    if(row.frequency.timer < 0) {
      // Generate new obstacle
      if(row.obstacleSafe.arr[row.obstacleSafe.iterator][0].alligator) {
        let newObstacle = game.createObstacle(
          row.obstacleWidth.arr[row.obstacleWidth.iterator],  // width
          row.height,  // height
          row.posDir ? row.pos.x - row.obstacleWidth.arr[row.obstacleWidth.iterator] : row.width,  // x
          row.pos.y,  // y
          row.speed,  // speedInPixelsPerSecond
          row.obstacleSafe.arr[row.obstacleSafe.iterator][0].bodySafe,  // safe
          // row.obstacleImgSrc.arr[row.obstacleImgSrc.iterator]  // imgSrc
        );
        let newHead = game.createObstacle(
          row.obstacleWidth.arr[row.obstacleWidth.iterator] / 4,  // width
          row.height,  // height
          row.posDir ? row.pos.x - row.obstacleWidth.arr[row.obstacleWidth.iterator] / 4 : row.width,  // x
          row.pos.y,  // y
          row.speed,  // speedInPixelsPerSecond
          row.obstacleSafe.arr[row.obstacleSafe.iterator],  // safe
          // row.obstacleImgSrc.arr[row.obstacleImgSrc.iterator]  // imgSrc
        );
        
        row.obstacles.push(newObstacle);
        row.obstacles.push(newHead);
      }
      else {
        let newObstacle = game.createObstacle(
          row.obstacleWidth.arr[row.obstacleWidth.iterator],  // width
          row.height,  // height
          row.posDir ? row.pos.x - row.obstacleWidth.arr[row.obstacleWidth.iterator] : row.width,  // x
          row.pos.y,  // y
          row.speed,  // speedInPixelsPerSecond
          row.obstacleSafe.arr[row.obstacleSafe.iterator],  // safe
          // row.obstacleImgSrc.arr[row.obstacleImgSrc.iterator]  // imgSrc
        );
        row.obstacles.push(newObstacle);
      }


      // Restart timer
      row.obstacleSafe.iterator = (row.obstacleSafe.iterator + 1) % row.obstacleSafe.arr.length;
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

    getCollisionType,
  });
}
