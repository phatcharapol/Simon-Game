var buttonColor = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var randomChoosenColor = "";
var userClickedPattern = [];
var userChoosenColor = "";
var level = 0;
var i = 0 ;

$(document).keypress(function (e) {
    if (e.keyCode === 32 && level === 0) {
        nextSequence();
    }
});

$('.btn').click(function () {
    userChoosenColor = this.id;
    userClickedPattern.push(userChoosenColor);
    animatePressed(userChoosenColor);

    checkAnswer(userChoosenColor,i,level);
   
})


function nextSequence() {
    var randNumber = (Math.floor(Math.random() * 4));
    randomChoosenColor = buttonColor[randNumber];
    $("." + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);

    gamePattern.push(buttonColor[randNumber]);
    level++;
    $("#level-title").text("Level " + level);
    i=0;
  
}

function checkAnswer(userClicked,numClick,level) {
   
   
        if (userClicked == gamePattern[numClick]) {
            console.log("success");
            i=numClick++ ;
            if(numClick == level){
                nextSequence();
            }
        } else {
            console.log("wrong");
            gameOver();
        }
        console.log(userClicked + "---" + gamePattern[numClick]+"**"+gamePattern);
        console.log(numClick + "---" + level);
       
}

function playSound(color) {
    var audio = new Audio('sounds/' + color + '.mp3');
    audio.play();
}

function animatePressed(color) {
    $(".btn." + color).addClass("pressed")
    setTimeout(function () {
        $(".btn." + color).removeClass("pressed")
    }, 100);
}

function gameOver() {
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over")
    }, 100);
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    level = 0;
    i=0;
}
