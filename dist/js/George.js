export default class George {
    constructor(){
        this.startXPosition = '-15%';
        this.startYPosition;
        this.endXPosition = '115%';
        this.endYPosition;
        this.killedYPosition;
        this.lives;
        this.isDead;
        this.delayToSpawn;
        this.currentGeorge;
        this.parent;
    }

    initGeorge = function(parent) {
        this.parent = parent;
        this.startYPosition = Math.floor(Math.random() * (this.parent.gameElement.innerHeight()-50));// -50 is the height of the timer
        this.endYPosition = Math.floor(Math.random() * (this.parent.gameElement.innerHeight()-50));// -50 is the height of the timer
        this.delayToSpawn = Math.floor(Math.random() * (1000 * this.parent.emenyNumer));
        this.currentGeorge = $('<span/>', {
            "class": 'game-george',
        }).appendTo(this.parent.gameElement); // add timer span
        this.currentGeorge.css("top",this.startYPosition);
        this.currentGeorge.css("right",this.startXPosition);
        this.killedYPosition = this.parent.gameElement.innerHeight()+this.currentGeorge.innerHeight();
        this.initAnimation();
        this.initClickEvent();
    }

    initAnimation = function() {
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

    initClickEvent = function() {
        let currentParent = this.parent;
        let currentThis = this;
        this.currentGeorge.on("click", function(e) {
            $(this).stop();
            $(this).animate({
                top: currentThis.killedYPosition,
                right: $(this).css('right'),
                deg: 180
              }, 1000, function(){
                  if($(this) && $(this) != 'undefined' && currentParent.gameFinished == false) {
                    $(this).stop().remove(); // kill george element in dom
                    currentParent.getEnemies(1); // create another element
                  }
              });  
        })
    }

}
