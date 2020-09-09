export default class George {
    constructor(){
        this.startXPosition = '-20%';
        this.startYPosition;
        this.endXPosition = '120%';
        this.endYPosition;
        this.killedYPosition;
        this.delayToSpawn;
        this.currentGeorge;
        this.points = 10;
        this.hitSound;
        this.soundSrc = './sounds/sound_0' + (Math.floor(Math.random() * 3) + 1) +'.wav'; //random sound out of 3
        this.parent;
    }

    initGeorge (parent) {
        this.parent = parent;
        this.startYPosition = Math.floor(Math.random() * (this.parent.gameElement.innerHeight()-50));// -50 is the height of the timer
        this.endYPosition = Math.floor(Math.random() * (this.parent.gameElement.innerHeight()-50));// -50 is the height of the timer
        this.delayToSpawn = Math.floor(Math.random() * (1000 * this.parent.emenyNumer));

        this.currentGeorge = $('<span/>', {
            "class": 'game-george',
        }).appendTo(this.parent.gameElement); // add timer span

        this.hitSound = document.createElement('audio');
        this.hitSound.autoplay = false;
        this.hitSound.src = this.soundSrc;

        this.currentGeorge.css("top",this.startYPosition);
        this.currentGeorge.css("right",this.startXPosition);
        this.killedYPosition = this.parent.gameElement.innerHeight()+this.currentGeorge.innerHeight();
        this.initAnimation();
        this.initClickEvent();
    }

    initAnimation () {
        let currentParent = this.parent;
        let currentThis = this;
        this.currentGeorge.delay(this.delayToSpawn).animate({
            top: this.endYPosition,
            right: this.endXPosition
          }, 5000, function(){
              if($(this) && $(this) != 'undefined' && currentParent.gameFinished == false) {
                $(this).stop().remove(); // kill george element in dom
                currentParent.getEnemies(1); // create another element
              }
          });      
    }

    initClickEvent () {
        let currentParent = this.parent;
        let currentThis = this;
        this.currentGeorge.on("click", function(e) {
            currentParent.score += currentThis.points;
            $(this).addClass('rotate');
            $('#game-score').text(currentParent.score);
            currentThis.hitSound.play();
            $(this).stop();
            $(this).animate({
                top: currentThis.killedYPosition,
                right: $(this).css('right'),
                deg: -480,
                },
                1000,
                function(){
                  if($(this) && $(this) != 'undefined' && currentParent.gameFinished == false) {
                    $(this).stop().remove(); // kill george element in dom
                    currentParent.getEnemies(1); // create another element
                  }
                
              });  
        })
    }

}
