"use strict";
import * as sound from './sound.js';

const CHARACTER_SIZE = 60;

export default class Field {
    constructor(catCount, alienCount) {
        this.catCount = catCount;
        this.alienCount = alienCount;
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        this.field.addEventListener('click', this.onClick);
    }
    init() {
        this.field.innerHTML = '';
        this._addCharacter(this.catCount, 'cat', 'static/img/cat.png');
        this._addCharacter(this.alienCount, 'alien', 'static/img/alien.png');
    }

    setClickListener(onCharacterClick) {
        this.onCharacterClick = onCharacterClick;
    }

    _addCharacter(count, characterName, imgPath) {
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - CHARACTER_SIZE;
        const y2 = this.fieldRect.height - CHARACTER_SIZE;
     
        for (let i = 0; count > i; i++) {
            const character = document.createElement('img');
            character.setAttribute('class', characterName);
            character.setAttribute('src', imgPath);
            character.style.position = 'absolute';
            character.style.cursor = 'pointer';
     
            const x = randomNumber(x1, x2);
            const y = randomNumber(y1, y2);
     
            character.style.left =`${x}px`;
            character.style.top =`${y}px`;
            
            this.field.appendChild(character);
        }
    }

    onClick = event => {
        const target = event.target;
        if(target.matches('.cat')) {
            target.remove();
            sound.playCat();
            this.onCharacterClick && this.onCharacterClick('cat');
        } else if(target.matches('.alien')) {
            this.onCharacterClick && this.onCharacterClick('alien');
        }
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min; 
}
