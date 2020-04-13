game.createRoad = function(x, y, width, height, imgSrc) {
  // ----------------------------------- Initialize ---------------------------------------
  const ROWS = 5;
  let road = {};

  // if(imgSrc) road = loadImage(imSrc);
  road.width = width;
  road.height = height;
  road.pos = {
    x,
    y,
    center: {
      x: x + road.width / 2,
      y: y + road.height / 2,
    }
  }
  road.rows = [];
  road.safe = true;
  let mainOffset = 2;
  road.offsets = {
    speed: 80 / mainOffset,
    width: 75,
    freq: 1700 * mainOffset,
    time: 1696,
  };

  // ------------------------------- Initialize From Level --------------------------------
  if(game.level === 1) {
    let staticSafeArr= [{bool: false, img: null, duration: 10000}];
    // Row 0
    road.rows.push(
      game.createObstacleRow(
        road.pos.x,  // x
        road.pos.y + 0 * (road.height / ROWS),  // y
        road.width,  // width
        road.height / ROWS,  // height
        -2 * road.offsets.speed,  // speedInPixelsPerSecond
        true,  // safe
        [staticSafeArr],  // obstacleSafeArr
        [2 * road.offsets.width], // obstacleWidthArr
        [2 * road.offsets.freq, 5 * road.offsets.freq],   // freqArr
        0 * road.offsets.time
        // [row0car]  // obstacleImgSrcArr
      )
    );

    // Row 1
    road.rows.push(
      game.createObstacleRow(
        road.pos.x,  // x
        road.pos.y + 1 * (road.height / ROWS),  // y
        road.width,  // width
        road.height / ROWS,  // height
        1.75 * road.offsets.speed,  // speedInPixelsPerSecond
        true,  // safe
        [staticSafeArr],  // obstacleSafeArr
        [1 * road.offsets.width], // obstacleWidthArr
        [6 * road.offsets.freq],   // freqArr
        1 * road.offsets.time
        // [row0car]  // obstacleImgSrcArr
      )
    );

    // Row 2
    road.rows.push(
      game.createObstacleRow(
        road.pos.x,  // x
        road.pos.y + 2 * (road.height / ROWS),  // y
        road.width,  // width
        road.height / ROWS,  // height
        -1.6 * road.offsets.speed,  // speedInPixelsPerSecond
        true,  // safe
        [staticSafeArr],  // obstacleSafeArr
        [.75 * road.offsets.width], // obstacleWidthArr
        [4 * road.offsets.freq, 1 * road.offsets.freq, 1 * road.offsets.freq],   // freqArr
        2 * road.offsets.time
        // [row0car]  // obstacleImgSrcArr
      )
    );

    // Row 3
    road.rows.push(
      game.createObstacleRow(
        road.pos.x,  // x
        road.pos.y + 3 * (road.height / ROWS),  // y
        road.width,  // width
        road.height / ROWS,  // height
        1.6 * road.offsets.speed,  // speedInPixelsPerSecond
        true,  // safe
        [staticSafeArr],  // obstacleSafeArr
        [.75 * road.offsets.width], // obstacleWidthArr
        [3.5 * road.offsets.freq, 1 * road.offsets.freq, 1 * road.offsets.freq],   // freqArr
        3 * road.offsets.time
        // [row0car]  // obstacleImgSrcArr
      )
    );

    // Row 4
    road.rows.push(
      game.createObstacleRow(
        road.pos.x,  // x
        road.pos.y + 4 * (road.height / ROWS),  // y
        road.width,  // width
        road.height / ROWS,  // height
        -1.7 * road.offsets.speed,  // speedInPixelsPerSecond
        true,  // safe
        [staticSafeArr],  // obstacleSafeArr
        [.75 * road.offsets.width], // obstacleWidthArr
        [3 * road.offsets.freq, 1 * road.offsets.freq, 1 * road.offsets.freq],   // freqArr
        4 * road.offsets.time
        // [row0car]  // obstacleImgSrcArr
      )
    );
  } 
  else { console.log(`Level ${game.level} is not created.`)}


  // ---------------------------------- Main Functions ------------------------------------
  function update(elapsedTime) { 
    updateRows_(elapsedTime);
  }

  function render() { 
    drawHitbox_(game.context);
    renderRows_();
  }


  // -------------------------------- Getters and Setters----------------------------------
  function getCollisionType(hitCircle) {
    let row = parseInt((hitCircle.center.y - road.pos.y) / (road.height / road.rows.length));

    if(row >= 0 && row <= road.rows.length) {
      if(row > 0) {
        let collision = road.rows[row - 1].getCollisionType(hitCircle);
        if(collision.type !== 1)
          return collision;
      }

      if(row < road.rows.length) {
        let collision = road.rows[row].getCollisionType(hitCircle);
        if(collision.type !== 1)
          return collision;
      }

      if(row + 1 < road.rows.length) {
        let collision = road.rows[row + 1].getCollisionType(hitCircle);
        if(collision.type !== 1)
          return collision;
      }
    }

    return ({ type: 1, deltaX: 0 });
  }


  // --------------------------------- Private Functions ----------------------------------
  let setPos_ = (x=road.pos.x, y=road.pos.y) => {
    road.pos = { x, y };
    updateCenter_();
  }

  let updateCenter_ = () => {
    obstacle.pos.center = {
      x: road.pos.x + road.width / 2, 
      y: road.pos.y + road.height / 2, 
    }; 
  }

  function updateRows_(elapsedTime) {
    for(let i = 0; i < road.rows.length; i++) {
      road.rows[i].update(elapsedTime);
    }
  }

  function renderRows_() {
    for(let i = 0; i < road.rows.length; i++) {
      road.rows[i].render();
    }
  }

  function drawHitbox_ (context) {
    let hitbox = getHitbox_();

    context.strokeStyle = road.safe ? 'black' : 'white';
    context.fillStyle = road.safe ? 'green' : 'red';
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
      road.pos,
      { x: road.pos.x + road.width, y: road.pos.y }, 
      { x: road.pos.x + road.width, y: road.pos.y + road.height },
      { x: road.pos.x, y: road.pos.y + road.height },
      road.pos
    ];
  }

  // -------------------------------------- Return ----------------------------------------
  return ({
    // Main Functions
    update,
    render,

    // Helper Functions
    getCollisionType,
    // Getters and Setters
  });
}