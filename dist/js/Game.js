import Player from './Player.js'; 
import George from './George.js';

let timer;

export default class Game {
    constructor(){
        this.player = new Player;
        this.time = 30;
        this.emenyNumer = 3;
        this.gameElement;
        this.gameStarted = false;
        this.gameFinished = false;
        this.score = 0;
        //this.numberOfPlayers // TODO: multiplayer
    }

    initGame = function(time, enemyNumber, gameElement,numberOfPlayers){
        if(gameElement && gameElement.length != 0) {
            this.time = (time ? time : this.time);
            this.emenyNumer = (enemyNumber ? enemyNumber : this.enemyNumber);
            this.gameElement = gameElement;
            this.enemies = this.getEnemies(this.emenyNumer);
            this.initBackground(this.gameElement);
            this.initTimer();
        }
    }

    getEnemies = function (enemyNumber) {
        for (let i=0 ; i<=enemyNumber ; i++) {
            let george = new George;
            george.initGeorge(this);
        }
    };

    killAllEnemies = function () {
        $('.game-george').stop();
        console.log('kill all', $('.game-george').length);
        
    };

    initBackground = function(gameElement) {
        $('<div/>', {
            "id": 'game-background',
            "class": 'game-background'
        }).appendTo(gameElement); // add background div
        const el = document.querySelector("#game-background");
        el.addEventListener("mousemove", (e) => {
            el.style.backgroundPositionX = -e.offsetX + "px";
        });
    };

    initTimer = () => {
        this.gameStarted = true;
        $('<span/>', {
            "id": 'game-timer',
            "class": 'game-timer',
            "text": this.time
        }).appendTo(this.gameElement); // add timer span
        let intervalthis = this;
        timer = setInterval(function() {
            intervalthis.time = --intervalthis.time;
            $("#game-timer").text(intervalthis.time);
            if(intervalthis.time == 0) {
                intervalthis.gameStarted = false;
                intervalthis.gameFinished = true;
                intervalthis.killAllEnemies();
                clearInterval(timer);
            }
        }, 1000);
    }
    
}
