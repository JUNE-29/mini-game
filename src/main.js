"use strict";

import Popup from './popup.js';
import GameBuilder from './game.js';

const gameFinishBanner =  new Popup();
const game = new GameBuilder()
   .withGameDuration(10)
   .withCatCount(10)
   .withAlienCount(10)
   .build();

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







