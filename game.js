var buttonColor = ["red", "blue", "yellow", "green"];

var gamePattern = [];

var level = 0;
var userCntClick = 0;

$(document).keypress(function (e) {
    // Press SpaceBar And Level 1 will be start ;
    if (e.keyCode === 32 && level === 0) {
        nextSequence();
    }
});

// For Mobile or Ipad
$(".btn-start").click(function () {
    // Press SpaceBar And Level 1 will be start ;
    if(level === 0)
        nextSequence();

        $(".btn-start").hide();
});

// User Choose Color
$('.btn').click(function () {
    var userChoosenColor = this.id;
    animatePressed(userChoosenColor);
    playSound(userChoosenColor);
    checkAnswer(userChoosenColor, userCntClick, level);
});


function nextSequence() {
    // Random Color index [0-3]
    var randNumber = (Math.floor(Math.random() * 4));
    var randomChoosenColor = buttonColor[randNumber];

    $("." + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);

    gamePattern.push(buttonColor[randNumber]);
    level++;
    $("#level-title").text("Level " + level);
    userCntClick = 0;
}

// Check Color When User Clicked
function checkAnswer(userClicked, numClick, level) {

    if (userClicked == gamePattern[numClick]) {
        userCntClick++;
        if (numClick == level - 1) {
            setTimeout(function () {
                nextSequence();
            }, 700);
        }
    } else {
        gameOver();
    }

}

// Play Sound Animation
function playSound(color) {
    var audio = new Audio('sounds/' + color + '.mp3');
    audio.play();
}

// Animation when Pressed
function animatePressed(color) {
    $(".btn." + color).addClass("pressed")
    setTimeout(function () {
        $(".btn." + color).removeClass("pressed")
    }, 100);
}

// Show Game Over And Reset All Varible ;
function gameOver() {
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over")
    }, 200);
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    level = 0;
    userCntClick = 0;
    gamePattern = [];

    // For Mobile or Ipad
    $(".btn-start").html("Restart").show();
}
