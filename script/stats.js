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

  row.width = width;
  row.height = height;
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
  row.score = {
    string: '',
    x: row.width * .5 - 80,
    y: y + height*5 / 8,
    height: height / 2,
  }
  row.timer = {
    x: row.width * .70,
    y: y + height / 4,
    height: height / 2,
    width: row.width * .30 * .85,
    audio: new Audio(game.audio.time),
  }

  row.timer.fullBox = [
    { x: row.timer.x, y: row.timer.y + row.timer.height}, 
    { x: row.timer.x + row.timer.width, y: row.timer.y + row.timer.height}, 
    { x: row.timer.x + row.timer.width, y: row.timer.y + row.timer.height - row.timer.height},
    { x: row.timer.x, y: row.timer.y + row.timer.height - row.timer.height},
    { x: row.timer.x, y: row.timer.y + row.timer.height}, 
  ];

  // ---------------------------------- Main Functions ------------------------------------
  function update(elapsedTime) {
    updateTimer_(elapsedTime);
    updateScore_();
  }

  function render() {
    renderLives_();
    renderScore_();
    renderTimer_();
  }


  // -------------------------------- Getters and Setters----------------------------------

  // --------------------------------- Private Functions ----------------------------------
  function updateTimer_(elapsedTime) {
    game.timer -= elapsedTime;

    if(game.timer / game.baseTimer < .3 && game.timer / game.baseTimer > .25)
      row.timer.audio.play();

    row.timer.box = [
      { x: row.timer.x, y: row.timer.y + row.timer.height}, 
      { x: row.timer.x + row.timer.width * (game.timer / game.baseTimer), y: row.timer.y + row.timer.height}, 
      { x: row.timer.x + row.timer.width * (game.timer / game.baseTimer), y: row.timer.y + row.timer.height - row.timer.height},
      { x: row.timer.x, y: row.timer.y + row.timer.height - row.timer.height},
      { x: row.timer.x, y: row.timer.y + row.timer.height}, 
    ];

  }
  updateTimer_(.001);

  function updateScore_() {
    row.score.string = 'Score: ' + game.score;
  }

  function renderLives_() {
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

  function renderScore_() {
    game.context.lineWidth = 1;
    game.context.font = "32px Arial";
    game.context.fillStyle = '#3bffff';
    game.context.fillText(row.score.string, row.score.x, row.score.y);
  }

  function renderTimer_() {
    // Fill
    context.lineWidth = 6;
    context.fillStyle = '#3bffff';
    context.beginPath();
    context.moveTo(row.timer.box[0].x, row.timer.box[0].y);

    for(let i = 1; i < row.timer.box.length; i++) {
      context.lineTo(row.timer.box[i].x, row.timer.box[i].y);
    }

    context.closePath();
    context.fill();

    // Base outline
    context.strokeStyle = 'black';
    context.lineWidth = 6;
    context.beginPath();
    context.moveTo(row.timer.fullBox[0].x, row.timer.fullBox[0].y);

    for(let i = 1; i < row.timer.fullBox.length; i++) {
      context.lineTo(row.timer.fullBox[i].x, row.timer.fullBox[i].y);
    }

    context.closePath();
    context.stroke();

  }

  // -------------------------------------- Return ----------------------------------------
  return ({
    update,
    render,
  });
}