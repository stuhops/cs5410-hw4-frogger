game.createCharacter = function(radius, centerX, centerY, moveDist, moveTime) {
  let char = {};

  // if(imgSrc) char = loadImage(imSrc);

  char.radius = radius;
  char.pos = { 
    x: centerX, 
    y: centerY, 
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
  };
  char.move = {
    dir: 0,
    baseTimer: moveTime,
    dist: moveDist,
    ppms: moveDist / moveTime,
    timer: 0,
    environmentDelta: 0,
  }


  // ---------------------------------- Main Functions ------------------------------------
  function update(elapsedTime) { 
    move_(elapsedTime);
  }

  function render() { 
    drawHitCircle_(game.context);
  }


  // -------------------------------- Getters and Setters----------------------------------
  let getHitCircle = () => { 
    return ({
      center: {
        x: char.pos.x, 
        y: char.pos.y, 
      },
      radius: char.radius, 
    })
  }
  let getCenter = () => char.pos;

  let setMove = dir => {
    if(char.move.dir === 0) {
      switch(dir) {
        case 'up': 
          if(setNextMoveCenter_(0, -1)) {
            char.move.dir = 'up';
            break;
          }
          else return
        case 'down': 
          if(setNextMoveCenter_(0, 1)) {
            char.move.dir = 'down'; 
            break;
          }
          else break
        case 'right': 
          if(setNextMoveCenter_(1, 0)) {
            char.move.dir = 'right'; 
            break;
          }
          else break;
        case 'left': 
          if(setNextMoveCenter_(-1, 0)) {
            char.move.dir = 'left'; 
            break;
          }
          else break;

        default: return;
      }
      char.move.timer = char.move.baseTimer;
    }
  }

  let setDeltaX = delta => char.move.environmentDelta = delta;

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
      if(char.move.timer > 0) {
        switch(char.move.dir) {
          case 'up': offsetPos_(0, -(char.move.ppms * elapsedTime)); break;
          case 'down': offsetPos_(0, char.move.ppms * elapsedTime); break;
          case 'right': offsetPos_(char.move.ppms * elapsedTime); break;
          case 'left': offsetPos_(-(char.move.ppms * elapsedTime)); break;
        } 
      }
      else {
        char.move.timer = 0;
        char.move.dir = 0;
        char.pos.x = char.pos.nextCenter.x;
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

  // -------------------------------------- Return ----------------------------------------
  return ({
    // Main Functions
    update,
    render,

    // Helper Functions
    // Getters and Setters
    getHitCircle,
    getCenter,

    setMove,
    setDeltaX,
  });
}