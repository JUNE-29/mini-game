const startBtn = document.querySelector('.start_btn');
const stopBtn = document.querySelector('.stop_btn');
const replayBtn = document.querySelector('.replay_btn');
const replayBox = document.querySelector('.replay_box');
const catsImages = document.querySelector('.cats_images');

const sec = document.querySelector('.second');

const bgSound = document.querySelector('.bg_sound');

const numberOfCats = 10;

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
      // addHiddenClass(cat);
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

function addCharacter(index) {
   let number = index;
   let character;

   for (i = 0; number > i; i++) {
      character = createCharacter();
      catsImages.appendChild(character);
   }
   
}

function createCharacter() {
   let x = getRandomIntInclusive(40, 1400);
   let y = getRandomIntInclusive(230, 481);

      const character = document.createElement('img');
      character.setAttribute('class', 'cat');
      character.setAttribute('src', 'static/img/cat.png');
   
      character.style.left=`${x}px`;
      character.style.top = `${y}px`;
      return character;
}

function removeChatacter(index) {
   let number = index;
   let character;

   for (i = 0; number > i; i++) {
      const cat = document.querySelector('.cat');
      cat.remove();
   }
}

startBtn.addEventListener('click', () => {
   startGame();
   addCharacter(numberOfCats);
});

stopBtn.addEventListener('click',()=>{
   removeHiddenClass(replayBox);
   removeChatacter(numberOfCats);
   countStop();
   stopMusic();
});

replayBtn.addEventListener('click',()=>{
   addHiddenClass(replayBox);
   addCharacter(numberOfCats);
   startGame();
});
