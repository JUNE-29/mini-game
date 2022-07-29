"use strict";

import Popup from './popup.js';
import Game from './game.js';

const gameFinishBanner =  new Popup();
const game = new Game(10, 10, 10);
game.setGameStopListener((reason) => {
   let message;
   switch(reason) {
      case 'cancel':
         message = 'replay? 💥🔫';
         break;
      case 'win':
         message = 'YOU WON!!😻';
         break;
      case 'lose':
         message = 'YOU LOST!!😿';
         break;
      default:
         throw new Error('not valid reasen');
   }
   gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(()=>{
   game.start();
})







