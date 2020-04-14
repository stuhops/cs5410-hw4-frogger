game.createLand = function(x, y, width, height, imgSrc) {
  // ----------------------------------- Initialize ---------------------------------------
  const ROWS = 1;
  let land = {};

  // if(imgSrc) land = loadImage(imSrc);
  land.width = width;
  land.height = height;
  land.pos = {
    x,
    y,
    center: {
      x: x + land.width / 2,
      y: y + land.height / 2,
    }
  }
  land.safe = true;

  // ---------------------------------- Main Functions ------------------------------------
  function update(elapsedTime) { 
  }

  function render() { 
    // drawHitbox_(game.context);
    drawLandTexture_();
  }


  // -------------------------------- Getters and Setters----------------------------------
  let getCollisionType = () => { return({ type: 1 })};


  // --------------------------------- Private Functions ----------------------------------
  let setPos_ = (x=land.pos.x, y=land.pos.y) => {
    land.pos = { x, y };
    updateCenter_();
  }

  let updateCenter_ = () => {
    obstacle.pos.center = {
      x: land.pos.x + land.width / 2, 
      y: land.pos.y + land.height / 2, 
    }; 
  }

  function drawHitbox_ (context) {
    let hitbox = getHitbox_();

    context.strokeStyle = land.safe ? 'black' : 'white';
    context.fillStyle = land.safe ? 'green' : 'red';
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

  function getHitbox_() {
    return [
      land.pos,
      { x: land.pos.x + land.width, y: land.pos.y }, 
      { x: land.pos.x + land.width, y: land.pos.y + land.height },
      { x: land.pos.x, y: land.pos.y + land.height },
      land.pos
    ];
  }

  function drawLandTexture_() {
    for(let i = 0; i < ROWS; i++) {
      for(let j = 0; j < land.width / (land.height / ROWS); j++) {
        game.renderSprite(
          'grass', 
          {
            x: land.pos.x + (land.height / ROWS)/2 + j * (land.height / ROWS),
            y: land.pos.y + (land.height / ROWS)/2 + i * (land.height / ROWS),
          },
          {
            width: land.height / ROWS,
            height: land.height / ROWS,
          },
          0,
          0
        );
      }
    }
  }

  // -------------------------------------- Return ----------------------------------------
  return ({
    // Main Functions
    update,
    render,

    // Helper Functions
    // Getters and Setters
    getCollisionType,
  });
}