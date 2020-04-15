game.createCharacter = function(radius, centerX, centerY, moveDist, moveTime) {
  let char = {};

  // if(imgSrc) char = loadImage(imSrc);

  char.state = 'alive';
  char.radius = radius;
  char.pos = { 
    x: centerX, 
    y: centerY, 
    angle: Math.PI,
    min: { 
      x: 0,
      y: 0,
    },
    max: { 
      x: game.gameWidth,
      y: game.gameHeight,
    },
    nextCenter: {
      x: centerX,
      y: centerY,
    },
    startCenter: {
      x: centerX,
      y: centerY,
    },
  };
  char.move = {
    dir: 0,
    baseTimer: moveTime,
    dist: moveDist,
    ppms: moveDist / moveTime,
    timer: 500,
    environmentDelta: 0,
  }
  char.spriteNum = 0;
  char.status = {
    dead: false,
    dying: {
      bool: false,
      baseTimer: 2000,
      timer: 2000,
    },
  };
  char.audio = {
    move: new Audio(game.audio.move),
  }

  let sheet = {
    width: 600,
    height: 561,
  }
  let frog = {
    clipWidth: 54,
    clipHeight: sheet.height / 8,
    offsetX: 57,
    width: 2*char.radius,
    height: 2*char.radius,
    length: 6,
  }


  // ---------------------------------- Main Functions ------------------------------------
  function update(elapsedTime) { 
    if(char.status.dying.bool) {
      updateDying_(elapsedTime);
    }
    else if(!char.status.dead) {
      move_(elapsedTime);
    }
  }

  function render() { 
    if(char.status.dying.bool) {
      renderDying_();
    }
    else if(!char.status.dead) {
      renderFrog_();
    }
  }


  // -------------------------------- Getters and Setters----------------------------------
  let getHitCircle = () => { 
    return ({
      center: {
        x: char.pos.x, 
        y: char.pos.y, 
      },
      radius: char.radius * 3 / 4, 
    })
  }
  let getCenter = () => char.pos;
  let isDead = () => char.status.dead;
  let isDying = () => char.status.dying.bool;

  let setMove = dir => {
    if(char.move.dir === 0) {
      char.audio.move.currentTime = 0;
      char.audio.move.play();
      switch(dir) {
        case 'up': 
          if(setNextMoveCenter_(0, -1)) {
            game.score += 10;
            char.move.dir = 'up';
            char.pos.angle = Math.PI;
            break;
          }
          else return
        case 'down': 
          if(setNextMoveCenter_(0, 1)) {
            game.score -= 10;
            char.move.dir = 'down'; 
            char.pos.angle = 0;
            break;
          }
          else break
        case 'right': 
          if(setNextMoveCenter_(1, 0)) {
            char.move.dir = 'right'; 
            char.pos.angle = 1.5 * Math.PI;
            break;
          }
          else break;
        case 'left': 
          if(setNextMoveCenter_(-1, 0)) {
            char.move.dir = 'left'; 
            char.pos.angle = .5 * Math.PI;
            break;
          }
          else break;

        default: return;
      }
      char.move.timer = char.move.baseTimer;
    }
  }
  let setDead = () => char.status.dead = true;
  let setAlive = () => char.status.dead = false;
  let setDying = () => {
    char.status.dying.bool = true;
    char.status.dying.timer = char.status.dying.baseTimer;
  }
  let setDeltaX = delta => char.move.environmentDelta = delta;
  let setPos = (x=char.pos.startCenter.x, y=char.pos.startCenter.y) => {
    char.pos.x = x;
    char.pos.y = y;
    char.pos.angle = Math.PI;
    char.move.dir = 0;
  }

  // --------------------------------- Private Functions ----------------------------------
  let drawHitCircle_ = context => {
    context.strokeStyle = 'white';
    context.fillStyle = 'black';
    context.lineWidth = 6;
    context.beginPath();

    context.arc(char.pos.x, char.pos.y, char.radius, 0, 2 * Math.PI);

    context.closePath();
    context.stroke();
    context.fill();
  }

  let offsetPos_ = (xDif=0, yDif=0) => {
    char.pos.x += xDif;
    char.pos.y += yDif;
  }

  function move_ (elapsedTime) {
    char.pos.x += char.move.environmentDelta * elapsedTime;
    if(char.move.dir !== 0) {
      char.move.timer -= elapsedTime;
      char.spriteNum = frog.length - parseInt(char.move.timer / (char.move.baseTimer / frog.length)); 
      if(char.move.timer > 0) {
        switch(char.move.dir) {
          case 'up': offsetPos_(0, -(char.move.ppms * elapsedTime)); break;
          case 'down': offsetPos_(0, char.move.ppms * elapsedTime); break;
          case 'right': offsetPos_(char.move.ppms * elapsedTime); break;
          case 'left': offsetPos_(-(char.move.ppms * elapsedTime)); break;
        } 
      }
      else {
        char.spriteNum = 0;
        char.move.timer = 0;
        char.move.dir = 0;
        char.pos.nextCenter.x = char.pos.x
        char.pos.y = char.pos.nextCenter.y;
      }
    }
  }

  let setNextMoveCenter_ = (xSign=0, ySign=0) => {
    let nextX = char.pos.x + xSign * char.move.dist;
    let nextY = char.pos.y + ySign * char.move.dist;

    if(    nextX <= char.pos.max.x 
        && nextX >= char.pos.min.x
        && nextY <= char.pos.max.y
        && nextY >= char.pos.min.y
      ) {
      char.pos.nextCenter.x = nextX;
      char.pos.nextCenter.y = nextY;
      return true;
    }
    else 
      return false;
  }

  function renderFrog_() {

    game.context.save();
    game.context.translate(char.pos.x, char.pos.y);
    game.context.rotate(char.pos.angle);
    game.context.translate(-char.pos.x, -char.pos.y);
    game.context.drawImage(
      game.assets.game_sprites,  // Image
      0 + char.spriteNum * frog.offsetX, 0,  // Start clipping x and y
      frog.clipWidth, frog.clipHeight,  // Width and height to clip
      char.pos.x - char.radius, char.pos.y - char.radius,  // Start x and y on canvas
      frog.width, frog.height  // Size x and y on canvas
    );
    game.context.restore(); 
  }

  function updateDying_(elapsedTime) {
    char.status.dying.timer -= elapsedTime;
    offsetPos_(0, elapsedTime / 100);
    if(char.status.dying.timer < 0) {
      char.status.dead = true;
      char.status.dying.bool = false;
    }
  }

  function renderDying_() {
    game.renderSprite('die', char.pos, {width: char.radius * 3, height: char.radius * 3}, char.status.dying.timer / char.status.dying.baseTimer, 0);
  }
  // -------------------------------------- Return ----------------------------------------
  return ({
    // Main Functions
    update,
    render,

    // Helper Functions
    // Getters and Setters
    getHitCircle,
    getCenter,
    isDead,
    isDying,

    setMove,
    setDead,
    setAlive,
    setDying,
    setDeltaX,
    setPos,
  });
}