var buttonColours = ["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var inProgress = false;
var isPlaySeq = false;
var level = 0;

function getRandomNumber(min, max) {
    // Generate a random number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

function nextColour(){
    var randomNumber = getRandomNumber(0, 3);
    var randomChosenColour = buttonColours[randomNumber];
    return randomChosenColour;
}
  
function nextSequence(){

level++
userClickedPattern=[];

$("#level-title").text("Level: " + level);

gamePattern.push(nextColour());

playSequence();

}

function flashAnim(colour){
    $("."+ colour).fadeOut().fadeIn();
}

function makeSound(colour){
    var srcString = "sounds/" + colour + ".mp3"
    var sound = new Audio(srcString)
    sound.play();
}

function reset(){

    level = 0;
    $("#level-title").text("Game Over! Press Any Key to Restart");
    inProgress=false;
    userClickedPattern=[];
    gamePattern=[];
}

function screenFlash(){
    $("body").addClass("game-over");  
    setTimeout(()=>{
        $("body").removeClass("game-over");  
    }, 200);
    setTimeout(()=>{
        $("body").addClass("game-over");  
    }, 400);
    setTimeout(()=>{
        $("body").removeClass("game-over");  
    }, 700);

}

function checkPattern(){

    var currentIndex = userClickedPattern.length-1;
    if(userClickedPattern[currentIndex]  !== gamePattern[currentIndex]){
        var blooper = new Audio("sounds/wrong.mp3");
        blooper.play()
        screenFlash();
        setTimeout((current) => {    //double flash the correct response for feedback
            flashAnim(current)
        },700,gamePattern[currentIndex] );
        setTimeout((current) => {
            flashAnim(current)
        },1300,gamePattern[currentIndex] );

        reset();  
    }
    else if (userClickedPattern[currentIndex]  === gamePattern[currentIndex]){
        if (currentIndex === gamePattern.length - 1){
            setTimeout(nextSequence, 1600);
        }
    }
}

function handleClick(colour){
    
    if (isPlaySeq===false){
        flashAnim(colour);
        makeSound(colour);

        if(inProgress === true){
            userClickedPattern.push(colour);
            checkPattern();
        }
    }
}

$(".btn").on("click", (event)=>{
       
        handleClick(event.target.id);
});

$(document).on("keydown", () => {

    if (inProgress === false){
        inProgress = true;

        var displayString = "Level: "+ level;
        $("#level-title").text(displayString);
        nextSequence(level);
    }
})

function playSequence(){

    isPlaySeq = true;

    for (var i=0; i<gamePattern.length; i++){
       
        setTimeout((current)=>{
            flashAnim(current);
            makeSound(current);
            if (i === gamePattern.length - 1) isPlaySeq = false;
        },900*i, gamePattern[i] );
    }
};