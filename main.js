"use strict";

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();

const startBtn = document.querySelector('.start_btn');
const stopBtn = document.querySelector('.stop_btn');

const popUp = document.querySelector('.pop-up');
const popUpConts = document.querySelector('.pop_up_contents');

const replayBtn = document.querySelector('.replay_btn');

const catSound = document.querySelector('.cat_pull_audio');
const alienSound = document.querySelector('.alien_pull_audio');
const bgSound = document.querySelector('.bg_sound');

const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const CHARACTER_SIZE = 60;
const CAT_COUNT = 5;
const ALIEN_COUNT = 5;
const GAME_DURATION_SEC= 10;

const CAT = 'cat';
const ALIEN = 'alien';

let arrOfCats = [];
let arrOfAliens = [];

let started = false;
let score = 0;
let timer = undefined; 


field.addEventListener('click', onFieldClick);

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

replayBtn.addEventListener('click',()=>{
   startGame();
   addHiddenClass(popUp);
});

function startGame() {
   started = true;
   score = 0;
   initGame();
   showStopButton();
   showTimerAndScore();
}

function stopGame() {
   started = false;
   stopGameTimer();
   hideStopButton();
   stopMusic();
   showPopUpWithText('replay? 💥🔫');
}

function finishGame(win) {
   started = false;
   hideStopButton();
   showPopUpWithText(win? 'YOU WON!!😻' : 'YOU LOST!!😿');
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

function addHiddenClass(name) {
   name.classList.add('hidden');
}

function removeHiddenClass(name) {
   name.classList.remove('hidden');
}

function stopMusic() {
   bgSound.pause();
   bgSound.currentTime = 0;
}

function startGameTimer() {
   let remainingTimeSec = GAME_DURATION_SEC;
   updateTimerText(remainingTimeSec);
   timer =  setInterval(()=>{
      if(remainingTimeSec <= 0) {
         clearInterval(timer);
         finishGame(CAT_COUNT === score);
         hideStopButton();
         stopMusic();
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

function showPopUpWithText(text) {
   popUpConts.innerHTML = text;
   removeHiddenClass(popUp);
}

function initGame() {
   field.innerHTML = '';
   gameScore.innerText=`${CAT_COUNT.toString().padStart(2,"0")}`;
   addCharacter(CAT_COUNT, CAT, 'static/img/cat.png');
   addCharacter(ALIEN_COUNT, ALIEN, 'static/img/alien.png');
   hideStartButton();
   bgSound.play();
   startGameTimer();
}

function onFieldClick(event) {
   if(!started) {
      return;
   }
   const target = event.target;
   if(target.matches('.cat')) {
      target.remove();
      score++;
      updateScoreBoard();

      if(score === CAT_COUNT) {
         stopGameTimer();
         finishGame(true);
      }
   } else if(target.matches('.alien')) {
      stopGameTimer();
      finishGame(false);
   }
}

function updateScoreBoard() {
   gameScore.innerText = (CAT_COUNT - score).toString().padStart(2,"0");
}

function addCharacter(count, characterName, imgPath) {
   const x1 = 0;
   const y1 = 0;
   const x2 = fieldRect.width - CHARACTER_SIZE;
   const y2 = fieldRect.height - CHARACTER_SIZE;

   for (let i = 0; count > i; i++) {
      const character = document.createElement('img');
      character.setAttribute('class', characterName);
      character.setAttribute('src', imgPath);
      character.style.position = 'absolute';
      character.style.cursor = 'pointer';

      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);

      character.style.left =`${x}px`;
      character.style.top =`${y}px`;
      
      field.appendChild(character);
   }
}

function randomNumber(min, max) {
   return Math.random() * (max - min) + min; 
}
   

