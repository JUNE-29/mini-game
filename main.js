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

const sec = document.querySelector('.second');

const bgSound = document.querySelector('.bg_sound');

const countNum = document.querySelector('.count__number');

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
      removeCharacters(alien);
      removeHiddenClass(replayBox);
      return;
   }

   if(seconds < 0) {
      addHiddenClass(stopBtn);
      removeCharacters(cat);
      removeCharacters(alien);
      removeHiddenClass(startBtn);
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

let id = 0;

function addCharacter(numberOf, characterName) {
   let number = numberOf;
   let character;

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
   let x = getRandomIntInclusive(40, 1300);
   let y = getRandomIntInclusive(230, 450);

   const character = document.createElement('img');
   if(characterName === cat) {
      character.setAttribute('class', cat);
      character.setAttribute('src', 'static/img/cat.png');
      character.setAttribute('data-name', cat);
      character.setAttribute('data-id', id);
      arrOfCats.push(character);
      id ++;

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
   removeCharacters(cat);
   removeCharacters(alien);
   stopMusic();
});


replayBtn.addEventListener('click',()=>{
   addHiddenClass(replayBox);
   addCharacter(numberOfCats, cat);
   addCharacter(numberOfAliens, alien);
   startGame();
});

lostReplayBtn.addEventListener('click',()=>{
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
   let index = event.target.dataset.id;

   catSound.play();

   if(index) {
      arrOfCats.pop(index);
      const catDelete = document.querySelector(`.cat[data-id="${index}"]`);
      catDelete.remove();
      countNum.innerText=`${arrOfCats.length.toString().padStart(2,"0")}`;
      console.log(arrOfCats.length);
   }
});

