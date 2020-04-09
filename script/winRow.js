// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Win Row >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

game.createWinRow = function(x, y, width, height, fillImgSrc, obstacleImgSrcArr) {
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
  row.safe = false;
  row.width = width;
  row.height = height;
  row.speed = 0;
  row.posDir = true;
  row.obstacleSafe = {
    arr: [true],
    iterator: 0,
  };
  row.obstacleWidth = {
    arr: [100],
    iterator: 0,
  }
  // row.obstacleImgSrc = {
  //   arr: obstacleImgSrcArr,
  //   iterator: 0,
  // };
  row.frequency = {
    arr: [0],
    iterator: 0,
  };
  row.slot = {
    width: row.width / 11,
    height: row.height * 3/4,
    spacingOffset: row.width / 22,
    spacing: row.width / 22 * 4.5,
  }
  row.obstacles = [];
  generateNewObstacles_();



  // ---------------------------------- Main Functions ------------------------------------
  function update(elapsedTime) {
    updateObstacles_(elapsedTime);
  }

  function render() {
    drawHitbox_(game.context);
    for(let i = 0; i < row.obstacles.length; i++) {
      row.obstacles[i].render();
    }
  }


  // -------------------------------- Getters and Setters----------------------------------
  function getCollisionType(hitCircle) {
    if(hitCircle.center.y < row.height) {
      for(let i = 0; i < row.obstacles.length; i++) {
        let obst = row.obstacles[i];
        let hitbox = obst.getHitbox();

        for(let j = 0; j < hitbox.length - 1; j++) {
          if(game.collision.lineCircleIntersection(hitbox[j], hitbox[j+1], hitCircle)) {
            return ({ type: 3, deltaX: 0 });
          }
        }
      }
      return({ type: 0, deltaX: 0 });
    }
    return({ type: 1, deltaX: 0 })
  }


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

  function generateNewObstacles_() {
    for(let i = 0; i < 5; i++) {
      // Generate new obstacle
      let newObstacle = game.createObstacle(
        row.slot.width,  // width
        row.slot.height,  // height
        row.slot.spacingOffset + row.slot.spacing * i,  // x
        row.pos.y + height - row.slot.height,  // y
        0,  // speedInPixelsPerSecond
        true,  // safe
        // row.obstacleImgSrc.arr[row.obstacleImgSrc.iterator]  // imgSrc
      );
      row.obstacles.push(newObstacle);

      // Restart timer
      row.obstacleSafe.iterator = (row.obstacleSafe.iterator + 1) % row.obstacleSafe.arr.length;
      row.obstacleWidth.iterator = (row.obstacleWidth.iterator + 1) % row.obstacleWidth.arr.length;
      // row.obstacleImgSrc.iterator = (row.obstacleImgSrc.iterator + 1) % row.obstacleImgSrc.arr.length;
      row.frequency.iterator = (row.frequency.iterator + 1) % row.frequency.arr.length;

      row.frequency.timer += row.frequency.arr[row.frequency.iterator];
    }
  }

  function drawHitbox_ (context) {
    let hitbox = getHitbox_();

    context.strokeStyle = row.safe ? 'black' : 'white';
    context.fillStyle = row.safe ? 'green' : 'red';
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

  function getHitbox_() {
    return [
      row.pos,
      { x: row.pos.x + row.width, y: row.pos.y }, 
      { x: row.pos.x + row.width, y: row.pos.y + row.height },
      { x: row.pos.x, y: row.pos.y + row.height },
      row.pos
    ];
  }

  // -------------------------------------- Return ----------------------------------------
  return ({
    update,
    render,

    getCollisionType,
  });
}