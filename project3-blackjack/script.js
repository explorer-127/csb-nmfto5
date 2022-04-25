// Declare Game modes
var GAME_START = "game start";
var GAME_CARDS_DRAWN = "cards are drawn";
var GAME_RESULTS_SHOWN = "results are shown";
var GAME_HIT_OR_STAND = "hit or stand";
var currentGameMode = GAME_START;

// Declare variable to store player and dealer hands
// We use arrays as each hand will be holding multiple card objects
var playerHand = [];
var dealerHand = [];

// Declare an empty variable to hold deck of cards
var gameDeck = [];

// Function that creates a deck of cards
var createDeck = function () {
  // Deck arrary
  var deck = [];
  // Use While loop to create suits for cards
  var suits = ["Diamonds", "Clubs", "Hearts", "Spades"];
  var indexSuits = 0;
  while (indexSuits < suits.length) {
    var currSuit = suits[indexSuits];
    // 13 ranks from Ace to King
    var indexRanks = 1;
    while (indexRanks <= 13) {
      var cardName = indexRanks;
      // Define card value
      if (cardName == 1) {
        cardName = "ace";
      }
      if (cardName == 11) {
        cardName = "jack";
      }
      if (cardName == 12) {
        cardName = "queen";
      }
      if (cardName == 13) {
        cardName = "king";
      }
      var card = {
        name: cardName,
        suit: currSuit,
        rank: indexRanks
      };
      deck.push(card);
      indexRanks = indexRanks + 1;
    }
    indexSuits = indexSuits + 1;
  }
  return deck;
};

// Generates a random number
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

// Shuffles a deck
var shuffleDeck = function (cards) {
  var index = 0;
  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var currentItem = cards[index];
    var randomItem = cards[randomIndex];
    cards[index] = randomItem;
    index = index + 1;
  }
  return cards;
};

// Creates and shuffles a deck
var createNewDeck = function () {
  var newDeck = createDeck();
  var shuffledDeck = shuffleDeck(newDeck);
  return shuffledDeck;
};

// Checks a hand for blackjack
var checkForBlackJack = function (handArray) {
  // Loop through player hand, if there is blackjack return true, else false
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackJack = false;

  // Possible blackjack scenarios
  // First card is Ace + second card is > 10
  // Second card is Ace + first card is > 10
  if (
    (playerCardOne.name == "ace" && playerCardTwo.name >= 10) ||
    (playerCardTwo.name == "ace" && playerCardOne >= 10)
  ) {
    isBlackJack = true;
  }
  return isBlackJack;
};

// Calculates a hand
var calculateTotalHandValue = function (handArray) {
  var totalHandValue = 0;
  // Counter to keep track of number of aces within given hand
  var aceCounter = 0;

  // Loop through player or dealer hand and add up the ranks
  var index = 0;
  while (index < handArray.length) {
    var currCard = handArray[index];

    // In blackjack, the value of king, queen and jack as 10 by default
    if (
      currCard.name == "king" ||
      currCard.name == "queen" ||
      currCard.name == "jack"
    ) {
      totalHandValue = totalHandValue + 10;
    }
    // Ace by default as 11
    else if (currCard.name == "ace") {
      totalHandValue = totalHandValue + 11;
      aceCounter = aceCounter + 1;
    }
    // Else, all other numbered cards are valued by their ranks
    else {
      totalHandValue = totalHandValue + currCard.rank;
    }
    index = index + 1;
  }

  // Reset index for ace counter
  index = 0;
  // Loop for the number of aces found and only deduct 10 from total hand value
  // when totalHandValue is more than 21
  while (index < aceCounter) {
    if (totalHandValue > 21) {
      totalHandValue = totalHandValue - 10;
    }
    index = index + 1;
  }

  return totalHandValue;
};

var displayPlayerAndDealerHands = function (playerHandArray, dealerHandArray) {
  var playerMessage = "Player hand:<br>";
  var index = 0;
  while (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      "- " +
      playerHandArray[index].name +
      " of " +
      playerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }

  index = 0;
  var dealerMessage = "Dealer hand:<br>";
  while (index < dealerHandArray.length) {
    dealerMessage =
      dealerMessage +
      "- " +
      dealerHandArray[index].name +
      " of " +
      dealerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }

  return playerMessage + "<br>" + dealerMessage;
};

// Displays total hand values of player and dealer in message
var displayHandTotalValues = function (playerHandValue, dealerHandValue) {
  var totalHandValueMessage =
    "<br>Player total hand value: " +
    playerHandValue +
    "<br>Dealer total hand value: " +
    dealerHandValue;
  return totalHandValueMessage;
};

var startGame = function () {
  var outputMessage = "";
  // create a deck of cards
  gameDeck = createNewDeck();

  // deal 2 cards to player and dealer
  playerHand.push(gameDeck.pop());
  playerHand.push(gameDeck.pop());
  dealerHand.push(gameDeck.pop());
  dealerHand.push(gameDeck.pop());

  // check player and dealer cards
  console.log("Player Hand ==>");
  console.log(playerHand);
  console.log("Dealer Hand ==>");
  console.log(dealerHand);

  // update gameMode
  currentGameMode = GAME_CARDS_DRAWN;

  // reassign output message
  outputMessage =
    "Everyone has been dealt a card. Click button to calculate cards!";

  // return message
  return outputMessage;
};

var main = function (input) {
  var outputMessage = "";

  // FIRST CLICK
  if (currentGameMode == GAME_START) {
    outputMessage = startGame();
  }

  // SECOND CLICK
  if (currentGameMode == GAME_CARDS_DRAWN) {
    // check for blackjack
    var playerHasBlackJack = checkForBlackJack(playerHand);
    var dealerHasBlackJack = checkForBlackJack(dealerHand);

    console.log("Does Player have Black Jack? ==>", playerHasBlackJack);
    console.log("Does Dealer have Black Jack? ==>", dealerHasBlackJack);

    // Condition when either player or dealer has black jack
    if (playerHasBlackJack == true || dealerHasBlackJack == true) {
      // Condition where both have black jack
      if (playerHasBlackJack == true && dealerHasBlackJack == true) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Its a Black Jack Tie!";
      }
      // Condition when only player has black jack
      else if (playerHasBlackJack == true && dealerHasBlackJack == false) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Player wins by Black Jack!";
      }
      // Condition when only dealer has black jack
      else {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Dealer wins by Black Jack!";
      }
    }

    // Condition where neither player nor dealer has black jack
    // ask player to input 'hit' or 'stand'
    else {
      outputMessage =
        displayPlayerAndDealerHands(playerHand, dealerHand) +
        '<br> There are no Black Jacks. <br>Please input "hit" or "stand".';

      // update gameMode
      currentGameMode = GAME_HIT_OR_STAND;
    }

    // return message
    return outputMessage;
  }

  // THIRD CLICK
  if (currentGameMode == GAME_HIT_OR_STAND) {
    // Condition where player inputs 'hit'
    if (input == "hit") {
      playerHand.push(gameDeck.pop());
      outputMessage =
        displayPlayerAndDealerHands(playerHand, dealerHand) +
        '<br> You drew another card. <br>Please input "hit" or "stand".';
    }

    // Condition where player inputs 'stand'
    else if (input == "stand") {
      // Calculate hands
      var playerHandTotalValue = calculateTotalHandValue(playerHand);
      var dealerHandTotalValue = calculateTotalHandValue(dealerHand);

      // Dealer's hit or stand logic
      while (dealerHandTotalValue < 17) {
        dealerHand.push(gameDeck.pop());
        dealerHandTotalValue = calculateTotalHandValue(dealerHand);
      }

      // Conditions for tied game
      if (
        playerHandTotalValue == dealerHandTotalValue ||
        (playerHandTotalValue > 21 && dealerHandTotalValue > 21)
      ) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Its a Tie!" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      }

      // Conditions for player win
      else if (
        (playerHandTotalValue > dealerHandTotalValue &&
          playerHandTotalValue <= 21) ||
        (playerHandTotalValue <= 21 && dealerHandTotalValue > 21)
      ) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Player wins!" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      }

      // Dealer wins when above two conditions are not met
      else {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Dealer wins!" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      }
      // update game mode - GAME_RESULTS_SHOWN is not used in this base example
      // However, you may wish to implement your own game modes for further functionality
      // i.e. going back to GAME_START to loop the game
      playerHand = [];
      dealerHand = [];
      gameDeck = [];
      currentGameMode = GAME_START;
    }
    // Input validation when player inputs anything outside of 'hit' or 'stand'
    else {
      outputMessage =
        'wrong input... only "hit" or "stand" are valid.<br><br>' +
        displayPlayerAndDealerHands(playerHand, dealerHand);
    }

    // return output message
    return outputMessage;
  }
};
