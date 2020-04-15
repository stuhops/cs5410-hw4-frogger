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
  river.safe = false;
  let mainOffset = 2;
  river.offsets = {
    speed: 80 / mainOffset,
    width: 100,
    freq: 1700 * mainOffset,
    time: 1696,
  };
  river.audio = {
    splash: new Audio(game.audio.splash),
  }

  // ------------------------------- Initialize From Level --------------------------------
  if(game.level === 1) {
    let turtleOscillateSafeArr = [
      {bool: true, img: null, duration: 1250},  // Floating
      {bool: true, img: null, duration: 1250},  // Submerging
      {bool: false, img: null, duration: 1250},  // Submerged
      {bool: true, img: null, duration: 1250},  // Emerging
    ];
    let staticSafeArr= [{bool: true, img: null, duration: 10000}];

    // Row 0
    river.rows.push(
      game.createObstacleRow(
        river.pos.x,  // x
        river.pos.y + 0 * (river.height / ROWS),  // y
        river.width,  // width
        river.height / ROWS,  // height
        2 * river.offsets.speed,  // speedInPixelsPerSecond
        false,  // safe
        [staticSafeArr],  // obstacleSafeArr
        [3.7 * river.offsets.width], // obstacleWidthArr
        [2 * river.offsets.freq],   // freqArr
        0 * river.offsets.time,
        ['logLg']  // obstacleImgSrcArr
      )
    );
  // safeStateArr = [ {safe, img, duration} ]

    // Row 1
    river.rows.push(
      game.createObstacleRow(
        river.pos.x,  // x
        river.pos.y + 1 * (river.height / ROWS),  // y
        river.width,  // width
        river.height / ROWS,  // height
        -1.75 * river.offsets.speed,  // speedInPixelsPerSecond
        false,  // safe
        [ 
          turtleOscillateSafeArr, turtleOscillateSafeArr,
          staticSafeArr, staticSafeArr,
          staticSafeArr, staticSafeArr,
          staticSafeArr, staticSafeArr,
          staticSafeArr, staticSafeArr,
        ],  // obstacleSafeArr
        [.8 * river.offsets.width], // obstacleWidthArr
        [
          1.7 * river.offsets.freq, .4 * river.offsets.freq,
          1 * river.offsets.freq, .4 * river.offsets.freq,
          1 * river.offsets.freq, .4 * river.offsets.freq,
          1 * river.offsets.freq, .4 * river.offsets.freq,
          1 * river.offsets.freq, .4 * river.offsets.freq,
        ],   // freqArr
        1 * river.offsets.time,
        ['turtle']  // obstacleImgSrcArr
      )
    );

    // Row 2
    river.rows.push(
      game.createObstacleRow(
        river.pos.x,  // x
        river.pos.y + 2 * (river.height / ROWS),  // y
        river.width,  // width
        river.height / ROWS,  // height
        4 * river.offsets.speed,  // speedInPixelsPerSecond
        false,  // safe
        [staticSafeArr],  // obstacleSafeArr
        [4 * river.offsets.width], // obstacleWidthArr
        [1.5 * river.offsets.freq],   // freqArr
        2 * river.offsets.time,
        ['logLg']  // obstacleImgSrcArr
      )
    );

    // Row 3
    river.rows.push(
      game.createObstacleRow(
        river.pos.x,  // x
        river.pos.y + 3 * (river.height / ROWS),  // y
        river.width,  // width
        river.height / ROWS,  // height
        1.5 * river.offsets.speed,  // speedInPixelsPerSecond
        false,  // safe
        [staticSafeArr],  // obstacleSafeArr
        [2 * river.offsets.width], // obstacleWidthArr
        [2 * river.offsets.freq, 1.75 * river.offsets.freq, 1.75 * river.offsets.freq],   // freqArr
        3 * river.offsets.time,
        ['logSm']  // obstacleImgSrcArr
      )
    );

    // Row 4
    river.rows.push(
      game.createObstacleRow(
        river.pos.x,  // x
        river.pos.y + 4 * (river.height / ROWS),  // y
        river.width,  // width
        river.height / ROWS,  // height
        -1.6 * river.offsets.speed,  // speedInPixelsPerSecond
        false,  // safe
        [ 
          turtleOscillateSafeArr, turtleOscillateSafeArr, turtleOscillateSafeArr,
          staticSafeArr, staticSafeArr, staticSafeArr,
          staticSafeArr, staticSafeArr, staticSafeArr,
          staticSafeArr, staticSafeArr, staticSafeArr,
        ],  // obstacleSafeArr
        [.8 * river.offsets.width], // obstacleWidthArr
        [1 * river.offsets.freq, .45 * river.offsets.freq, .45 * river.offsets.freq],   // freqArr
        4 * river.offsets.time,
        ['turtle']  // obstacleImgSrcArr
      )
    );
  } 

  else if(game.level === 2) {
    let turtleOscillateSafeArr = [
      {bool: true, img: null, duration: 1000},  // Floating
      {bool: true, img: null, duration: 1000},  // Submerging
      {bool: false, img: null, duration: 1000},  // Submerged
      {bool: true, img: null, duration: 1000},  // Emerging
    ];
    let alligatorOscillateSafeArr = [
      {bool: true, img: null, duration: 2000, alligator: true, bodySafe: [{bool: true, img:null, duration: 10000}] },  // Mouth closed
      {bool: false, img: null, duration: 2000},  // Mouth Open
    ];
    let staticSafeArr= [{bool: true, img: null, duration: 10000}];

    // Row 0
    river.rows.push(
      game.createObstacleRow(
        river.pos.x,  // x
        river.pos.y + 0 * (river.height / ROWS),  // y
        river.width,  // width
        river.height / ROWS,  // height
        3 * river.offsets.speed,  // speedInPixelsPerSecond
        false,  // safe
        [alligatorOscillateSafeArr, staticSafeArr, staticSafeArr, staticSafeArr, staticSafeArr],  // obstacleSafeArr
        [3.7 * river.offsets.width], // obstacleWidthArr
        [1.5 * river.offsets.freq],   // freqArr
        0 * river.offsets.time,
        ['logLg']  // obstacleImgSrcArr
      )
    );

    // Row 1
    river.rows.push(
      game.createObstacleRow(
        river.pos.x,  // x
        river.pos.y + 1 * (river.height / ROWS),  // y
        river.width,  // width
        river.height / ROWS,  // height
        -2.5 * river.offsets.speed,  // speedInPixelsPerSecond
        false,  // safe
        [ 
          turtleOscillateSafeArr, turtleOscillateSafeArr,
          staticSafeArr, staticSafeArr,
          staticSafeArr, staticSafeArr,
          staticSafeArr, staticSafeArr,
          staticSafeArr, staticSafeArr,
        ],  // obstacleSafeArr
        [.75 * river.offsets.width], // obstacleWidthArr
        [
          1.25 * river.offsets.freq, .3 * river.offsets.freq,
          .75 * river.offsets.freq, .3 * river.offsets.freq,
          .75 * river.offsets.freq, .3 * river.offsets.freq,
          .75 * river.offsets.freq, .3 * river.offsets.freq,
          .75 * river.offsets.freq, .3 * river.offsets.freq,
        ],   // freqArr
        1 * river.offsets.time,
        ['turtle']  // obstacleImgSrcArr
      )
    );

    // Row 2
    river.rows.push(
      game.createObstacleRow(
        river.pos.x,  // x
        river.pos.y + 2 * (river.height / ROWS),  // y
        river.width,  // width
        river.height / ROWS,  // height
        4.5 * river.offsets.speed,  // speedInPixelsPerSecond
        false,  // safe
        [staticSafeArr],  // obstacleSafeArr
        [4 * river.offsets.width], // obstacleWidthArr
        [1.5 * river.offsets.freq],   // freqArr
        2 * river.offsets.time,
        ['logLg']  // obstacleImgSrcArr
      )
    );

    // Row 3
    river.rows.push(
      game.createObstacleRow(
        river.pos.x,  // x
        river.pos.y + 3 * (river.height / ROWS),  // y
        river.width,  // width
        river.height / ROWS,  // height
        2 * river.offsets.speed,  // speedInPixelsPerSecond
        false,  // safe
        [staticSafeArr],  // obstacleSafeArr
        [2 * river.offsets.width], // obstacleWidthArr
        [2 * river.offsets.freq, 1.75 * river.offsets.freq, 1.75 * river.offsets.freq],   // freqArr
        3 * river.offsets.time,
        ['logSm']  // obstacleImgSrcArr
      )
    );

    // Row 4
    river.rows.push(
      game.createObstacleRow(
        river.pos.x,  // x
        river.pos.y + 4 * (river.height / ROWS),  // y
        river.width,  // width
        river.height / ROWS,  // height
        -5.6 * river.offsets.speed,  // speedInPixelsPerSecond
        false,  // safe
        [ 
          turtleOscillateSafeArr, turtleOscillateSafeArr, turtleOscillateSafeArr,
          staticSafeArr, staticSafeArr, staticSafeArr,
          staticSafeArr, staticSafeArr, staticSafeArr,
          staticSafeArr, staticSafeArr, staticSafeArr,
        ],  // obstacleSafeArr
        [.75 * river.offsets.width], // obstacleWidthArr
        [.5 * river.offsets.freq, .15 * river.offsets.freq, .15 * river.offsets.freq],   // freqArr
        4 * river.offsets.time,
        ['turtle']  // obstacleImgSrcArr
      )
    );
  } 
  else { console.log(`Level ${game.level} is not created.`)}


  // ---------------------------------- Main Functions ------------------------------------
  function update(elapsedTime) { 
    updateRows_(elapsedTime);
  }

  function render() { 
    // drawHitbox_(game.context);
    drawRiverTexture_();
    renderRows_();
  }


  // -------------------------------- Getters and Setters----------------------------------
  function getCollisionType(hitCircle) {
    let row = parseInt((hitCircle.center.y - river.pos.y) / (river.height / river.rows.length));

    if(row >= 0 && row < river.rows.length && !Object.is(row, -0)) {
      let collision = river.rows[row].getCollisionType(hitCircle);
      if(collision.type === 0)
        river.audio.splash.play();
      return collision;
    }

    return ({ type: 1, deltaX: 0 });
  }


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

  function drawRiverTexture_() {
    for(let i = 0; i < ROWS; i++) {
      for(let j = 0; j < river.width / (river.height / ROWS); j++) {
        game.renderSprite(
          'river', 
          {
            x: river.pos.x + (river.height / ROWS)/2 + j * (river.height / ROWS),
            y: river.pos.y + (river.height / ROWS)/2 + i * (river.height / ROWS),
          },
          {
            width: river.height / ROWS,
            height: river.height / ROWS,
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
    // Getters and Setters
    getCollisionType,
  });
}