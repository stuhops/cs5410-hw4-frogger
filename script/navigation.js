function navigate(newRoute){
  document.getElementById(game.route).classList.remove('active');

  if(game.route === 'game-play')
    game.gameLoop.stop();

  game.route = newRoute;

  document.getElementById(game.route).classList.add('active');

  if(game.route === 'game-play')
    newGame(game);
} 
