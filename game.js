let gamePattern = new Array();
let userClickedPattern = new Array();
const buttonColors = ["red", "blue", "green", "yellow"];
let level = 0;
let clicks = 0;

startGame();
function startGame() {
  $(document).on("keypress", function () {
    if (level === 0) {
      nextSequence();
    }
  });
}

function gameOver() {
  $("#level-title").text("Game Over");
  playSound("wrong");
  gamePattern = [];
  userClickedPattern = [];
  clicks = 0;
  level = 0;
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
}

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  console.log(randomNumber);
  let color = buttonColors[randomNumber];
  playSound(color);
  flash("#" + color);
  console.log("Hi " + color);

  // let randomChosenColour = buttonColors[randomNumber];
  // console.log("Random chosen colour is: " + randomChosenColour);

  gamePattern.push(buttonColors[randomNumber]);
  console.log("Game Pattern: " + gamePattern);
  // return randomNumber;
  console.log("Game Pattern Length: " + gamePattern.length);
}

function checkAnswer() {
  let isNotOver = true;
  for (let i = 0; i < gamePattern.length; i++) {
    if (userClickedPattern[i] === gamePattern[i]) {
      isNotOver = true;
    } else {
      isNotOver = false;
    }
  }

  if (isNotOver) {
    setTimeout(() => {
      nextSequence();
    }, 1000);
  } else {
    gameOver();
    $(document).on("keypress", function () {
      startGame();
    });

    // gamePattern = [];
    // userClickedPattern = [];
    // clicks = 0;
    // level = 0;
  }
  userClickedPattern = [];
  clicks = 0;
}

$(".btn").on("click", function () {
  clicks++;
  flash(this);
  console.log("This: " + this.id);
  userClickedPattern.push(this.id);
  playSound(this.id);

  console.log("User Clicked: " + userClickedPattern);
  console.log("Clicks: " + clicks);
  console.log("Game Pattern Length: " + gamePattern.length);

  if (gamePattern[clicks - 1] !== userClickedPattern[clicks - 1]) {
    gameOver();
  } else if (clicks === gamePattern.length) {
    checkAnswer();
  }
});

// console.log("Selected sound is: " + selectedSound);

function flash(button) {
  $(button).addClass("pressed");
  setTimeout(() => {
    $(button).removeClass("pressed");
  }, 100);
}

function playSound(color) {
  // Play sound
  let audio = new Audio("./sounds/" + color + ".mp3");
  audio.play();
}
