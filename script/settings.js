game.changeKey = function(value) {
  function keyPress(event) {
    game[value] = event.key;
    document.getElementById(`control-${value}`).innerHTML = event.key;
    window.removeEventListener('keydown', keyPress);
    manageControls();
  }
  window.addEventListener('keydown', keyPress);
}


function manageControls() {
  window.localStorage.setItem('frogger-controls', JSON.stringify({up: game.up, down: game.down, left: game.left, right: game.right}));
}
