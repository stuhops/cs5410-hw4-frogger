game.changeKey = function(value) {
  document.getElementById('dimmer').setAttribute('style', 'display: block');
  function keyPress(event) {
    game[value] = event.key;
    document.getElementById(`control-${value}`).innerHTML = event.key;
    window.removeEventListener('keydown', keyPress);
    manageControls();
    document.getElementById('dimmer').setAttribute('style', 'display: none');
  }
  window.addEventListener('keydown', keyPress);
}


function manageControls() {
  window.localStorage.setItem('frogger-controls', JSON.stringify({up: game.up, down: game.down, left: game.left, right: game.right}));
}
