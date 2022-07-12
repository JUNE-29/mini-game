const startBtn = document.querySelector('.start_btn');
const stopBtn = document.querySelector('.stop_btn');

const replayBtn = document.querySelector('.replay_btn');
const replayBox = document.querySelector('.replay_box');

const lostBox = document.querySelector('.youLost_box');
const lostReplayBtn = document.querySelector('.lost_replay_btn');

const catsImages = document.querySelector('.cats_images');
const alienImages = document.querySelector('.alien_images');

const sec = document.querySelector('.second');

const bgSound = document.querySelector('.bg_sound');

const numberOfCats = 10;
const cat = 'cat';

const numberOfAliens = 7;
const alien = 'alien';

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

   if(seconds < 0) {
      addHiddenClass(stopBtn);
      removeCharacters(numberOfCats, cat);
      removeCharacters(numberOfAliens, alien);
      removeHiddenClass(startBtn);
      stopMusic();
      return;
   }
   timeout = setTimeout(countTime, 1000);
}

function startGame() {
   bgSound.play();
   countStop();
   addHiddenClass(startBtn);
   removeHiddenClass(stopBtn);
   countTime();
}

function getRandomIntInclusive(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function addCharacter(index, characterName) {
   let number = index;
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

   } else if(characterName === alien) {
      character.setAttribute('class', alien);
      character.setAttribute('src', 'static/img/alien.png');
      character.setAttribute('data-name', alien);
   }
      character.style.left =`${x}px`;
      character.style.top =`${y}px`;
      return character;
}

function removeCharacters(index, characterName) {
   let number = index;

   for (i = 0; number > i; i++) {
      if(characterName === cat) {
         const cats = document.querySelector('.cat');
         cats.remove();
      } else if(characterName === alien) { 
         const aliens =  document.querySelector('.alien');
         aliens.remove();
      }
   }
}

startBtn.addEventListener('click', () => {
   startGame();
   addCharacter(numberOfCats, cat);
   addCharacter(numberOfAliens, alien);
});

stopBtn.addEventListener('click',()=>{
   removeHiddenClass(replayBox);
   removeCharacters(numberOfCats, cat);
   removeCharacters(numberOfAliens, alien);
   countStop();
   stopMusic();
});

alienImages.addEventListener('click', event => {
   let aliens = event.target.dataset.name;
   
   if(aliens) {
      removeHiddenClass(lostBox);
      removeCharacters(numberOfCats, cat);
      removeCharacters(numberOfAliens, alien);
      countStop();
      stopMusic();
   }
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
