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
    // game.domStats.update;
    game.char.update(elapsedTime, game.charDeltaX);
    game.winRow.update(elapsedTime);
    game.river.update(elapsedTime);
    game.middleLand.update(elapsedTime);
    game.road.update(elapsedTime);
    game.startLand.update(elapsedTime);

    // Check collision
    // return ({
    //   type: {
    //     0: death,
    //     1: nothing,
    //     2: log_float,
    //     3: win,
    //   }
    //   deltaX: sideways speed change for frog
    // })
    let hitCircle = game.char.getHitCircle();
    let winRowCol = game.winRow.getCollisionType(hitCircle);
    let riverCol = game.river.getCollisionType(hitCircle);
    let roadCol = game.road.getCollisionType(hitCircle);

    if(winRowCol.type !== 1) { console.log('Win Collision!', winRowCol); };
    if(riverCol.type !== 1) { console.log('River Collision!', riverCol); };
    if(roadCol.type !== 1) { console.log('Road Collision!', roadCol); };
  }


  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    game.winRow.render();
    game.river.render();
    game.middleLand.render();
    game.road.render();
    game.startLand.render();
    game.char.render();
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
      gameOver(elapsedTime);
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

  function gameOver(elapsedTime) {
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

  return {
    start: startGameLoop,
    stop: stopGameLoop,
  }
}();