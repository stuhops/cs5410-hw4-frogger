game.createCharacter = function(width, height, centerX, centerY, moveDist, moveTime) {
  let char = {};

  // if(imgSrc) char = loadImage(imSrc);

  char.width = width;
  char.height = height;
  char.pos = { 
    x: centerX - char.width / 2, 
    y: centerY - char.height / 2, 
    center: {
      x: centerX, 
      y: centerY, 
    },
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
  }


  // ---------------------------------- Main Functions ------------------------------------
  function update(elapsedTime) { 
    move_(elapsedTime);
  }

  function render() { 
    drawHitbox_(game.context);
  }


  // -------------------------------- Getters and Setters----------------------------------
  let getHitbox = () => [
    { x: char.pos.x, y: char.pos.y + char.height / 8}, 
    { x: char.pos.x + char.width, y: char.pos.y + char.height / 8}, 
    { x: char.pos.x + char.width, y: char.pos.y + char.height - char.height / 8},
    { x: char.pos.x, y: char.pos.y + char.height - char.height / 8},
    { x: char.pos.x, y: char.pos.y + char.height / 8}, 
  ];
  let getCenter = () => { 
    updateCenter_();
    return char.pos.center;
  }

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

  // --------------------------------- Private Functions ----------------------------------
  let drawHitbox_ = context => {
    let hitbox = getHitbox();

    context.strokeStyle = char.safe ? 'black' : 'white';
    context.fillStyle = char.safe ? 'green' : 'red';
    context.lineWidth = 6;
    context.beginPath();
    context.moveTo(hitbox[0].x, hitbox[0].y);

    for(let i = 1; i < hitbox.length; i++) {
      context.lineTo(hitbox[i].x, hitbox[i].y);
    }

    context.closePath();
    context.stroke();
    context.fill();
  }

  let setPos_ = (x=char.pos.x, y=char.pos.y) => {
    char.pos.x = x;
    char.pos.y = y;
    updateCenter_();
  }

  let setCenter_ = (x=char.pos.center.x, y=char.pos.center.y) => {
    setPos_(x - char.width / 2, y - char.height / 2);
  }

  let offsetPos_ = (xDif=0, yDif=0) => {
    char.pos.x = char.pos.x + xDif;
    char.pos.y = char.pos.y + yDif;
    updateCenter_();
  }

  let updateCenter_ = () => {
    char.pos.center = {
      x: char.pos.x + char.width / 2, 
      y: char.pos.y + char.height / 2, 
    }; 
  }

  function move_ (elapsedTime) {
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
        setCenter_(char.pos.nextCenter.x, char.pos.nextCenter.y);
      }
    }
  }

  let setNextMoveCenter_ = (xSign=0, ySign=0) => {
    let nextX = char.pos.center.x + xSign * char.move.dist;
    let nextY = char.pos.center.y + ySign * char.move.dist;

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
    getHitbox,
    getCenter,

    setMove,
  });
}