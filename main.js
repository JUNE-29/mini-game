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

const sec = document.querySelector('.timer__second');

const bgSound = document.querySelector('.bg_sound');

const countNum = document.querySelector('.game__score');

const CHARACTER_SIZE = 60;
const numberOfCats = 10;
const cat = 'cat';
let arrOfCats = [];

const numberOfAliens = 7;
const alien = 'alien';
let arrOfAliens = [];

let timeout;
let seconds = 10;

function addHiddenClass(name) {
   name.classList.add('hidden');
}

function removeHiddenClass(name) {
   name.classList.remove('hidden');
}

function countStop() {
   clearTimeout(timeout);
   seconds = 10;
}

function stopMusic() {
   bgSound.pause();
   bgSound.currentTime = 0;
}

function countTime() {
   sec.innerText = `${seconds.toString().padStart(2,"0")}`;

   seconds--;

   // if(arrOfCats.length == 0) {
   //    countStop();
   //    stopMusic();
   //    removeHiddenClass(replayBox);
   //    return;
   // }

   if(seconds < 0) {
      addHiddenClass(stopBtn);
      removeCharacters(cat);
      removeCharacters(alien);
      removeHiddenClass(lostBox);
      stopMusic();
      return;
   }
   timeout = setTimeout(countTime, 1000);
}

function startGame() {
   bgSound.play();
   countStop();
   countNum.innerText=`10`;
   addHiddenClass(startBtn);
   removeHiddenClass(stopBtn);
   countTime();
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
      if(characterName === cat) {
         console.log(arrOfCats);
         arrOfCats.forEach((cats)=>{cats.remove();});
         arrOfCats = [];
      } 
      else if(characterName === alien) { 
         arrOfAliens.forEach((aliens)=>{aliens.remove();});
         arrOfAliens = [];
      }
}

startBtn.addEventListener('click', () => {
   addCharacter(numberOfCats, cat, 'static/img/cat.png');
   addCharacter(numberOfAliens, alien, 'static/img/alien.png');
   startGame();
});

stopBtn.addEventListener('click',()=>{
   removeHiddenClass(replayBox);
   countStop();
   stopMusic();
});


replayBtn.addEventListener('click',()=>{
   removeCharacters(cat);
   removeCharacters(alien);
   addHiddenClass(replayBox);
   addCharacter(numberOfCats, cat, 'static/img/cat.png');
   addCharacter(numberOfAliens, alien, 'static/img/alien.png');
   startGame();
});

lostReplayBtn.addEventListener('click',()=>{
   removeCharacters(cat);
   removeCharacters(alien);
   addHiddenClass(lostBox);
   addCharacter(numberOfCats, cat, 'static/img/cat.png');
   addCharacter(numberOfAliens, alien, 'static/img/alien.png');
   startGame();
});


// alienImages.addEventListener('click', event => {
//    let aliens = event.target.dataset.name;

//    alienSound.play();
   
//    if(aliens) {
//       removeHiddenClass(lostBox);
//       removeCharacters(cat);
//       removeCharacters(alien);
//       countStop();
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
