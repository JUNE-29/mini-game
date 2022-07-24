const startBtn = document.querySelector('.start_btn');
const stopBtn = document.querySelector('.stop_btn');

const replayBtn = document.querySelector('.replay_btn');
const replayBox = document.querySelector('.replay_box');

const lostBox = document.querySelector('.youLost_box');
const lostReplayBtn = document.querySelector('.lost_replay_btn');

const catsImages = document.querySelector('.cats_images');
const catSound = document.querySelector('.cat_pull_audio');

const alienImages = document.querySelector('.alien_images');
const alienSound = document.querySelector('.alien_pull_audio');

const sec = document.querySelector('.timer__second');

const bgSound = document.querySelector('.bg_sound');

const countNum = document.querySelector('.game__score');

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

   if(arrOfCats.length == 0) {
      countStop();
      stopMusic();
      removeHiddenClass(replayBox);
      return;
   }

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

function getRandomIntInclusive(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1)) + min; 
}

let id = 10;

function addCharacter(numberOf, characterName) {
   let number = numberOf;
   let character;

   // id = 0;

   for (i = 0; number > i; i++) {
      if(characterName === cat) {
         character = createCharacters(cat);
         catsImages.appendChild(character);
      }else if(characterName === alien) {
         character = createCharacters(alien);
         alienImages.appendChild(character);
      }
   }
}
   
function createCharacters(characterName) {
   let x = getRandomIntInclusive(100, 900);
   let y = getRandomIntInclusive(200, 400);

   const character = document.createElement('img');
   if(characterName === cat) {
      character.setAttribute('class', cat);
      character.setAttribute('src', 'static/img/cat.png');
      character.setAttribute('data-name', cat);
      character.setAttribute('data-id', id);
      arrOfCats.push(character);
      id++;

   } else if(characterName === alien) {
      character.setAttribute('class', alien);
      character.setAttribute('src', 'static/img/alien.png');
      character.setAttribute('data-name', alien);
      arrOfAliens.push(character);
   }
      character.style.left =`${x}px`;
      character.style.top =`${y}px`;
      return character;
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
   addCharacter(numberOfCats, cat);
   addCharacter(numberOfAliens, alien);
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
   addCharacter(numberOfCats, cat);
   addCharacter(numberOfAliens, alien);
   startGame();
});

lostReplayBtn.addEventListener('click',()=>{
   removeCharacters(cat);
   removeCharacters(alien);
   addHiddenClass(lostBox);
   addCharacter(numberOfCats, cat);
   addCharacter(numberOfAliens, alien);
   startGame();
});


alienImages.addEventListener('click', event => {
   let aliens = event.target.dataset.name;

   alienSound.play();
   
   if(aliens) {
      removeHiddenClass(lostBox);
      removeCharacters(cat);
      removeCharacters(alien);
      countStop();
      stopMusic();
   }
});


catsImages.addEventListener('click', event => {
   let catId = event.target.dataset.id;

   catSound.play();

   if(catId) {
      arrOfCats.pop(arrOfCats.indexOf(catId));
      const catDelete = document.querySelector(`.cat[data-id="${catId}"]`);
      catDelete.remove();
      countNum.innerText=`${arrOfCats.length.toString().padStart(2,"0")}`;
   }
});

