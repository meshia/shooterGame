import Player from './Player.js'; 
import George from './George.js';

let timer;

export default class Game {
    constructor(){
        this.player = new Player; // TODO: multiplayer
        this.time = 30;
        this.duration = this.time;
        this.emenyNumer = 3;
        this.gameElement;
        this.gameStarted = false;
        this.gameFinished = false;
        this.score = 0;
        this.phpUrl = "./api/";
        //this.numberOfPlayers // TODO: multiplayer
    }

    initGame = (time, enemyNumber, gameElement,numberOfPlayers) => {
        if(gameElement && gameElement.length != 0) {
            this.time = (time ? time : this.time);
            this.duration = this.time;
            this.emenyNumer = (enemyNumber ? enemyNumber : this.enemyNumber);
            this.gameElement = gameElement;
            this.initUi();
            this.initBackground(this.gameElement);
        }
    }
    initUi = () => {
        $('<div/>', {
            "id": 'game-ui',
            "class": 'game-ui'
        }).appendTo(this.gameElement); // add background div

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

        $('<span/>', {
            "id": 'game-player',
            "class": 'game-player',
        }).appendTo('#game-ui'); // add timer span

        this.initScore();
        this.initPlayerRegUi();
    }

    initPlayerRegUi = () => {
        $('<div/>', {
            "id": 'game-login',
            "class": 'game-login'
        }).appendTo(this.gameElement); // add login div

        $('<span/>', {
            "id": 'game-login-title',
            "class": 'game-login-title',
            "text": "Name?"
        }).appendTo('#game-login'); // add login title span

        $('<input/>', {
            "id": 'game-login-input',
            "class": 'game-login-input'
        }).appendTo('#game-login'); // add login input span

        $('<button/>', {
            "id": 'game-login-button',
            "class": 'game-login-button',
            "text": "START!"
        }).appendTo('#game-login'); // add login button span
        this.initWinnersTable();
        this.initPlayer();
    }

    initWinnersTable = () => {
        $('<ul/>', {
            "id": 'game-winners',
            "class": 'game-winners'
        }).appendTo(this.gameElement); // add winners table

        $.ajax({
            url: this.phpUrl + "getWinners.php",
            type: "GET",
            success: function(data) {
                let currentData = JSON.parse(data);
                $.each(currentData, function(key,value) {
                    $('<li/>', {
                        "class": 'game-winner',
                        "text" : value.Name + " | " + value.Score
                    }).appendTo('#game-winners'); // add winners table
                  });
            },
            error: function(e) {
                console.error(e);
            }
        });
    }

    initPlayer = () => {
        let currentThis = this;
        $('#game-login-button').on("click", function(){
            if($("#game-login-input").val().length > 0) {
                currentThis.player.name = $("#game-login-input").val();
                $('#game-player').text($("#game-login-input").val());
                $('#game-login-button').off();
                $('#game-login').remove();
                $('#game-winners').remove();
                currentThis.initTimer();
                currentThis.getEnemies(currentThis.emenyNumer);
            }
        });
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
        let intervalthis = this;
        timer = setInterval(function() {
            intervalthis.time = --intervalthis.time;
            $("#game-timer").text(intervalthis.time);
            if(intervalthis.time == 0) { // Game Over
                intervalthis.gameStarted = false;
                intervalthis.gameFinished = true;
                intervalthis.player.score = intervalthis.score;
                intervalthis.killAllEnemies();
                intervalthis.initRestartButton();
                intervalthis.sendPlayerScore();
                intervalthis.initWinnersTable();
                clearInterval(timer);
            }
        }, 1000);
    }

    sendPlayerScore = () => {
        $.ajax({
            url: this.phpUrl + "sendUserScore.php",
            type:"POST",
            data: {
                "name": this.player.name,
                "score": this.player.score
            },
            success: function(data) {
                console.log(data);
            },
            error: function(e) {
                console.error(e);
            }
        });
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
            $('#game-timer').text(currentThis.time);
            currentThis.score = 0; //reset score
            $('.game-score').text(currentThis.score); //reset score
            $('.game-george').remove(); //remove all enemies
            currentThis.gameStarted = true;
            currentThis.gameFinished = false;
            currentThis.initTimer();
            currentThis.getEnemies(currentThis.emenyNumer);
            $('#game-winners').remove();
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
