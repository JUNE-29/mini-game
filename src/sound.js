const catSound = new Audio('static/audio/cat_pull.mp3');
const alienSound = new Audio('static/audio/alien_pull.mp3');
const bgSound = new Audio('static/audio/bg.mp3');
const winSound = new Audio('static/audio/game_win.mp3');
const alertSound = new Audio('static/audio/alert.mp3');

export function playCat() {
    playSound(catSound);
}

export function playAlien() {
    playSound(alienSound);
}

export function playWin() {
    playSound(winSound);
}

export function playAlert() {
    playSound(alertSound);
}

export function playBackground() {
    playSound(bgSound);
}

export function stopBackground() {
    stopSound(bgSound);
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
 }
 
 function stopSound(sound) {
    sound.pause();
 }