let canvas = document.getElementById('canvas-main');
let context = canvas.getContext('2d');

let inputBuffer = {};
window.addEventListener('keydown', function(event) {
  inputBuffer[event.key] = event.key;
});
window.addEventListener('keyup', function(event) {
  delete inputBuffer[event.key];
});

let game = {
  route: 'main-menu',

  // ------------- Canvas --------------
  gameHeight: 1024,
  gameWidth: 1024,
  canvas: canvas,
  context: context,

  // ---------- Game State -------------
  level: 1,
  levels: 2,
  gameOver: false,
  score: 100,

  // ---------- Game Vars --------------

  // --------- High Scores -------------
  highScores: ['Unclaimed', 'Unclaimed', 'Unclaimed', 'Unclaimed', 'Unclaimed'],

  // ----------- Controls --------------
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',

  // ------------ Audio ----------------

  // ------------ Images ---------------
};

if(JSON.parse(window.localStorage.getItem('midterm-high-scores')) !== null)
  game.highScores = JSON.parse(window.localStorage.getItem('midterm-high-scores'));
manageHighScores();

if(JSON.parse(window.localStorage.getItem('midterm-controls')) !== null) {
  game.up = JSON.parse(window.localStorage.getItem('midterm-controls')).up;
  game.down = JSON.parse(window.localStorage.getItem('midterm-controls')).down;
  game.left = JSON.parse(window.localStorage.getItem('midterm-controls')).left;
  game.right = JSON.parse(window.localStorage.getItem('midterm-controls')).right;
}

document.getElementById('control-up').innerHTML = game.up;
document.getElementById('control-down').innerHTML = game.down;
document.getElementById('control-left').innerHTML = game.left;
document.getElementById('control-right').innerHTML = game.right;

function newGame() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  game.gameLoop.start();
}
