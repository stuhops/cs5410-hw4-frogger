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

  // ------------------------------- Initialize From Level --------------------------------
  if(game.level === 1) {
    // Row 0
    road.rows.push(
      game.createObstacleRow(
        road.pos.x,  // x
        road.pos.y + 0 * (road.height / ROWS),  // y
        road.width,  // width
        road.height / ROWS,  // height
        -70,  // speedInPixelsPerSecond
        true,  // safe
        [false],  // obstacleSafeArr
        [75], // obstacleWidthArr
        [2000, 4000]   // freqArr
        // [row0car]  // obstacleImgSrcArr
      )
    );

    // // Row 1
    // road.rows.push(
    //   game.createObstacleRow(
    //     road.pos.x,  // x
    //     road.pos.y + 1 * (road.height / ROWS),  // y
    //     road.width,  // width
    //     road.height / ROWS,  // height
    //     60,  // speedInPixelsPerSecond
    //     true,  // safe
    //     [false],  // obstacleSafeArr
    //     [50], // obstacleWidthArr
    //     [3000]   // freqArr
    //     // [row0car]  // obstacleImgSrcArr
    //   )
    // );
    // road.rows.push(
    //   game.createObstacleRow(
    //     road.pos.x,  // x
    //     road.pos.y + 1 * (road.height / ROWS),  // y
    //     road.width,  // width
    //     road.height / ROWS,  // height
    //     [row1car],  // obstacleImgSrcArr
    //     60,  // speedInPixelsPerSecond
    //     true,  // safe
    //     [false],  // obstacleSafeArr
    //     [3000]   // freqArr
    //   )
    // );

    // // Row 2
    // road.rows.push(
    //   game.createObstacleRow(
    //     road.pos.x,  // x
    //     road.pos.y + 2 * (road.height / ROWS),  // y
    //     road.width,  // width
    //     road.height / ROWS,  // height
    //     [row2car],  // obstacleImgSrcArr
    //     -40,  // speedInPixelsPerSecond
    //     true,  // safe
    //     [false],  // obstacleSafeArr
    //     [1000, 1000, 2000]   // freqArr
    //   )
    // );

    // // Row 3
    // road.rows.push(
    //   game.createObstacleRow(
    //     road.pos.x,  // x
    //     road.pos.y + 3 * (road.height / ROWS),  // y
    //     road.width,  // width
    //     road.height / ROWS,  // height
    //     [row3car],  // obstacleImgSrcArr
    //     50,  // speedInPixelsPerSecond
    //     true,  // safe
    //     [false],  // obstacleSafeArr
    //     [1000, 1000, 2000]   // freqArr
    //   )
    // );

    // // Row 4
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