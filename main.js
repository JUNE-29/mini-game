const startBtn = document.querySelector('.start_btn');
const stopBtn = document.querySelector('.stop_btn');

startBtn.addEventListener('click', () => {
   startBtn.classList.add('hidden');
   stopBtn.classList.remove('hidden');
});

