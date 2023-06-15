var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern=[];
var level=0;

function nextSequence() {
  userClickedPattern=[];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  $("#" + randomChosenColour).click(playSound(randomChosenColour));

  $("h1").text(level);

  level=level+1;
}

$(".btn").on("click",function(){
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer((userClickedPattern.length)-1);
});


function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){$("#"+currentColour).removeClass("pressed");}, 100);
}

function checkAnswer(currentLevel){

  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");

    if(userClickedPattern.length === gamePattern.length){
      setTimeout(nextSequence,1000);
    }

  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");}, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
    $(document).one("keypress",nextSequence);
  }

}

function startOver(){
  level=0;
  gamePattern=[];

}

$(document).one("keypress",nextSequence);
