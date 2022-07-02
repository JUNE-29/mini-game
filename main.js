const startBtn = document.querySelector('.start_btn');
const stopBtn = document.querySelector('.stop_btn');
const replayBtn = document.querySelector('.replay_btn');
const replayBox = document.querySelector('.replay_box');

const sec = document.querySelector('.second');

const bgSound = document.querySelector('.bg_sound');

let timeout;
let seconds = 10;


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
      stopBtn.classList.add('hidden');
      startBtn.classList.remove('hidden');
      StopMusic();
      return;
   }
    timeout = setTimeout(CountTime, 1000);
}

function StartGame() {
   bgSound.play();
   CountStop();
   startBtn.classList.add('hidden');
   stopBtn.classList.remove('hidden');
   CountTime();
}

startBtn.addEventListener('click', () => {
   StartGame();
});

stopBtn.addEventListener('click',()=>{
   replayBox.classList.remove('hidden');
   CountStop();
   StopMusic();
});

replayBtn.addEventListener('click',()=>{
   replayBox.classList.add('hidden');
   StartGame();
});


