import  'https://code.jquery.com/jquery-1.12.4.min.js';
import Game from './Game.js'; 

const $ = window.$;

$(function() {
    let newGame = new Game;
    newGame.initGame(60, 6, $('#game'));
});