game.gameLoop = function() {
  let lastTime = performance.now();
  let requestFrame = true;

  function processInput() {
    for(input in inputBuffer) {
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


  function update(elapsedTime) {
    updateItems_(elapsedTime);

    // if(!game.lives) {
    //   gameOver_();
    // }
    if(game.checkCollisions) {
      checkCollisions_();
    }
    else if(game.char.isDead()) {
      if(game.lives) {
        newLife_();
      }
      else {
        game.gameOver = true;
        game.won = false;
      }
      game.char.setPos();
    }
  }


  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    renderItems_();
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
    else {
      // gameOver(elapsedTime);
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
  function gameOver_(elapsedTime) {
    game.gameOverTimer -= elapsedTime;
    document.getElementById('my-prev-score').innerHTML = document.getElementById('my-score').innerHTML;
    document.getElementById('my-score').innerHTML = '100';

    if(game.won) {
      if(game.gameOverTimer < 0) {
        game.level++;
        navigate('game-play')
      }
      else if(game.level == game.levels) {
        navigate('game-over');
      }
    }
    else {
      navigate('game-over');
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
    game.winRow.render();
    game.river.render();
    game.middleLand.render();
    game.road.render();
    game.startLand.render();
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
  }

  function loseALife_(hitCircle) {
    game.lives--;
    game.winRow.getCollisionType(hitCircle);
    game.char.setDying();
    game.checkCollisions = false;
  }

  function success_(winIndex) {
    console.log('Success!!!!!');
    game.winRow.setIdxDone(winIndex);
    game.char.setPos();
    // game.won = true;
    // game.gameOver = true;
  }

  return {
    start: startGameLoop,
    stop: stopGameLoop,
  }
}();