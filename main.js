const startBtn = document.querySelector('.start_btn');
const stopBtn = document.querySelector('.stop_btn');
const sec = document.querySelector('.second');

let timeout;
let seconds = 10;

function CountTime() {
   sec.innerText = `${seconds.toString().padStart(2,"0")}`;

   seconds--;

   if(seconds < 0) {
      stopBtn.classList.add('hidden');
      startBtn.classList.remove('hidden');
      return;
   }
    timeout = setTimeout(CountTime, 1000);
}

function CountStop() {
   clearTimeout(timeout);
   seconds = 10;
}

startBtn.addEventListener('click', () => {
   CountStop();
   startBtn.classList.add('hidden');
   stopBtn.classList.remove('hidden');
   CountTime();
});



