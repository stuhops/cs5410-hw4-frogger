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
      case 'turtle':
        if(number < 2) {
          game.context.drawImage(
            game.assets.game_sprites,  // Image
            403 + 75 * number, 6,  // Start clipping x and y
            72, 65,  // Width and height to clip
            center.x - dimensions.width/2, center.y - dimensions.height/2,  // Start x and y on canvas
            dimensions.width + 1.5, dimensions.height + 1.5  // Size x and y on canvas
          );
          break;
        }
        else {
          game.context.drawImage(
            game.assets.game_sprites,  // Image
            8 + 73 * (number - 2), 84,  // Start clipping x and y
            72, 65,  // Width and height to clip
            center.x - dimensions.width/2, center.y - dimensions.height/2,  // Start x and y on canvas
            dimensions.width + 1.5, dimensions.height + 1.5  // Size x and y on canvas
          );
          break;
        }

        
      case 'turtleSinking':
        game.context.drawImage(
          game.assets.game_sprites,  // Image
          8 + 73 * (5 + number), 84,  // Start clipping x and y
          72, 65,  // Width and height to clip
          center.x - dimensions.width/2, center.y - dimensions.height/2,  // Start x and y on canvas
          dimensions.width + 1.5, dimensions.height + 1.5  // Size x and y on canvas
        );
        break;

      case 'turtleEmerging':
        game.context.drawImage(
          game.assets.game_sprites,  // Image
          8 + 73 * (8 - number), 84,  // Start clipping x and y
          72, 65,  // Width and height to clip
          center.x - dimensions.width/2, center.y - dimensions.height/2,  // Start x and y on canvas
          dimensions.width + 1.5, dimensions.height + 1.5  // Size x and y on canvas
        );
        break;


      case 'lillyPad': break;
      case 'fly': 
        game.context.drawImage(
          game.assets.game_sprites,  // Image
          84, 172,  // Start clipping x and y
          42, 46,  // Width and height to clip
          center.x - dimensions.width/2, center.y - dimensions.height/2,  // Start x and y on canvas
          dimensions.width + 1.5, dimensions.height + 1.5  // Size x and y on canvas
        );
        break;

      case 'grass':
        game.context.drawImage(
          game.assets.game_sprites,  // Image
          137, 160,  // Start clipping x and y
          80, 80,  // Width and height to clip
          center.x - dimensions.width/2, center.y - dimensions.height/2,  // Start x and y on canvas
          dimensions.width + 1.5, dimensions.height + 1.5  // Size x and y on canvas
        );
        break;

      case 'river':
        game.context.drawImage(
          game.assets.game_sprites,  // Image
          227, 160,  // Start clipping x and y
          80, 80,  // Width and height to clip
          center.x - dimensions.width/2, center.y - dimensions.height/2,  // Start x and y on canvas
          dimensions.width + 1.5, dimensions.height + 1.5  // Size x and y on canvas
        );
        break;

      case 'road':
        game.context.drawImage(
          game.assets.game_sprites,  // Image
          316, 160,  // Start clipping x and y
          80, 80,  // Width and height to clip
          center.x - dimensions.width/2, center.y - dimensions.height/2,  // Start x and y on canvas
          dimensions.width + 1.5, dimensions.height + 1.5  // Size x and y on canvas
        );
        break;

      case 'winRowBad': 
        game.context.drawImage(
          game.assets.game_sprites,  // Image
          409, 161,  // Start clipping x and y
          78, 78,  // Width and height to clip
          center.x - dimensions.width/2, center.y - dimensions.height/2,  // Start x and y on canvas
          dimensions.width + 1.5, dimensions.height + 1.5  // Size x and y on canvas
        );
        break;

      case 'winRowGood':
        game.context.drawImage(
          game.assets.game_sprites,  // Image
          498, 160,  // Start clipping x and y
          80, 80,  // Width and height to clip
          center.x - dimensions.width/2, center.y - dimensions.height/2,  // Start x and y on canvas
          dimensions.width + 1.5, dimensions.height + 5  // Size x and y on canvas
        );
        break;

      case 'winRowDone':
        game.context.drawImage(
          game.assets.game_sprites,  // Image
          0, 0,  // Start clipping x and y
          54, 70,  // Width and height to clip
          center.x - dimensions.width/2, center.y - dimensions.height/2,  // Start x and y on canvas
          dimensions.width, dimensions.height  // Size x and y on canvas
        );
        break;

      case 'frog':
        game.context.drawImage(
          game.assets.game_sprites,  // Image
          0, 0,  // Start clipping x and y
          54, 70,  // Width and height to clip
          center.x - dimensions.width/2, center.y - dimensions.height/2,  // Start x and y on canvas
          dimensions.width, dimensions.height  // Size x and y on canvas
        );
        break;

      case 'logLg':
        game.context.drawImage(
          game.assets.game_sprites,  // Image
          12, 257,  // Start clipping x and y
          353, 58,  // Width and height to clip
          center.x - dimensions.width/2, center.y - dimensions.height/2 + ((number-1)%2),  // Start x and y on canvas
          dimensions.width, dimensions.height  // Size x and y on canvas
        );
        break;

      case 'logMd':
        game.context.drawImage(
          game.assets.game_sprites,  // Image
          12, 327,  // Start clipping x and y
          276, 58,  // Width and height to clip
          center.x - dimensions.width/2, center.y - dimensions.height/2 + ((number-1)%2),  // Start x and y on canvas
          dimensions.width, dimensions.height  // Size x and y on canvas
        );
        break;

      case 'logSm':
        game.context.drawImage(
          game.assets.game_sprites,  // Image
          386, 257,  // Start clipping x and y
          187, 58,  // Width and height to clip
          center.x - dimensions.width/2, center.y - dimensions.height/2 + ((number-1)%2),  // Start x and y on canvas
          dimensions.width, dimensions.height  // Size x and y on canvas
        );
        break;

      case 'die':
        game.context.drawImage(
          game.assets.game_sprites,  // Image
          300, 330,  // Start clipping x and y
          70, 50,  // Width and height to clip
          center.x - dimensions.width/2, center.y - dimensions.height/2,  // Start x and y on canvas
          dimensions.width, dimensions.height  // Size x and y on canvas
        );
        break;

      case 'carFire': 
        game.context.drawImage(
          game.assets.game_sprites,  // Image
          10, 400,  // Start clipping x and y
          180, 80,  // Width and height to clip
          center.x - dimensions.width/2, center.y - dimensions.height/2,  // Start x and y on canvas
          dimensions.width, dimensions.height  // Size x and y on canvas
        );
        break;

      case 'carSemi': 
        game.context.drawImage(
          game.assets.game_sprites,  // Image
          200, 400,  // Start clipping x and y
          290, 70,  // Width and height to clip
          center.x - dimensions.width/2, center.y - dimensions.height/2,  // Start x and y on canvas
          dimensions.width, dimensions.height  // Size x and y on canvas
        );
        break;

      case 'carBlue':
        game.context.drawImage(
          game.assets.game_sprites,  // Image
          12, 483,  // Start clipping x and y
          130, 70,  // Width and height to clip
          center.x - dimensions.width/2, center.y - dimensions.height/2,  // Start x and y on canvas
          dimensions.width, dimensions.height  // Size x and y on canvas
        );
        break;

      case 'carGreen': 
        game.context.drawImage(
          game.assets.game_sprites,  // Image
          155, 483,  // Start clipping x and y
          135, 70,  // Width and height to clip
          center.x - dimensions.width/2, center.y - dimensions.height/2,  // Start x and y on canvas
          dimensions.width, dimensions.height  // Size x and y on canvas
        );
        break;

      case 'carYellow':
        game.context.drawImage(
          game.assets.game_sprites,  // Image
          305, 483,  // Start clipping x and y
          135, 70,  // Width and height to clip
          center.x - dimensions.width/2, center.y - dimensions.height/2,  // Start x and y on canvas
          dimensions.width, dimensions.height  // Size x and y on canvas
        );
        break;

      case 'alligatorBody':
        game.context.drawImage(
          game.assets.alligator_sprites,  // Image
          0, 0,  // Start clipping x and y
          155, 79,  // Width and height to clip
          center.x - dimensions.width/2, center.y - dimensions.height/2,  // Start x and y on canvas
          dimensions.width, dimensions.height  // Size x and y on canvas
        );
        break;

      case 'alligatorHeadOpen':
        game.context.drawImage(
          game.assets.alligator_sprites,  // Image
          192, 0,  // Start clipping x and y
          73, 79,  // Width and height to clip
          center.x - dimensions.width/2, center.y - dimensions.height/2,  // Start x and y on canvas
          dimensions.width, dimensions.height  // Size x and y on canvas
        );
        break;

      case 'alligatorHeadClosed':
        game.context.drawImage(
          game.assets.alligator_sprites,  // Image
          307, 0,  // Start clipping x and y
          73, 79,  // Width and height to clip
          center.x - dimensions.width/2, center.y - dimensions.height/2,  // Start x and y on canvas
          dimensions.width, dimensions.height  // Size x and y on canvas
        );
        break;

    }

    game.context.restore(); 
  }

  else {
    switch(name) {
      case null: return 0;
      case 'turtle': return 7;
      case 'turtleSink': return 5;
      case 'lillyPad': return 1;
      case 'fly': return 1;
      case 'grass': return 1;
      case 'river': return 1;
      case 'road': return 1;
      case 'winBad': return 1;
      case 'winGood': return 1;
      case 'logLg': return 4;
      case 'logMd': return 4;
      case 'logSm': return 4;
      case 'die': return 1;
      case 'carFire': return 1;
      case 'carSemi': return 1;
      case 'carBlue': return 1;
      case 'carGreen': return 1;
      case 'carYellow': return 1;
    }
  }
};