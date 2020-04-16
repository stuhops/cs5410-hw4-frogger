// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Obstacle >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
game.createObstacle = function(width, height, x, y, speedInPixelsPerSecond, safeArr, imgName=null) {
  let obstacle = {};

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
  obstacle.angle = obstacle.speed >= 0 ? 0 : Math.PI;
  obstacle.img = {
    name: imgName,
    num: 0,
    baseTimer: 200,
    timer: 200,
    length: game.renderSprite(imgName),
  }
  obstacle.safe = safeArr[0].bool;
  if(!safeArr[0]) {
    console.log('ERROR');
  }
  obstacle.safe = {
    arr: safeArr,
    override: false,
    bool: safeArr[0].bool,
    iter: 0,
    timer: safeArr[0].duration,
  };


  // ---------------------------------- Main Functions ------------------------------------
  function update(elapsedTime) { 
    offsetPos_(obstacle.speed * elapsedTime * .001);
    updateState_(elapsedTime);
    updateImage_(elapsedTime);
  }

  function render() { 
    // drawHitbox_(game.context);
    if(obstacle.img.name === 'alligatorBody') {
      game.renderSprite(
        obstacle.img.name, 
        obstacle.pos.center, 
        {width: obstacle.width * 3/4, height: obstacle.height*9 / 10}, 
        obstacle.angle, 
        obstacle.img.num
      );
    }
    else {
      game.renderSprite(
        obstacle.img.name, 
        obstacle.pos.center, 
        {width: obstacle.width, height: obstacle.height*9 / 10}, 
        obstacle.angle, 
        obstacle.img.num
      );
    }
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
  let getDimensions = () => {
    return({
      width: obstacle.width, 
      height: obstacle.height
    });
  };

  let setSafe = safe => {
    obstacle.safe.bool = safe;
    obstacle.safe.override = true;
  }

  let setImg = newImg => {
    obstacle.img.name = newImg;
    obstacle.img.num = game.renderSprite(newImg);
  }


  // --------------------------------- Private Functions ----------------------------------
  function renderImg_(context) {
    renderImage(obstacle.img, context)
  }

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

    if(obstacle.img) 
      obstacle.img.center = obstacle.pos.center;
  }

  function updateState_(elapsedTime) {
    obstacle.safe.timer -= elapsedTime;
    if(obstacle.safe.timer < 0) {
      obstacle.safe.iter = (obstacle.safe.iter + 1) % obstacle.safe.arr.length;

      obstacle.safe.timer += obstacle.safe.arr[obstacle.safe.iter].duration;
      if(!obstacle.safe.override)
        obstacle.safe.bool = obstacle.safe.arr[obstacle.safe.iter].bool;
    }
  }

  function updateImage_(elapsedTime) {
    obstacle.img.timer -= elapsedTime;
    if(obstacle.img.timer < 0) {
      obstacle.img.num = (obstacle.img.num + 1) % obstacle.img.length;

      obstacle.img.timer += obstacle.img.baseTimer;
    }

    let re = /turtle.*/;
    if(re.test(obstacle.img.name)) {
      if(obstacle.safe.iter === 0) {
        obstacle.img.name = 'turtle';
      }
      else if(obstacle.safe.iter === 1) {
        obstacle.img.name = 'turtleSinking';
        obstacle.img.num = 2 - parseInt(
          4 * (obstacle.safe.timer / obstacle.safe.arr[obstacle.safe.iter].duration)
        );
      }
      else if(obstacle.safe.iter === 2) {
        obstacle.img.name = 'turtleSunk';
      }
      else if(obstacle.safe.iter === 3) {
        obstacle.img.name = 'turtleEmerging';
        obstacle.img.num = 3 - parseInt(
          4 * (obstacle.safe.timer / obstacle.safe.arr[obstacle.safe.iter].duration)
        );
      }
    }

    re = /alligatorHead.*/;
    if(re.test(obstacle.img.name)) {
      if(obstacle.safe.iter === 0) {
        obstacle.img.name = 'alligatorHeadClosed';
      }
      else if(obstacle.safe.iter === 1) {
        obstacle.img.name = 'alligatorHeadOpen';
      }
      else console.log('ERROR WHEN OPENING AND CLOSING ALLIGATOR MOUTH');
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
    getDimensions,


    setSafe,
    setImg,
  });
}


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Obstacle Row >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

game.createObstacleRow = function(
  x, 
  y, 
  width, 
  height, 
  speedInPixelsPerSecond, 
  safe, 
  obstacleSafeArr, 
  obstacleWidthArr, 
  freqArr, 
  timeOffset=0, 
  obstacleImgArr=[null]
){

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
  row.obstacleImg = {
    arr: obstacleImgArr,
    iterator: 0,
  };
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
          'alligatorBody'  // imgSrc
        );
        let newHead = game.createObstacle(
          row.obstacleWidth.arr[row.obstacleWidth.iterator] / 4,  // width
          row.height,  // height
          row.posDir ? row.pos.x - row.obstacleWidth.arr[row.obstacleWidth.iterator] / 4 : row.width,  // x
          row.pos.y,  // y
          row.speed,  // speedInPixelsPerSecond
          row.obstacleSafe.arr[row.obstacleSafe.iterator],  // safe
          'alligatorHead' // imgSrc
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
          row.obstacleImg.arr[row.obstacleImg.iterator]  // imgSrc
        );
        row.obstacles.push(newObstacle);
      }


      // Restart timer
      row.obstacleSafe.iterator = (row.obstacleSafe.iterator + 1) % row.obstacleSafe.arr.length;
      row.obstacleWidth.iterator = (row.obstacleWidth.iterator + 1) % row.obstacleWidth.arr.length;
      row.obstacleImg.iterator = (row.obstacleImg.iterator + 1) % row.obstacleImg.arr.length;
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
