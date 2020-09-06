import Player from './Player.js'; 
import George from './George.js';

export default class Game {
    constructor(){
        this.player = new Player;
        this.time = 60;
        this.emenyNumer = 3;
        this.enemies;
        this.gameElement;
        this.width;
        this.height;
        this.gameStarted = false;
        //this.numberOfPlayers // TODO: multiplayer
    }

    initGame = function(time, enemyNumber, gameElement,numberOfPlayers){
        if(gameElement && gameElement.length != 0) {
            this.time = (time ? time : this.time);
            this.emenyNumer = (enemyNumber ? enemyNumber : this.enemyNumber);
            this.enemies = getEnemies(this.emenyNumer);
            this.gameElement = gameElement;
            initBackground(this.gameElement);
        }
    }
    
}

let initBackground = function(gameElement) {
        $('<div/>', {
            "id": 'game-background',
            "class": 'game-background'
        }).appendTo(gameElement); // add background div
        const el = document.querySelector("#game-background");
        el.addEventListener("mousemove", (e) => {
            el.style.backgroundPositionX = -e.offsetX + "px";
        });
}

let getEnemies = function (enemyNumber) {
    let newArray = [];
    for (let i=0 ; i<=enemyNumber ; i++) {
        if(i == enemyNumber) {
            return newArray;
        }
        let george = new George;
        newArray.push(george);
    }
};