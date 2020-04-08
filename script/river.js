game.createRiver = function(x, y, width, height, imgSrc) {
  // ----------------------------------- Initialize ---------------------------------------
  const ROWS = 5;
  let river = {};

  // if(imgSrc) river = loadImage(imSrc);
  river.width = width;
  river.height = height;
  river.pos = {
    x,
    y,
    center: {
      x: x + river.width / 2,
      y: y + river.height / 2,
    }
  }
  river.rows = [];
  river.safe = true;
  let mainOffset = 2;
  river.offsets = {
    speed: 80 / mainOffset,
    width: 200,
    freq: 1700 * mainOffset,
    time: 1696,
  };

  // ------------------------------- Initialize From Level --------------------------------
  if(game.level === 1) {
    // Row 0
    river.rows.push(
      game.createObstacleRow(
        river.pos.x,  // x
        river.pos.y + 0 * (river.height / ROWS),  // y
        river.width,  // width
        river.height / ROWS,  // height
        -2 * river.offsets.speed,  // speedInPixelsPerSecond
        true,  // safe
        [false],  // obstacleSafeArr
        [2 * river.offsets.width], // obstacleWidthArr
        [2 * river.offsets.freq, 5 * river.offsets.freq],   // freqArr
        0 * river.offsets.time
        // [row0car]  // obstacleImgSrcArr
      )
    );

    // Row 1
    river.rows.push(
      game.createObstacleRow(
        river.pos.x,  // x
        river.pos.y + 1 * (river.height / ROWS),  // y
        river.width,  // width
        river.height / ROWS,  // height
        1.75 * river.offsets.speed,  // speedInPixelsPerSecond
        true,  // safe
        [false],  // obstacleSafeArr
        [1 * river.offsets.width], // obstacleWidthArr
        [6 * river.offsets.freq],   // freqArr
        1 * river.offsets.time
        // [row0car]  // obstacleImgSrcArr
      )
    );

    // Row 2
    river.rows.push(
      game.createObstacleRow(
        river.pos.x,  // x
        river.pos.y + 2 * (river.height / ROWS),  // y
        river.width,  // width
        river.height / ROWS,  // height
        -1.6 * river.offsets.speed,  // speedInPixelsPerSecond
        true,  // safe
        [false],  // obstacleSafeArr
        [.75 * river.offsets.width], // obstacleWidthArr
        [4 * river.offsets.freq, 1 * river.offsets.freq, 1 * river.offsets.freq],   // freqArr
        2 * river.offsets.time
        // [row0car]  // obstacleImgSrcArr
      )
    );

    // Row 3
    river.rows.push(
      game.createObstacleRow(
        river.pos.x,  // x
        river.pos.y + 3 * (river.height / ROWS),  // y
        river.width,  // width
        river.height / ROWS,  // height
        1.6 * river.offsets.speed,  // speedInPixelsPerSecond
        true,  // safe
        [false],  // obstacleSafeArr
        [.75 * river.offsets.width], // obstacleWidthArr
        [3.5 * river.offsets.freq, 1 * river.offsets.freq, 1 * river.offsets.freq],   // freqArr
        3 * river.offsets.time
        // [row0car]  // obstacleImgSrcArr
      )
    );

    // Row 4
    river.rows.push(
      game.createObstacleRow(
        river.pos.x,  // x
        river.pos.y + 4 * (river.height / ROWS),  // y
        river.width,  // width
        river.height / ROWS,  // height
        -1.7 * river.offsets.speed,  // speedInPixelsPerSecond
        true,  // safe
        [false],  // obstacleSafeArr
        [.75 * river.offsets.width], // obstacleWidthArr
        [3 * river.offsets.freq, 1 * river.offsets.freq, 1 * river.offsets.freq],   // freqArr
        4 * river.offsets.time
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


  // --------------------------------- Private Functions ----------------------------------
  let setPos_ = (x=river.pos.x, y=river.pos.y) => {
    river.pos = { x, y };
    updateCenter_();
  }

  let updateCenter_ = () => {
    obstacle.pos.center = {
      x: river.pos.x + river.width / 2, 
      y: river.pos.y + river.height / 2, 
    }; 
  }

  function updateRows_(elapsedTime) {
    for(let i = 0; i < river.rows.length; i++) {
      river.rows[i].update(elapsedTime);
    }
  }

  function renderRows_() {
    for(let i = 0; i < river.rows.length; i++) {
      river.rows[i].render();
    }
  }

  function drawHitbox_ (context) {
    let hitbox = getHitbox_();

    context.strokeStyle = river.safe ? 'black' : 'white';
    context.fillStyle = river.safe ? 'green' : 'red';
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
      river.pos,
      { x: river.pos.x + river.width, y: river.pos.y }, 
      { x: river.pos.x + river.width, y: river.pos.y + river.height },
      { x: river.pos.x, y: river.pos.y + river.height },
      river.pos
    ];
  }

  // -------------------------------------- Return ----------------------------------------
  return ({
    // Main Functions
    update,
    render,

    // Helper Functions
    // Getters and Setters
  });
}