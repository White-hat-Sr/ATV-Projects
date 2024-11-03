let randomNumber;
let attempts = 0;

const guessInput = document.getElementById('guessInput');
const submitGuessButton = document.getElementById('submitGuess');
const resultDiv = document.getElementById('result');
const restartButton = document.getElementById('restartButton');

// Function to start a new game
function startGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    resultDiv.textContent = '';
    guessInput.value = '';
    guessInput.disabled = false;
    submitGuessButton.disabled = false;
    restartButton.style.display = 'none';
}

// Function to check the player's guess
function checkGuess() {
    const userGuess = parseInt(guessInput.value);
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        resultDiv.textContent = 'Please enter a valid number between 1 and 100.';
        return;
    }
    attempts++;

    if (userGuess === randomNumber) {
        resultDiv.textContent = `Correct! The number was ${randomNumber}. It took you ${attempts} attempts.`;
        guessInput.disabled = true;
        submitGuessButton.disabled = true;
        restartButton.style.display = 'inline-block';
    } else if (userGuess < randomNumber) {
        resultDiv.textContent = 'Too low! Try again.';
    } else if (userGuess > randomNumber) {
        resultDiv.textContent = 'Too high! Try again.';
    }
}

// Event listeners
submitGuessButton.addEventListener('click', checkGuess);
restartButton.addEventListener('click', startGame);
guessInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

// Start the game when the page loads
startGame();
