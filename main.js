"use strict";

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();

const startBtn = document.querySelector('.start_btn');
const stopBtn = document.querySelector('.stop_btn');
const replayBtn = document.querySelector('.replay_btn');

const popUp = document.querySelector('.pop-up');
const popUpConts = document.querySelector('.pop_up_contents');

const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const CHARACTER_SIZE = 60;
const CAT_COUNT = 10;
const ALIEN_COUNT = 7;
const GAME_DURATION_SEC= 10;

const CAT = 'cat';
const ALIEN = 'alien';

const catSound = new Audio('static/audio/cat_pull.mp3');
const alienSound = new Audio('static/audio/alien_pull.mp3');
const bgSound = new Audio('static/audio/bg.mp3');
const winSound = new Audio('static/audio/game_win.mp3');
const alertSound = new Audio('static/audio/alert.mp3');

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
   initGame();
   showStopButton();
   showTimerAndScore();
   playSound(bgSound);
}

function stopGame() {
   started = false;
   stopGameTimer();
   hideStopButton();
   playSound(alertSound);
   stopSound(bgSound);
   showPopUpWithText('replay? 💥🔫');
}

function finishGame(win) {
   started = false;
   hideStopButton();
   if(win) {
      playSound(winSound);
   } else {
      playSound(alienSound);
   }
   stopGameTimer();
   stopSound(bgSound);
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

function startGameTimer() {
   let remainingTimeSec = GAME_DURATION_SEC;
   updateTimerText(remainingTimeSec);
   timer =  setInterval(()=>{
      if(remainingTimeSec <= 0) {
         clearInterval(timer);
         finishGame(CAT_COUNT === score);
         hideStopButton();
         stopSound(bgSound);
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
   score = 0;
   field.innerHTML = '';
   gameScore.innerText=`${CAT_COUNT.toString().padStart(2,"0")}`;
   addCharacter(CAT_COUNT, CAT, 'static/img/cat.png');
   addCharacter(ALIEN_COUNT, ALIEN, 'static/img/alien.png');
   hideStartButton();
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
      playSound(catSound);
      updateScoreBoard();

      if(score === CAT_COUNT) {
         finishGame(true);
      }
   } else if(target.matches('.alien')) {
      finishGame(false);
   }
}

function playSound(sound) {
   sound.currentTime = 0;
   sound.play();
}

function stopSound(sound) {
   sound.pause();
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
   

