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
  road.offsets = {
    speed: 80,
    width: 75,
    freq: 1500,
  };

  // ------------------------------- Initialize From Level --------------------------------
  if(game.level === 1) {
    // Row 0
    road.rows.push(
      game.createObstacleRow(
        road.pos.x,  // x
        road.pos.y + 0 * (road.height / ROWS),  // y
        road.width,  // width
        road.height / ROWS,  // height
        -2 * road.offsets.speed,  // speedInPixelsPerSecond
        true,  // safe
        [false],  // obstacleSafeArr
        [2 * road.offsets.width], // obstacleWidthArr
        [2 * road.offsets.freq, 4 * road.offsets.freq]   // freqArr
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
        [false],  // obstacleSafeArr
        [1 * road.offsets.width], // obstacleWidthArr
        [5 * road.offsets.freq]   // freqArr
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
        [false],  // obstacleSafeArr
        [.75 * road.offsets.width], // obstacleWidthArr
        [3 * road.offsets.freq, 1 * road.offsets.freq, 1 * road.offsets.freq]   // freqArr
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
        [false],  // obstacleSafeArr
        [.75 * road.offsets.width], // obstacleWidthArr
        [2.5 * road.offsets.freq, 1 * road.offsets.freq, 1 * road.offsets.freq]   // freqArr
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
        [false],  // obstacleSafeArr
        [.75 * road.offsets.width], // obstacleWidthArr
        [2 * road.offsets.freq, 1 * road.offsets.freq, 1 * road.offsets.freq]   // freqArr
        // [row0car]  // obstacleImgSrcArr
      )
    );
    // road.rows.push(
    //   game.createObstacleRow(
    //     road.pos.x,  // x
    //     road.pos.y + 4 * (road.height / ROWS),  // y
    //     road.width,  // width
    //     road.height / ROWS,  // height
    //     [row4car],  // obstacleImgSrcArr
    //     -50,  // speedInPixelsPerSecond
    //     true,  // safe
    //     [false],  // obstacleSafeArr
    //     [1000, 1000, 2000]   // freqArr
    //   )
    // );
  } 
  else { console.log(`Level ${game.level} is not created.`)}


  // ---------------------------------- Main Functions ------------------------------------
  function update(elapsedTime) { 
    updateRows_(elapsedTime);
  }

  function render() { 
    renderRows_();
  }


  // -------------------------------- Getters and Setters----------------------------------


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


  // -------------------------------------- Return ----------------------------------------
  return ({
    // Main Functions
    update,
    render,

    // Helper Functions
    // Getters and Setters
  });
}