let canvas = document.getElementById('canvas-main');
let context = canvas.getContext('2d');
game.canvas = canvas;
game.context = context;

let inputBuffer = {};
window.addEventListener('keydown', function(event) {
  inputBuffer[event.key] = event.key;
});
window.addEventListener('keyup', function(event) {
  delete inputBuffer[event.key];
});

if(JSON.parse(window.localStorage.getItem('frogger-high-scores')) !== null)
  game.highScores = JSON.parse(window.localStorage.getItem('frogger-high-scores'));
manageHighScores();

if(JSON.parse(window.localStorage.getItem('frogger-controls')) !== null) {
  game.up = JSON.parse(window.localStorage.getItem('frogger-controls')).up;
  game.down = JSON.parse(window.localStorage.getItem('frogger-controls')).down;
  game.left = JSON.parse(window.localStorage.getItem('frogger-controls')).left;
  game.right = JSON.parse(window.localStorage.getItem('frogger-controls')).right;
}

document.getElementById('control-up').innerHTML = game.up;
document.getElementById('control-down').innerHTML = game.down;
document.getElementById('control-left').innerHTML = game.left;
document.getElementById('control-right').innerHTML = game.right;

function newGame() {
  context.clearRect(0, 0, canvas.width, canvas.height);

// game.createCharacter = function(width, height, centerX, centerY, moveDist, moveTime) {
  game.char = game.createCharacter(
    .5 * game.gameHeight / game.rows,  // radius
    game.gameWidth / 2,  // centerX
    (game.rows - .5) * game.gameHeight / game.rows,  // centerY
    game.gameHeight / game.rows,  // moveDist
    250  // moveTime
  );
  game.winRow = game.createWinRow(
    0,  // x
    0,  // y
    game.gameWidth,  // width
    game.gameHeight / game.rows * 2 // height
    // fillImgSrc
    // obstacleImgSrcArr
  );
  game.river = game.createRiver(
    0,  // x
    2 * (game.gameHeight / game.rows),  // y
    game.gameWidth,  // width
    game.gameHeight / game.rows * 5 // height
  );
  game.middleLand = game.createLand(
    0,  // x
    parseInt(game.rows / 2) * (game.gameHeight / game.rows),  // y
    game.gameWidth,  // width
    game.gameHeight / game.rows * 1 // height
  );
  game.road = game.createRoad(
    0,  // x
    parseInt(game.rows / 2 + 1) * (game.gameHeight / game.rows),  // y
    game.gameWidth,  // width
    game.gameHeight / game.rows * 5 // height
  );
  game.startLand = game.createLand(
    0,  // x
    parseInt(game.rows - 1) * (game.gameHeight / game.rows),  // y
    game.gameWidth,  // width
    game.gameHeight / game.rows * 1 // height
  );

  game.statusBar = game.createStatusBar(
    game.gameWidth,
    game.gameHeight / game.rows,
    0,
    0,
    // parseInt(game.rows - 1) * (game.gameHeight / game.rows),  // y
  )

  document.getElementById('background-music').play();

  if(game.level === 1)
    game.score = 0;

  game.timer = 30000;
  game.baseTimer = 30000;
  game.lives = 3;
  game.won = true;
  game.gameOver = false;
  game.gameLoop.start();
}
