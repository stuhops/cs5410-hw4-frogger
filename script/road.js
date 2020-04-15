game.createRoad = function(x, y, width, height) {
  // ----------------------------------- Initialize ---------------------------------------
  const ROWS = 5;
  let road = {};

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
  road.audio = {
    squash: new Audio(game.audio.squash),
  }

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
        [3 * road.offsets.width], // obstacleWidthArr
        [2 * road.offsets.freq, 5 * road.offsets.freq],   // freqArr
        0 * road.offsets.time,
        ['carSemi']  // obstacleImgSrcArr
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
        [2 * road.offsets.width], // obstacleWidthArr
        [6 * road.offsets.freq],   // freqArr
        1 * road.offsets.time,
        ['carFire']  // obstacleImgSrcArr
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
        [2 * road.offsets.width], // obstacleWidthArr
        [4 * road.offsets.freq, 2 * road.offsets.freq, 2 * road.offsets.freq],   // freqArr
        2 * road.offsets.time,
        ['carBlue']  // obstacleImgSrcArr
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
        [2 * road.offsets.width], // obstacleWidthArr
        [3.5 * road.offsets.freq, 1.7 * road.offsets.freq, 1.7 * road.offsets.freq],   // freqArr
        3 * road.offsets.time,
        ['carGreen']  // obstacleImgSrcArr
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
        [2 * road.offsets.width], // obstacleWidthArr
        [3 * road.offsets.freq, 1.8 * road.offsets.freq, 1.8 * road.offsets.freq],   // freqArr
        4 * road.offsets.time,
        ['carYellow']  // obstacleImgSrcArr
      )
    );
  } 

  else if(game.level === 2) {
    let staticSafeArr= [{bool: false, img: null, duration: 10000}];
    // Row 0
    road.rows.push(
      game.createObstacleRow(
        road.pos.x,  // x
        road.pos.y + 0 * (road.height / ROWS),  // y
        road.width,  // width
        road.height / ROWS,  // height
        -3 * road.offsets.speed,  // speedInPixelsPerSecond
        true,  // safe
        [staticSafeArr],  // obstacleSafeArr
        [2 * road.offsets.width], // obstacleWidthArr
        [1.5 * road.offsets.freq, 1 * road.offsets.freq, 1 * road.offsets.freq],   // freqArr
        0 * road.offsets.time,
        ['carSemi']  // obstacleImgSrcArr
      )
    );

    // Row 1
    road.rows.push(
      game.createObstacleRow(
        road.pos.x,  // x
        road.pos.y + 1 * (road.height / ROWS),  // y
        road.width,  // width
        road.height / ROWS,  // height
        8 * road.offsets.speed,  // speedInPixelsPerSecond
        true,  // safe
        [staticSafeArr],  // obstacleSafeArr
        [2.5 * road.offsets.width], // obstacleWidthArr
        [2 * road.offsets.freq, .3 * road.offsets.freq],   // freqArr
        1 * road.offsets.time,
        ['carFire']  // obstacleImgSrcArr
      )
    );

    // Row 2
    road.rows.push(
      game.createObstacleRow(
        road.pos.x,  // x
        road.pos.y + 2 * (road.height / ROWS),  // y
        road.width,  // width
        road.height / ROWS,  // height
        -4 * road.offsets.speed,  // speedInPixelsPerSecond
        true,  // safe
        [staticSafeArr],  // obstacleSafeArr
        [1.9 * road.offsets.width], // obstacleWidthArr
        [.75 * road.offsets.freq, .75 * road.offsets.freq, .5 * road.offsets.freq],   // freqArr
        2 * road.offsets.time,
        ['carBlue']  // obstacleImgSrcArr
      )
    );

    // Row 3
    road.rows.push(
      game.createObstacleRow(
        road.pos.x,  // x
        road.pos.y + 3 * (road.height / ROWS),  // y
        road.width,  // width
        road.height / ROWS,  // height
        3 * road.offsets.speed,  // speedInPixelsPerSecond
        true,  // safe
        [staticSafeArr],  // obstacleSafeArr
        [1.75 * road.offsets.width], // obstacleWidthArr
        [1 * road.offsets.freq],   // freqArr
        3 * road.offsets.time,
        ['carGreen']  // obstacleImgSrcArr
      )
    );

    // Row 4
    road.rows.push(
      game.createObstacleRow(
        road.pos.x,  // x
        road.pos.y + 4 * (road.height / ROWS),  // y
        road.width,  // width
        road.height / ROWS,  // height
        -3.5 * road.offsets.speed,  // speedInPixelsPerSecond
        true,  // safe
        [staticSafeArr],  // obstacleSafeArr
        [1.75 * road.offsets.width], // obstacleWidthArr
        [.4 * road.offsets.freq, .75 * road.offsets.freq, .75 * road.offsets.freq],   // freqArr
        4 * road.offsets.time,
        ['carYellow']  // obstacleImgSrcArr
      )
    );
  } 
  else { console.log(`Level ${game.level} is not created.`)}


  // ---------------------------------- Main Functions ------------------------------------
  function update(elapsedTime) { 
    updateRows_(elapsedTime);
    updateGuts_(elapsedTime);
  }

  function render() { 
    // drawHitbox_(game.context);
    drawRoadTexture_();
    renderGuts_();
    renderRows_();
  }


  // -------------------------------- Getters and Setters----------------------------------
  function getCollisionType(hitCircle) {
    let row = parseInt((hitCircle.center.y - road.pos.y) / (road.height / road.rows.length));

    if(row >= 0 && row <= road.rows.length) {
      if(row > 0) {
        let collision = road.rows[row - 1].getCollisionType(hitCircle);
        if(collision.type !== 1) {
          road.audio.squash.play();
          return collision;
        }
      }

      if(row < road.rows.length) {
        let collision = road.rows[row].getCollisionType(hitCircle);
        if(collision.type !== 1){
          road.audio.squash.play();
          return collision;
        }
      }

      if(row + 1 < road.rows.length) {
        let collision = road.rows[row + 1].getCollisionType(hitCircle);
        if(collision.type !== 1){
          road.audio.squash.play();
          return collision;
        }
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

  function updateGuts_(elapsedTime) {
    for(let i = 0; i < game.guts.length; i++) {
      game.guts[i].timer -= elapsedTime;
      game.guts[i].pauseTimer -= elapsedTime;

      if(game.guts[i].timer < 0) {
        game.guts.splice(i, 1);
        i--;
      }
      else if(game.guts[i].pauseTimer > 0) {
        game.guts[i].vis.update(elapsedTime);
      }
    }
  }

  function renderRows_() {
    for(let i = 0; i < road.rows.length; i++) {
      road.rows[i].render();
    }
  }

  function renderGuts_() {
    for(let i = 0; i < game.guts.length; i++) {
      game.guts[i].vis.render();
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

  function drawRoadTexture_() {
    for(let i = 0; i < ROWS; i++) {
      for(let j = 0; j < road.width / (road.height / ROWS); j++) {
        game.renderSprite(
          'road', 
          {
            x: road.pos.x + (road.height / ROWS)/2 + j * (road.height / ROWS),
            y: road.pos.y + (road.height / ROWS)/2 + i * (road.height / ROWS),
          },
          {
            width: road.height / ROWS,
            height: road.height / ROWS,
          },
          0,
          0
        );
      }
    }
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