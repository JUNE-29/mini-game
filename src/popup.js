"use strict";

export default class Popup {
    constructor() {
        this.popUp = document.querySelector('.pop-up');
        this.popUpConts = document.querySelector('.pop_up_contents');
        this.replayBtn = document.querySelector('.replay_btn');
        this.replayBtn.addEventListener('click', ()=> {
            this.onClick && this.onClick();
            this.hide();
        });
    }
    setClickListener(onClick) {
        this.onClick = onClick;
    }
    showWithText(text) {
        this.popUpConts.innerText = text;
        this.popUp.classList.remove('hide');
    }
    hide() {
        this.popUp.classList.add('hide');
    }
}
