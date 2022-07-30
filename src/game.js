"use strict";
import Field from './field.js';
import * as sound from './sound.js';

export const Reaseon = Object.freeze({
    win: 'win',
    lose: 'lose',
    cancel: 'cancel',
});

// Builder Pattern
export class GameBuilder {
    withGameDuration(duration) {
        this.gameDuration = duration;
        return this;
    }

    withCatCount(num) {
        this.catCount = num;
        return this;
    }

    withAlienCount(num) {
        this.alienCount = num;
        return this;
    }

    build() {
        console.log(this);
        return new Game(
            this.gameDuration,
            this.catCount,
            this.alienCount
        );
    }
}

class Game {
    constructor(gameDuration, catCount, alienCount) {
        this.gameDuration = gameDuration;
        this.catCount = catCount;
        this.alienCount = alienCount;

        this.startBtn = document.querySelector('.start_btn');
        this.stopBtn = document.querySelector('.stop_btn');
        this.startBtn.addEventListener('click', () => {
            if (this.started) {
                this.stop(Reaseon.cancel);
            } else {
                this.start();
            }
        });
        
        this.stopBtn.addEventListener('click',()=>{
            this.stop(Reaseon.cancel);
        });

        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');

        this.gameField = new Field(catCount, alienCount);
        this.gameField.setClickListener(this.onCharacterClick);

        this.started = false;
        this.score = 0;
        this.timer = undefined; 
    }

    setGameStopListener(onGameStop) {
        this.onGameStop = onGameStop;
    }

    start() {
        this.started = true;
        this.initGame();
        this.showStopButton();
        this.showTimerAndScore();
        this.startGameTimer();
        sound.playBackground();
    }
    
    stop(reason) {
        this.started = false;
        this.stopGameTimer();
        this.hideStopButton();
        sound.stopBackground();
        this.onGameStop && this.onGameStop(reason);
    }

    onCharacterClick = (character) => {
        if(!this.started) {
            return;
        }
        if(character ==='cat') {
            this.score++;
            this.updateScoreBoard();
            if(this.score === this.catCount) {
                this.stop(Reaseon.win);
            }
        } else if(character === 'alien') {
            this.stop(Reaseon.lose);
        }
    }

    showStopButton() {
        this.stopBtn.style.visibility = 'visible';
    }
    
    hideStopButton() {
        this.stopBtn.style.visibility = 'hidden';
    }
    
    showTimerAndScore() {
        this.gameTimer.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible';
    }
    
    hideStartButton() {
        this.startBtn.style.visibility = 'hidden';
    }
    
    startGameTimer() {
        let remainingTimeSec = this.gameDuration;
        this.updateTimerText(remainingTimeSec);
        this.timer =  setInterval(()=>{
        if(remainingTimeSec <= 0) {
                clearInterval(this.timer);
                this.stop(this.catCount === this.score? Reaseon.win : Reaseon.cancel);
                this.hideStopButton();
                sound.stopBackground();
                return;
        }
            this.updateTimerText(--remainingTimeSec);
        }, 1000);
    }
    
    stopGameTimer() {
        clearInterval(this.timer);
    }
        
    updateTimerText(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        this.gameTimer.innerText =  `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;
    }
        
    initGame() {
        this.score = 0;
        this.gameScore.innerText=`${this.catCount.toString().padStart(2,"0")}`;
        this.gameField.init();
        this.hideStartButton();
    }
        
    updateScoreBoard() {
        this.gameScore.innerText = (this.catCount - this.score).toString().padStart(2,"0");
    }
        
        


}

