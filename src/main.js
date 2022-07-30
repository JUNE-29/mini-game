"use strict";

import Popup from './popup.js';
import {GameBuilder, Reaseon} from './game.js';
import * as sound from './sound.js';

const gameFinishBanner =  new Popup();
const game = new GameBuilder()
   .withGameDuration(10)
   .withCatCount(10)
   .withAlienCount(10)
   .build();

game.setGameStopListener((reason) => {
   let message;
   switch(reason) {
      case Reaseon.cancel:
         message = 'replay? 💥🔫';
         sound.playAlert();
         break;
      case Reaseon.win:
         message = 'YOU WON!!😻';
         sound.playWin();
         break;
      case Reaseon.lose:
         message = 'YOU LOST!!😿';
         sound.playAlien();
         break;
      default:
         throw new Error('not valid reasen');
   }
   gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(()=>{
   game.start();
})







