"use strict";

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();

const startBtn = document.querySelector('.start_btn');
const stopBtn = document.querySelector('.stop_btn');

const replayBtn = document.querySelector('.replay_btn');
const replayBox = document.querySelector('.replay_box');

const lostBox = document.querySelector('.youLost_box');
const lostReplayBtn = document.querySelector('.lost_replay_btn');

const catSound = document.querySelector('.cat_pull_audio');

const alienSound = document.querySelector('.alien_pull_audio');

const gameTimer = document.querySelector('.game__timer');

const bgSound = document.querySelector('.bg_sound');

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
let timer = undefined; 

startBtn.addEventListener('click', () => {
   if (started) {
      stopGame();
   } else {
      startGame();
   }

   started = !started;
});

function startGame() {
   initGame();
   showStopButton();
   showTimerAndScore();
}

function stopGame() {
   
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

function initGame() {
   gameScore.innerText=`${CAT_COUNT.toString().padStart(2,"0")}`;
   addCharacter(CAT_COUNT, CAT, 'static/img/cat.png');
   addCharacter(ALIEN_COUNT, ALIEN, 'static/img/alien.png');
   hideStartButton();
   bgSound.play();
   startGameTimer();
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
      
      // if(arrOfCats.length == 0) {
      //    stopMusic();
      //    removeHiddenClass(replayBox);
      //    return;
      // }

      if(remainingTimeSec <= 0) {
         clearInterval(timer);
         hideStopButton();
         removeCharacters(CAT);
         removeCharacters(ALIEN);
         removeHiddenClass(lostBox);
         stopMusic();
         return;
      }
      updateTimerText(--remainingTimeSec);
   }, 1000);
}

function updateTimerText(time) {
   const minutes = Math.floor(time / 60);
   const seconds = time % 60;
   gameTimer.innerText =  `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;
   
}

function randomNumber(min, max) {
   return Math.random() * (max - min) + min; 
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
   
function removeCharacters(characterName) {
      if(characterName === CAT) {
         console.log(arrOfCats);
         arrOfCats.forEach((cats)=>{cats.remove();});
         arrOfCats = [];
      } 
      else if(characterName === ALIEN) { 
         arrOfAliens.forEach((aliens)=>{aliens.remove();});
         arrOfAliens = [];
      }
}

stopBtn.addEventListener('click',()=>{
   removeHiddenClass(replayBox);
   stopMusic();
});

replayBtn.addEventListener('click',()=>{
   removeCharacters(CAT);
   removeCharacters(ALIEN);
   addHiddenClass(replayBox);
   addCharacter(CAT_COUNT, CAT, 'static/img/cat.png');
   addCharacter(ALIEN_COUNT, ALIEN, 'static/img/alien.png');
   startGame();
});

lostReplayBtn.addEventListener('click',()=>{
   removeCharacters(CAT);
   removeCharacters(ALIEN);
   addHiddenClass(lostBox);
   addCharacter(CAT_COUNT, CAT, 'static/img/cat.png');
   addCharacter(ALIEN_COUNT, ALIEN, 'static/img/alien.png');
   startGame();
});


// alienImages.addEventListener('click', event => {
//    let aliens = event.target.dataset.name;

//    alienSound.play();
   
//    if(aliens) {
//       removeHiddenClass(lostBox);
//       removeCharacters(cat);
//       removeCharacters(alien);
//       stopMusic();
//    }
// });


// catsImages.addEventListener('click', event => {
//    let catId = event.target.dataset.id;

//    catSound.play();

//    if(catId) {
//       arrOfCats.pop(arrOfCats.indexOf(catId));
//       const catDelete = document.querySelector(`.cat[data-id="${catId}"]`);
//       catDelete.remove();
//       countNum.innerText=`${arrOfCats.length.toString().padStart(2,"0")}`;
//    }
// });
