// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Win Row >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

game.createWinRow = function(x, y, width, height) {
  const ROWS = 1;
  let row = {};

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
  row.idxDone = 0;
  row.obstacleSafe = {
    arr: [true],
    iterator: 0,
  };
  row.obstacleWidth = {
    arr: [100],
    iterator: 0,
  }
  row.frequency = {
    arr: [0],
    iterator: 0,
  };
  row.slot = {
    width: row.width / 11,
    height: row.height * 3/4,
    spacingOffset: 3*row.width / 44,
    spacing: row.width / 22 * 4.5,
  };
  row.randomObstacles = {
    arr: [],
    baseTimer: 10000,
    timer: 10000,
    choices: ['alligator', 'fly'],
  }

  row.audio = {
    win: new Audio(game.audio.win),
  }

  row.obstacles = [];
  row.particles = [];
  row.obstaclesLevel2 = [];
  generateNewObstacles_();



  // ---------------------------------- Main Functions ------------------------------------
  function update(elapsedTime) {
    updateObstacles_(elapsedTime);
    updateRandomObstacles_(elapsedTime);
    updateObstaclesLevel2_(elapsedTime);
    updateParticles_(elapsedTime);
  }

  function render() {
    // drawHitbox_(game.context);
    drawRowTexture_();
    for(let i = 0; i < row.obstacles.length; i++) {
      row.obstacles[i].render();
    }
    for(let i = 0; i < row.particles.length; i++) {
      row.particles[i].vis.render();
    }
    for(let i = 0; i < row.randomObstacles.arr.length; i++) {
      row.randomObstacles.arr[i].obstacle.render();
    }
    for(let i = 0; i < row.obstaclesLevel2.length; i++) {
      row.obstaclesLevel2[i].render();
    }

    if(row.particles.length) {
      row.audio.win.play();
    }
  }


  // -------------------------------- Getters and Setters----------------------------------
  function getCollisionType(hitCircle) {
    if(hitCircle.center.y < row.height) {
      for(let i = 0; i < row.randomObstacles.arr.length; i++) {
        let obst = row.randomObstacles.arr[i].obstacle;
        let hitbox = obst.getHitbox();

        for(let j = 0; j < hitbox.length - 1; j++) {
          if(game.collision.lineCircleIntersection(hitbox[j], hitbox[j+1], hitCircle)) {
            if(!obst.isSafe()) {
              return ({ type: 0, deltaX: 0, index: i });
            }
            else if(row.randomObstacles.arr[i].type === 'fly') {
              game.score += 200;
            }
          }
        }
      }
      for(let i = 0; i < row.obstaclesLevel2.length; i++) {
        let obst = row.obstaclesLevel2[i];
        let hitbox = obst.getHitbox();

        for(let j = 0; j < hitbox.length - 1; j++) {
          if(game.collision.lineCircleIntersection(hitbox[j], hitbox[j+1], hitCircle)) {
            return ({ type: 0, deltaX: 0, index: i });
          }
        }
      }
      for(let i = 0; i < row.obstacles.length; i++) {
        let obst = row.obstacles[i];
        let hitbox = obst.getHitbox();

        for(let j = 0; j < hitbox.length - 1; j++) {
          if(game.collision.lineCircleIntersection(hitbox[j], hitbox[j+1], hitCircle)) {
            return ({ type: 3, deltaX: 0, index: i });
          }
        }
      }
      return({ type: 0, deltaX: 0 });
    }
    return({ type: 1, deltaX: 0 })
  }
  let allIdxDone = () => row.idxDone >= 5;

  function setIdxDone(idx) {
    row.idxDone++;
    game.score += 50 + 10 * 2 * parseInt(game.timer / 1000);

    // ----------------- Display as done ----------------
    row.obstacles[idx].setSafe(false)
    let newObstacle = game.createObstacle(
      row.slot.width,  // width
      row.slot.height,  // height
      row.slot.spacingOffset + row.slot.spacing * idx,  // x
      row.pos.y + height - row.slot.height,  // y
      0,  // speedInPixelsPerSecond
      [{bool: false, img: null, duration: 10000}],  // safe
      'winRowDone'
    );
    row.obstaclesLevel2.push(newObstacle);

    // ---------------- Set up particles ---------------
    let newVis = ParticleSystemCircularGravity(game.graphics, {
      image: game.assets.fire,
      center: row.obstacles[idx].getCenter(),
      size: {mean: 20, stdev: 5},
      speed: { mean: 0, stdev: 0.2},
      lifetime: { mean: 1000, stdev: 100}
    });
    row.particles.push({
      vis: newVis,
      timer: 1500,
    });

  };


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
          row.obstacles.splice(i, 1);
          i--;
        }
      }
    }
  }

  function updateRandomObstacles_(elapsedTime) {
    // -------------- Update existing ---------------
    row.randomObstacles.timer -= elapsedTime;
    for(let i = 0; i < row.randomObstacles.arr.length; i++) {
      row.randomObstacles.arr[i].duration -= elapsedTime;
      row.randomObstacles.arr[i].obstacle.update(elapsedTime);
      if(row.randomObstacles.arr[i].duration < 0) {
        row.randomObstacles.arr.splice(i, 1);
        i--;
      }
    }

    // -------------- Generate new ------------------
    if(row.randomObstacles.timer < 0) {
      row.randomObstacles.timer += row.randomObstacles.baseTimer;
      // Find an index to display on
      let randIdx = Math.floor(Math.random() * (5 - row.idxDone));
      let idx = -1;
      for(let i = 0; i <= randIdx; i++) {
        idx++;
        if(idx > 4) 
          return;
        if(!row.obstacles[idx].isSafe()) 
          i--;
      }
      let spec = {
        idx,
        center: row.obstacles[idx].getCenter(),
        dimensions: row.obstacles[idx].getDimensions(),
      };

      // Create an obstacle 
      let randomChoice = row.randomObstacles.choices[Math.floor(Math.random() * (row.randomObstacles.choices.length + 1))];
      let newObstacle = null;
      if(randomChoice === 'alligator') {
        newObstacle = game.createObstacle(
          spec.dimensions.width / 2, // width
          spec.dimensions.height / 2,  // height
          spec.center.x - spec.dimensions.width/4,  // x
          spec.center.y,  // y
          0,  // speedInPixelsPerSecond
          [{bool: true, img: null, duration: 1000}, {bool: false, img: null, duration: 4000}],  // safe
          'alligatorHeadClosed' // imgSrc
        );
      }
      else if(randomChoice === 'fly') {
        newObstacle = game.createObstacle(
          spec.dimensions.width / 2, // width
          spec.dimensions.height / 2,  // height
          spec.center.x - spec.dimensions.width/4,  // x
          spec.center.y,  // y
          0,  // speedInPixelsPerSecond
          [{bool: true, img: null, duration: 3000}],  // safe
          'fly' // imgSrc
        );
      }

      if(newObstacle !== null) {
        row.randomObstacles.arr.push({
          obstacle: newObstacle,
          duration: 8000,
          type: randomChoice,
        });
      }

      row.randomObstacles.timer += row.randomObstacles.baseTimer;
    }
  }

  function updateObstaclesLevel2_(elapsedTime) {
    for(let i = 0; i < row. obstaclesLevel2.length; i++) {
      row.obstaclesLevel2[i].update(elapsedTime);
    }
  }

  function updateParticles_(elapsedTime) {
    for(let i = 0; i < row.particles.length; i++) {
      row.particles[i].timer -= elapsedTime;

      if(row.particles[i].timer < 0) {
        row.particles.splice(i, 1);
        i--;
      }
      else {
        row.particles[i].vis.update(elapsedTime); 
      }
    }
  }

  function generateNewObstacles_() {
    let staticSafeArr= [{bool: true, img: null, duration: 10000}];
    for(let i = 0; i < 5; i++) {
      // Generate new obstacle
      let newObstacle = game.createObstacle(
        row.slot.width,  // width
        row.slot.height,  // height
        row.slot.spacingOffset + row.slot.spacing * i,  // x
        row.pos.y + height - row.slot.height,  // y
        0,  // speedInPixelsPerSecond
        staticSafeArr,  // safe
        'winRowGood'
      );
      row.obstacles.push(newObstacle);

      // Restart timer
      row.obstacleSafe.iterator = (row.obstacleSafe.iterator + 1) % row.obstacleSafe.arr.length;
      row.obstacleWidth.iterator = (row.obstacleWidth.iterator + 1) % row.obstacleWidth.arr.length;
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

  function drawRowTexture_() {
    for(let i = 0; i < ROWS; i++) {
      for(let j = 0; j < row.width / (row.height / ROWS); j++) {
        game.renderSprite(
          'winRowBad', 
          {
            x: row.pos.x + (row.height / ROWS)/2 + j * (row.height / ROWS),
            y: row.pos.y + (row.height / ROWS)/2 + i * (row.height / ROWS),
          },
          {
            width: row.height / ROWS,
            height: row.height / ROWS,
          },
          0,
          0
        );
      }
    }
  }

  // -------------------------------------- Return ----------------------------------------
  return ({
    update,
    render,

    getCollisionType,
    allIdxDone,
    setIdxDone,
  });
}