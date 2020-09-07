import Player from './Player.js'; 
import George from './George.js';

let timer;

export default class Game {
    constructor(){
        this.player = new Player;
        this.time = 30;
        this.duration = this.time;
        this.emenyNumer = 3;
        this.gameElement;
        this.gameStarted = false;
        this.gameFinished = false;
        this.score = 0;
        //this.numberOfPlayers // TODO: multiplayer
    }

    initGame = (time, enemyNumber, gameElement,numberOfPlayers) => {
        if(gameElement && gameElement.length != 0) {
            this.time = (time ? time : this.time);
            this.duration = this.time;
            this.emenyNumer = (enemyNumber ? enemyNumber : this.enemyNumber);
            this.gameElement = gameElement;
            this.getEnemies(this.emenyNumer);

            $('<div/>', {
                "id": 'game-ui',
                "class": 'game-ui'
            }).appendTo(gameElement); // add background div

            this.initBackground(this.gameElement);
            this.initTimer();
            this.initScore();
        }
    }

    getEnemies = (enemyNumber) => {
        for (let i=1 ; i<=enemyNumber ; i++) {
            let george = new George;
            george.initGeorge(this);
        }
    };

    killAllEnemies = () => {
        $('.game-george').stop();
        $('.game-george').off();
        
    };

    initBackground = (gameElement) => {
        let currentThis = this;
        $('<div/>', {
            "id": 'game-background',
            "class": 'game-background'
        }).appendTo(gameElement); // add background div
        const el = document.querySelector("#game-background");
        el.addEventListener("mousemove", (e) => {
            if(currentThis.gameFinished === false) {
                el.style.backgroundPositionX = (e.offsetX + 600) + "px";
            }
        });
    };

    initTimer = () => {
        this.gameStarted = true;
        if($('#game-timer').length === 0) {
            $('<span/>', {
                "id": 'game-timer-title',
                "class": 'game-timer-title',
                "text": 'Time:'
            }).appendTo('#game-ui'); // add timer span
            $('<span/>', {
                "id": 'game-timer',
                "class": 'game-timer',
                "text": this.time
            }).appendTo('#game-ui'); // add timer span
        }
        let intervalthis = this;
        timer = setInterval(function() {
            intervalthis.time = --intervalthis.time;
            $("#game-timer").text(intervalthis.time);
            if(intervalthis.time == 0) { // Game Over
                intervalthis.gameStarted = false;
                intervalthis.gameFinished = true;
                intervalthis.killAllEnemies();
                intervalthis.initRestartButton();
                clearInterval(timer);
            }
        }, 1000);
    }

    initRestartButton = () => {
        let currentThis = this;
        $('<span/>', {
            "id": 'game-restart',
            "class": 'game-restart',
            "text": "Restart?"
        }).appendTo(this.gameElement); // add background div
        $("#game-restart").on("click", function(){
            currentThis.time = currentThis.duration; // reset time
            currentThis.score = 0; //reset score
            $('.game-score').text(currentThis.score); //reset score
            $('.game-george').remove(); //remove all enemies
            currentThis.gameStarted = true;
            currentThis.gameFinished = false;
            currentThis.initTimer();
            currentThis.getEnemies(currentThis.emenyNumer);
            $("#game-restart").off();
            $("#game-restart").remove();
        });
    }

    initScore = () => {
        $('<span/>', {
            "id": 'game-score-title',
            "class": 'game-score-title',
            "text": 'Score:'
        }).appendTo('#game-ui'); // add timer span
        $('<span/>', {
            "id": 'game-score',
            "class": 'game-score',
            "text": this.score
        }).appendTo('#game-ui'); // add timer span
    }
    
}
