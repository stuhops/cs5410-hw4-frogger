function domStats() {

  function update(elapsedTime) {
    updateTime(elapsedTime);  
    updateScore(elapsedTime);
    updateHighScore();
  }

  function updateTime(elapsedTime) {
    document.getElementById('time-left').innerHTML = Number(document.getElementById('time-left').innerHTML) + elapsedTime;
  }
  
  function updateScore(elapsedTime) {
    let currScore = Number(document.getElementById('my-score').innerHTML);
    currScore -= elapsedTime;
    if(currScore <= 0) {
      document.getElementById('my-score').innerHTML = 0;
    }
    else {
      document.getElementById('my-score').innerHTML = currScore;
    }
  }

  function updateHighScore() {
    document.getElementById('high-score') = document.getElementById('high-score-1');
  }

  return {
    update,
  }
};


function manageHighScores(newScore) {
  if(newScore) {
    for(let i = 0; i < game.highScores.length; i++) {
      if(game.highScores[i] === 'Unclaimed' || newScore > game.highScores[i]) {
        game.highScores.splice(i, 0, newScore);
        game.highScores.pop();
        window.localStorage.setItem('frogger-high-scores', JSON.stringify(game.highScores));
        break;
      }
    }
  }
  for(let i = 0; i < game.highScores.length; i++) {
    for(let j = 0; j < document.getElementsByName(`high-score-${i+1}`).length; j++) {
      document.getElementsByName(`high-score-${i+1}`)[j].innerHTML = game.highScores[i];
    }
  }
}


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Status Bar >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
game.createStatusBar = function(width, height, x, y) {
  const ROWS = 1;
  if(!game.timer) game.timer = 0;
  let row = {};

  row.pos = {
    x,
    y,
    center: {
      x: game.gameWidth / 2,
      y: y + height / 2,
    },
  }
  row.lives = {
    x: 80,
    y: y,
    height: height / 2,
    width: width / 4,
    offsetX: 100,
    life: {
      width: height,
      height: height,
    }
  }
  row.width = width;
  row.height = height;

  // ---------------------------------- Main Functions ------------------------------------
  function update(elapsedTime) {
    updateTimer_(elapsedTime);
  }

  function render() {
    renderLives_();
    renderTimer_();
  }


  // -------------------------------- Getters and Setters----------------------------------

  // --------------------------------- Private Functions ----------------------------------
  function updateTimer_(elapsedTime) {}

  function renderLives_(elapsedTime) {
    for(let i = 0; i < game.lives; i++) {
      game.renderSprite(
        'frog', 
        {
          x: row.lives.x + (row.lives.life.width / 2) + (i * row.lives.offsetX), 
          y: row.lives.y + row.lives.height / 2,
        }, 
        {width: row.lives.life.width, height: row.lives.life.height}, 
        0,
        0
      );
    }
  }
  function renderTimer_(elapsedTime) {}

  // -------------------------------------- Return ----------------------------------------
  return ({
    update,
    render,

  });
}