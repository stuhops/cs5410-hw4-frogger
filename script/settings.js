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
  window.localStorage.setItem('midterm-controls', JSON.stringify({up: game.up, left: game.left, right: game.right}));
}
