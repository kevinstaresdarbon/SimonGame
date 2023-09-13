var buttonColours = ["red","blue","green","yellow"];
var gamePattern=[];

function nextSequence(){

    function getRandomNumber(min, max) {
        // Generate a random number between min (inclusive) and max (inclusive)
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      
      var randomNumber = getRandomNumber(0, 3);
      var randomChosenColour = buttonColours[randomNumber];

      return randomChosenColour;

}

function setSequence(){

    for (var i=0; i<5; i++){
        gamePattern[i] = nextSequence();
    }

}

function flashAnim(colour){
    $("."+ colour).fadeOut().fadeIn();
}

function makeSound(colour){
    var srcString = "sounds/" + colour + ".mp3"
    var sound = new Audio(srcString)
    sound.play();
}

    $(".btn").on("click", (event)=>{
            flashAnim(event.target.id);
            makeSound(event.target.id);
    });

function playSequence(){

    for (var i=0; i<gamePattern.length; i++){
       
        setTimeout((current)=>{
            flashAnim(current);
            makeSound(current);
        },1300*i, gamePattern[i] );
    }
}

setSequence();
playSequence();