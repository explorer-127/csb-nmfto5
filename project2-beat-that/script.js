// Global Variables
var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER";
var GAME_STATE_COMPARE_SCORES = "GAME_STATE_COMPARE_SCORES";
var gameState = GAME_STATE_DICE_ROLL;

var currentPlayer = 1;
var playerRolls = [0, 0];
var allPlayerScore = [0, 0];

// Helper Function
var rollDice = function () {
  console.log("Control flow: start of rollDice()");
  // Random decimal between 0 and 6
  var randomDecimal = Math.random() * 6;
  // Random integer from 1 to 6
  var randomInteger = Math.floor(randomDecimal) + 1;

  console.log("rollDice output, randomInteger: ", randomInteger);
  return randomInteger;
};

var rollDiceForPlayer = function () {
  console.log("Control flow: start of rollDiceForPlayer()");

  playerRolls[0] = rollDice();
  playerRolls[1] = rollDice();

  console.log("rollDiceforPlayer changes, playerRolls: ", playerRolls);
  return (
    "Welcome, Player " +
    currentPlayer +
    "<br><br>You rolled:<br>Dice 1: " +
    playerRolls[0] +
    " | Dice 2: " +
    playerRolls[1] +
    ". <br><br>Now, please input either 1 or 2 to choose the corresponding dice to be used as the first digit of your final value."
  );
};

var getPlayerScore = function (playerInput) {
  var playerScore;

  // input == 1
  if (playerInput == 1) {
    console.log("Control flow: input == 1");
    playerScore = Number(String(playerRolls[0]) + String(playerRolls[1]));
  }

  // input == 2
  if (playerInput == 2) {
    console.log("Control flow: input == 2");
    playerScore = Number(String(playerRolls[1]) + String(playerRolls[0]));
  }

  allPlayerScore[currentPlayer - 1] = playerScore;
  return "Your chosen value is: " + playerScore;
};

var comparePlayerScores = function () {
  var compareMessage =
    "Player 1 score: " +
    allPlayerScore[0] +
    "<br>Player 2 score: " +
    allPlayerScore[1];

  // player 1 wins
  if (allPlayerScore[0] > allPlayerScore[1]) {
    compareMessage = "<br><br>Player 1 wins!";
  }

  // player 2 wins
  else if (allPlayerScore[0] < allPlayerScore[1]) {
    compareMessage = "<br><br>Player 2 wins!";
  }
  //tie
  else {
    compareMessage = "<br><br>It's a tie!";
  }

  return compareMessage;
};

var resetGame = function () {
  currentPlayer = 1;
  gameState = GAME_STATE_DICE_ROLL;
  allPlayerScore = [0, 0];
};

var main = function (input) {
  var outputMessage = "Error";

  switch (gameState) {
    case GAME_STATE_DICE_ROLL:
      // Display dice rolled as output message
      outputMessage = rollDiceForPlayer();
      gameState = GAME_STATE_CHOOSE_DICE_ORDER;
      return outputMessage;

    case GAME_STATE_CHOOSE_DICE_ORDER:
      if (input == 1 || input == 2) {
        outputMessage = getPlayerScore(input);
        // if player 2 have not played (score == 0) change to player 2
        if (allPlayerScore[1] == 0) {
          currentPlayer = 2;
          gameState = GAME_STATE_DICE_ROLL;
        } else {
          gameState = GAME_STATE_COMPARE_SCORES;
        }
      } else {
        outputMessage =
          "Error! Please only input '1' or '2' to choose which dice to useas the first digit.<br><br> Your dice rolls are:<br>Dice 1: " +
          playerRolls[0] +
          " | Dice 2: " +
          playerRolls[1] +
          ".";
      }
      return outputMessage;

    case GAME_STATE_COMPARE_SCORES:
      outputMessage = comparePlayerScores();
      resetGame();
      return outputMessage;

    default:
      return outputMessage;
  }
};
