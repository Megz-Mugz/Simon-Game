var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;
var started = false;

$(document).keypress(function() {

  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }

})

$(".btn").click(function() {
  var userChosenColor = $(this).attr('id')
  userClickedPattern.push(userChosenColor)

  playsound(userChosenColor);
  animatePress(userChosenColor)

  checkAnswer(userClickedPattern.length - 1)
});


function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000);
    }
  } else {

    playsound("wrong")

    $("body").addClass('game-over')

    setTimeout(function() {
      $("body").removeClass('game-over')
    }, 200);

    $('h1').text("Game Over, Press Any Key to Restart")

    startOver()

  }
}

function nextSequence() {

  userClickedPattern = []
  level += 1;

  $('#level-title').text("Level " + level)

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour)

  // animates randomly chosen button
  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeIn(100);

  // plays the randomly chosen button's sound
  playsound(randomChosenColour);

}

function playsound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.muted = false;
  audio.play()
}

function animatePress(currentColor) {
  $(`.${currentColor}`).addClass("pressed")
  setTimeout(function() {
    $(`.${currentColor}`).removeClass("pressed")
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
