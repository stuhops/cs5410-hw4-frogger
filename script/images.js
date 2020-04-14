// game.createImage = (imgSrc, x=0, y=0, angle=0) => {
//   let img = new Image();
//   img.isReady = false;
//   img.onload = function() {
//     this.isReady = true;
//   };
//   img.src = imgSrc;

//   img.center.x = x;
//   img.center.y = y;
//   img.angle = angle;

//   let render = (context) => {
//     if (img.isReady) {
//       context.save();
//       context.translate(img.center.x, img.center.y);
//       context.rotate(img.angle);
//       context.translate(-img.center.x, -img.center.y);
//       context.drawImage(
//         img,
//         img.center.x - img.width/2,
//         img.center.y - img.height/2,
//         img.width, img.height);
//       context.restore();
//     }
//   }; 


//   return {
//     img,
//     render
//   }
// }

game.renderSprite = function(name, center, dimensions, angle, number) {
  if(center && dimensions) {
    if(name === null) return 0;
    
    game.context.save();
    game.context.translate(center.x, center.y);
    game.context.rotate(angle);
    game.context.translate(-center.x, -center.y);


    switch (name) {
      case 'turtleSink': return 0;
      case 'lillyPad': return 0;
      case 'fly': return 0;
      case 'grass': return 0;
      case 'water': return 0;
      case 'road': return 0;
      case 'winBad': return 0;
      case 'winGood': return 0;
      case 'logLg': return 0;
      case 'logMd': return 0;
      case 'logSm': return 0;
      case 'die': return 0;
      case 'carFire': return 0;
      case 'carSemi': 
        game.context.drawImage(
          game.assets.game_sprites,  // Image
          200, 400,  // Start clipping x and y
          290, 70,  // Width and height to clip
          center.x - dimensions.width/2, center.y - dimensions.height/2,  // Start x and y on canvas
          dimensions.width, dimensions.height  // Size x and y on canvas
        );
        break;


      case 'carBlue': return 0;
      case 'carGreen': return 0;
      case 'carYellow': return 0;
    }

    game.context.restore(); 
  }

  else {
    let getLength = name => {
      switch(name) {
        case null: return 0;
        case 'turtle': return 7;
        case 'turtleSink': return 5;
        case 'lillyPad': return 1;
        case 'fly': return 1;
        case 'grass': return 1;
        case 'water': return 1;
        case 'road': return 1;
        case 'winBad': return 1;
        case 'winGood': return 1;
        case 'logLg': return 1;
        case 'logMd': return 1;
        case 'logSm': return 1;
        case 'die': return 1;
        case 'carFire': return 1;
        case 'carSemi': return 1;
        case 'carBlue': return 1;
        case 'carGreen': return 1;
        case 'carYellow': return 1;
      }
    }
  }
};