const cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let cardGrid = document.getElementById('card-grid');
let statusText = document.getElementById('status');
let restartButton = document.getElementById('restartButton');
let cards = [];
let flippedCards = [];
let matchedPairs = 0;

// Function to create a card element
function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.innerHTML = '?';
    card.addEventListener('click', flipCard);
    return card;
}

// Function to shuffle and setup the game
function setupGame() {
    cardGrid.innerHTML = '';
    matchedPairs = 0;
    flippedCards = [];
    statusText.textContent = '';
    const shuffledValues = shuffleArray(cardValues);
    shuffledValues.forEach(value => {
        const card = createCard(value);
        cardGrid.appendChild(card);
        cards.push(card);
    });
}

// Function to shuffle an array
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Function to flip the card
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.innerHTML = this.dataset.value;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

// Function to check if the flipped cards match
function checkMatch() {
    setTimeout(() => {
        const [firstCard, secondCard] = flippedCards;
        if (firstCard.dataset.value === secondCard.dataset.value) {
            matchedPairs++;
            statusText.textContent = `Matched! Total pairs: ${matchedPairs}`;
            if (matchedPairs === cardValues.length / 2) {
                statusText.textContent = 'Congratulations! You found all pairs!';
            }
        } else {
            firstCard.classList.remove('flipped');
            firstCard.innerHTML = '?';
            secondCard.classList.remove('flipped');
            secondCard.innerHTML = '?';
            statusText.textContent = 'Try again!';
        }
        flippedCards = [];
    }, 1000);
}

// Event listener for the restart button
restartButton.addEventListener('click', () => {
    cards = [];
    setupGame();
});

// Initialize the game
setupGame();
