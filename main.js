const startBtn = document.querySelector('.start_btn');
const stopBtn = document.querySelector('.stop_btn');
const replayBtn = document.querySelector('.replay_btn');
const replayBox = document.querySelector('.replay_box');
const cat = document.querySelector('.cat');

const sec = document.querySelector('.second');

const bgSound = document.querySelector('.bg_sound');

let timeout;
let seconds = 10;

function AddHiddenClass(name) {
   name.classList.add('hidden');
}

function RemoveHiddenClass(name) {
   name.classList.remove('hidden');
}

function CountStop() {
   clearTimeout(timeout);
   seconds = 10;
}

function StopMusic() {
   bgSound.pause();
   bgSound.currentTime = 0;
}

function CountTime() {
   sec.innerText = `${seconds.toString().padStart(2,"0")}`;

   seconds--;

   if(seconds < 0) {
      AddHiddenClass(stopBtn);
      RemoveHiddenClass(startBtn);
      StopMusic();
      return;
   }
   timeout = setTimeout(CountTime, 1000);
}

function StartGame() {
   bgSound.play();
   CountStop();
   AddHiddenClass(startBtn);
   RemoveHiddenClass(stopBtn);
   CountTime();
}

function getRandomIntInclusive(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function RandomCoordinate(name) {
   let x = getRandomIntInclusive(40, 1400);
   let y = getRandomIntInclusive(230, 481);

   name.style.left=`${x}px`;
   name.style.top = `${y}px`;
}


startBtn.addEventListener('click', () => {
   StartGame();
   RemoveHiddenClass(cat);
   RandomCoordinate(cat);

});

stopBtn.addEventListener('click',()=>{
   RemoveHiddenClass(replayBox);
   AddHiddenClass(cat);
   CountStop();
   StopMusic();
});

replayBtn.addEventListener('click',()=>{
   AddHiddenClass(replayBox);
   RemoveHiddenClass(cat);
   StartGame();
   RandomCoordinate(cat);
});
