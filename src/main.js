"use strict";

import Popup from './popup.js';
import Field from './field.js';
import * as sound from './sound.js';

const startBtn = document.querySelector('.start_btn');
const stopBtn = document.querySelector('.stop_btn');

const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const CAT_COUNT = 10;
const ALIEN_COUNT = 7;
const GAME_DURATION_SEC= 10;

let started = false;
let score = 0;
let timer = undefined; 

const gameFinishBanner =  new Popup();
gameFinishBanner.setClickListener(()=>{
   startGame();
})

const gameField = new Field(CAT_COUNT, ALIEN_COUNT);
gameField.setClickListener(onCharacterClick);

function onCharacterClick(character) {
   if(!started) {
      return;
   }
   if(character ==='cat') {
      score++;
      updateScoreBoard();
      if(score === CAT_COUNT) {
         finishGame(true);
      }
   } else if(character === 'alien') {
      finishGame(false);
   }
}

startBtn.addEventListener('click', () => {
   if (started) {
      stopGame();
   } else {
      startGame();
   }
});

stopBtn.addEventListener('click',()=>{
   stopGame();
});

function startGame() {
   started = true;
   initGame();
   showStopButton();
   showTimerAndScore();
   startGameTimer();
   sound.playBackground();
}

function stopGame() {
   started = false;
   stopGameTimer();
   hideStopButton();
   sound.playAlert();
   sound.stopBackground();
   gameFinishBanner.showWithText('replay? 💥🔫');
}

function finishGame(win) {
   started = false;
   hideStopButton();
   if(win) {
      sound.playWin();
   } else {
      sound.playAlien();
   }
   stopGameTimer();
   sound.stopBackground();
   gameFinishBanner.showWithText(win? 'YOU WON!!😻' : 'YOU LOST!!😿');
}

function showStopButton() {
   stopBtn.style.visibility = 'visible';
}

function hideStopButton() {
   stopBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
   gameTimer.style.visibility = 'visible';
   gameScore.style.visibility = 'visible';
}

function hideStartButton() {
   startBtn.style.visibility = 'hidden';
}

function startGameTimer() {
   let remainingTimeSec = GAME_DURATION_SEC;
   updateTimerText(remainingTimeSec);
   timer =  setInterval(()=>{
      if(remainingTimeSec <= 0) {
         clearInterval(timer);
         finishGame(CAT_COUNT === score);
         hideStopButton();
         sound.stopBackground();
         return;
      }
      updateTimerText(--remainingTimeSec);
   }, 1000);
}

function stopGameTimer() {
   clearInterval(timer);
}

function updateTimerText(time) {
   const minutes = Math.floor(time / 60);
   const seconds = time % 60;
   gameTimer.innerText =  `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;
   
}

function initGame() {
   score = 0;
   gameScore.innerText=`${CAT_COUNT.toString().padStart(2,"0")}`;
   gameField.init();
   hideStartButton();
}

function updateScoreBoard() {
   gameScore.innerText = (CAT_COUNT - score).toString().padStart(2,"0");
}



