game.createLand = function(x, y, width, height, imgSrc) {
  // ----------------------------------- Initialize ---------------------------------------
  const ROWS = 5;
  let land = {};

  // if(imgSrc) land = loadImage(imSrc);
  land.width = width;
  land.height = height;
  land.pos = {
    x,
    y,
    center: {
      x: x + land.width / 2,
      y: y + land.height / 2,
    }
  }
  land.rows = [];
  land.safe = true;
  let mainOffset = 2;
  land.offsets = {
    speed: 80 / mainOffset,
    width: 100,
    freq: 1700 * mainOffset,
    time: 1696,
  };

  // ------------------------------- Initialize From Level --------------------------------
  land.rows.push(
    game.createObstacleRow(
      land.pos.x,  // x
      land.pos.y,  // y
      land.width,  // width
      land.height / ROWS,  // height
      0,  // speedInPixelsPerSecond
      true,  // safe
      [true],  // obstacleSafeArr
      [0], // obstacleWidthArr
      [0],   // freqArr
      0 * land.offsets.time
      // [row0car]  // obstacleImgSrcArr
    )
  );

  // ---------------------------------- Main Functions ------------------------------------
  function update(elapsedTime) { 
    updateRows_(elapsedTime);
  }

  function render() { 
    drawHitbox_(game.context);
    renderRows_();
  }


  // -------------------------------- Getters and Setters----------------------------------
  let isCollision = () => false;


  // --------------------------------- Private Functions ----------------------------------
  let setPos_ = (x=land.pos.x, y=land.pos.y) => {
    land.pos = { x, y };
    updateCenter_();
  }

  let updateCenter_ = () => {
    obstacle.pos.center = {
      x: land.pos.x + land.width / 2, 
      y: land.pos.y + land.height / 2, 
    }; 
  }

  function updateRows_(elapsedTime) {
    for(let i = 0; i < land.rows.length; i++) {
      land.rows[i].update(elapsedTime);
    }
  }

  function renderRows_() {
    for(let i = 0; i < land.rows.length; i++) {
      land.rows[i].render();
    }
  }

  function drawHitbox_ (context) {
    let hitbox = getHitbox_();

    context.strokeStyle = land.safe ? 'black' : 'white';
    context.fillStyle = land.safe ? 'green' : 'red';
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
      land.pos,
      { x: land.pos.x + land.width, y: land.pos.y }, 
      { x: land.pos.x + land.width, y: land.pos.y + land.height },
      { x: land.pos.x, y: land.pos.y + land.height },
      land.pos
    ];
  }

  // -------------------------------------- Return ----------------------------------------
  return ({
    // Main Functions
    update,
    render,

    // Helper Functions
    // Getters and Setters
    isCollision,
  });
}