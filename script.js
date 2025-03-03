// Load sounds for the game
const hitSound = new Audio('./sounds/playerMove.mp3');
const standSound = new Audio('./sounds/playerStood.mp3');
const bustSound = new Audio('./sounds/playerBust.mp3');
const blackJackSound = new Audio('./sounds/playerBlackjack.mp3');
const newGameSound = new Audio('./sounds/newGame.mp3');
const vcInsufficient = new Audio('./sounds/insufficientVC.mp3');

// Get elements from the HTML
let dealerCards = document.getElementById('dealer-cards');
let dealerScore = document.getElementById('dealer-score');
let playerCards = document.getElementById('player-cards');
let playerScore = document.getElementById('player-score');
let hitBtn = document.getElementById('hit-button');
let standBtn = document.getElementById('stand-button');
let newGame = document.getElementById('new-game-button');
let credits = document.getElementById('credits');
let message = document.getElementById('message');

// Set up the card deck and game variables
let cardDeck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
let randomDealNum = [];
let playerVc = 1050;
let costVc = 150;
let totalScore = 0;
let gameActive = false;
standBtn.disabled = true;
let isProcessingNewGame = false;

// Load player's credits from local storage
function loadPlayerVc() {
    const savedVc = localStorage.getItem('playerVc');
    if (savedVc !== null) {
        playerVc = parseInt(savedVc, 10);
    }
    credits.innerHTML = `Credits: ${playerVc}VC`;
}

// Save player's credits to local storage
function savePlayerVc() {
    localStorage.setItem('playerVc', playerVc);
}

// Show the credits on the screen
loadPlayerVc();
credits.innerHTML = `Credits: ${playerVc}VC`;

// Set up variables for VC replenishment
let vcReplenishInterval = null;
const vcReplenishAmount = 50;
const vcReplenishTime = 5000;

// Start replenishing VC
function startVcReplenishment() {
    if (vcReplenishInterval !== null) {
        clearInterval(vcReplenishInterval);
    }

    vcReplenishInterval = setInterval(() => {
        if (playerVc < 1050) {
            playerVc += vcReplenishAmount;
            credits.innerHTML = `Credits: ${playerVc}VC`;
            savePlayerVc();

            if (playerVc >= costVc && newGame.disabled) {
                newGame.disabled = false;
                message.textContent = 'You now have enough credits to play!';
            }

            if (playerVc >= 1050) {
                clearInterval(vcReplenishInterval);
                vcReplenishInterval = null;
                message.textContent = 'Your credits are fully replenished!';
            } else {
                message.textContent = `Replenishing Credits Please Wait!`;
            }
        } else {
            clearInterval(vcReplenishInterval);
            vcReplenishInterval = null;
        }
    }, vcReplenishTime);
}

// Stop replenishing VC
function stopVcReplenishment() {
    if (vcReplenishInterval !== null) {
        clearInterval(vcReplenishInterval);
        vcReplenishInterval = null;
        message.textContent = 'Something went wrong!';
    }
}

// Start a new game when the button is clicked
newGame.addEventListener('click', () => {
    if (!isProcessingNewGame) {
        isProcessingNewGame = true;
        startNewGame();
    }
});

// Set up a new game
function startNewGame() {
    if (!gameActive) {
        gameActive = true;
        totalScore = 0;

        randomDealNum = cardDeck[Math.floor(Math.random() * cardDeck.length)];
        dealerCards.textContent = randomDealNum;

        playerCards.textContent = '';
        message.textContent = '';
        playerScore.textContent = 'Score: ' + totalScore;

        if (playerVc < costVc || playerVc === 0) {
            newGame.disabled = true;
            credits.innerHTML = `Credits: ${playerVc}VC`;
            message.textContent = 'Not Enough Credits! Game Over!';
            endGame();
            vcInsufficient.play();
            isProcessingNewGame = false;
            return;
        }

        playerVc -= costVc;
        credits.innerHTML = `Credits: ${playerVc}VC`;
        savePlayerVc();
        stopVcReplenishment();

        hitBtn.disabled = false;
        standBtn.disabled = false;
        newGame.disabled = true;

        newGameSound.play();
    }
}

// Handle the hit button click
hitBtn.addEventListener('click', () => {
    if (gameActive === true) {
        generate();
        totalScore += randomDealNum;
        playerCards.textContent += randomDealNum + ' ';
        playerScore.textContent = 'Score: ' + totalScore;
        gameChecker();
        hitSound.play();
    }
});

// Generate a new card
function generate() {
    if (gameActive === true) {
        randomDealNum = cardDeck[Math.floor(Math.random() * cardDeck.length)];
        dealerCards.textContent = randomDealNum + ' ';
    }
}

// Update the player's winnings
function updateWinnings(winnings) {
    playerVc += winnings;
    credits.innerHTML = `Credits: ${playerVc}VC`;
    savePlayerVc();
}

// Check the game status
function gameChecker() {
    if (totalScore === 21) {
        blackJackSound.play();
        message.innerHTML = `<p style="color: #2bff00; margin-top: -6px;" id="message">Blackjack! You Just Too Good!</p>`;
        incrementStat('blackjacksWon');
        incrementStat('totalVCWon', costVc * 2);
        updateWinnings(costVc * 2);
        endGame();
    } else if (totalScore > 21) {
        bustSound.play();
        message.innerHTML = `<p style="color: #ff0000; margin-top: -6px;" id="message">You Lost! What A Bust You Are!</p>`;
        incrementStat('timesBusted');
        incrementStat('totalVCLost', costVc);
        endGame();
    } else {
        standBtn.disabled = false;
    }
}

// Handle the stand button click
standBtn.addEventListener('click', () => {
    standBtn.disabled = true;
    message.textContent = 'You stood! Game Over Get out of here!';
    standSound.play();
    endGame();
});

// End the game
function endGame() {
    hitBtn.disabled = true;
    standBtn.disabled = true;
    gameActive = false;

    if (playerVc >= costVc) {
        newGame.disabled = false;
    } else if (playerVc < costVc) {
        newGame.disabled = true;
        message.textContent = 'Haha! Not Enough Credits!';
        startVcReplenishment();
    }

    isProcessingNewGame = false;
}
