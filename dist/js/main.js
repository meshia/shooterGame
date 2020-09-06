import  'https://code.jquery.com/jquery-1.12.4.min.js';
import Game from './Game.js'; 

const $ = window.$;

$(function() {
    console.log( "ready!" );
    let newGame = new Game;
    console.log( "newGame",newGame );
    newGame.initGame(60, 6, $('#game'));
});