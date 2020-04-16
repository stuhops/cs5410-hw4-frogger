game.gameLoop = function() {
  let lastTime = performance.now();
  let requestFrame = true;

  function processInput() {
    for(input in inputBuffer) {
      if(!game.char.isDead() && !game.char.isDying() && game.waitTimer <= 0) {
        if(input === game.up)
          game.char.setMove('up');

        else if(input === game.down)
          game.char.setMove('down');

        else if(input === game.right)
          game.char.setMove('right');

        else if(input === game.left)
          game.char.setMove('left');
      }
    }
  }


  function update(elapsedTime) {
    game.waitTimer -= elapsedTime;
    updateItems_(elapsedTime);

    if(game.checkCollisions) {
      checkCollisions_();
      game.statusBar.update(elapsedTime);
      if(game.timer < 0) {
        loseALife_(game.char.getHitCircle());
      }
    }

    else if(game.char.isDead()) {
      if(game.lives)
        newLife_();
      else {
        game.won = false;
        startGameOver_();
      }
    }
  }


  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    renderItems_();
    game.statusBar.render();
  }


  function gameLoop(time) {
    let elapsedTime = time - lastTime;
    lastTime = time;

    processInput();
    update(elapsedTime);
    render();

    if(!game.gameOver && requestFrame) {
      requestAnimationFrame(gameLoop);
    }
    else if(requestFrame){
      requestAnimationFrame(gameOver_);
    }
  }

  function startGameLoop() {
    game.gameOverTimer = 3000;
    lastTime = performance.now();
    requestFrame = true;
    requestAnimationFrame(gameLoop);
  }

  function stopGameLoop() {
    requestFrame = false;
  }



  // ---------------------------------------- Private ------------------------------------------- 
  function startGameOver_() {
    game.char.setDead();
    game.gameOverTimer = 2000;
    manageHighScores(game.score);
    game.gameOver = true;
  }

  function gameOver_(time) {
    let elapsedTime = time - lastTime;
    lastTime = time 

    game.gameOverTimer -= elapsedTime;
    updateItems_(elapsedTime);
    renderItems_();

    if(game.gameOverTimer < 0) {
      if(game.level == game.levels) {
        navigate('game-over');
        return;
      }
      else if(game.won) {
          game.level++;
          navigate('game-play')
          return;
      }
    }
    else if(!game.won) {
      navigate('game-over');
      return;
    }
    else {
      requestAnimationFrame(gameOver_);
    }
  }

  function updateItems_(elapsedTime) {
    // game.domStats.update;
    game.char.update(elapsedTime, game.charDeltaX);
    game.winRow.update(elapsedTime);
    game.river.update(elapsedTime);
    game.middleLand.update(elapsedTime);
    game.road.update(elapsedTime);
    game.startLand.update(elapsedTime);
  }

  function renderItems_() {
    game.middleLand.render();
    game.startLand.render();
    game.river.render();
    game.road.render();
    game.winRow.render();
    game.char.render();
  }

  function checkCollisions_() {
    game.char.setDeltaX(0);
    let hitCircle = game.char.getHitCircle();
    let winRowCol = game.winRow.getCollisionType(hitCircle);
    let riverCol = game.river.getCollisionType(hitCircle);
    let roadCol = game.road.getCollisionType(hitCircle);

    if(winRowCol.type !== 1 || riverCol.type !== 1 || roadCol.type !== 1) {
      if(!(winRowCol.type * riverCol.type * roadCol.type)) {
        loseALife_(hitCircle);
      }
      else if (riverCol.type === 2) {
        game.char.setDeltaX(riverCol.deltaX);
      }
      else if (winRowCol.type === 3) {
        success_(winRowCol.index);
      }
    } 
  }

  function newLife_() {
    game.char.setAlive();
    game.char.setPos();
    game.checkCollisions = true;
    game.timer = game.baseTimer;
  }

  function loseALife_(hitCircle) {
    game.lives--;
    game.winRow.getCollisionType(hitCircle);
    game.char.setDying();
    game.checkCollisions = false;

    // -------------- Create Guts ---------------
    if(game.char.getCenter().y > parseInt(game.rows / 2 + 1) * (game.gameHeight / game.rows)) {
      let newVis = ParticleSystemCircularGravity(game.graphics, {
        image: game.assets.guts,
        center: game.char.getCenter(),
        size: {mean: 20, stdev: 5},
        speed: { mean: 0, stdev: 0.2},
        lifetime: { mean: 1000, stdev: 100}
      });
      game.guts.push({
        vis: newVis,
        pauseTimer: 300,
        timer: 2000,
      });
    }
  }

  function success_(winIndex) {
    game.winRow.setIdxDone(winIndex);
    game.waitTimer = 1000;
    newLife_();
    if(game.winRow.allIdxDone()) {
      game.score += 1000;
      game.won = true;
      startGameOver_();
    }
  }

  return {
    start: startGameLoop,
    stop: stopGameLoop,
  }
}();