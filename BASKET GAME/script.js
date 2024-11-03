// ------------------ Score and Game Variables -------------------
let score = 0; 
let gameInterval; 
let ironBallInterval; 

// ------------------ DOM Elements -------------------
const basket = document.getElementById('basket'); 
const star = document.getElementById('star'); 
const ironBall = document.getElementById('ironBall'); 
const scoreDisplay = document.getElementById('score'); 
const gameContainer = document.querySelector('.game-container'); 
const restartBtn = document.getElementById('restartBtn'); 

// ------------------ Event Listeners -------------------
document.addEventListener('mousemove', (event) => {
    const containerRect = gameContainer.getBoundingClientRect(); 
    const basketWidth = basket.offsetWidth; 
    let basketX = event.clientX - containerRect.left - (basketWidth / 2); 

    if (basketX < 0) basketX = 0; 
    if (basketX > containerRect.width - basketWidth) basketX = containerRect.width - basketWidth; 

    basket.style.left = `${basketX}px`; 
});

// ------------------ Theme Management -------------------
function updateTheme() {
    gameContainer.classList.remove('snow-theme', 'lava-theme', 'hell-theme'); 

    if (score >= 20) {
        document.body.style.background = "black"; 
        gameContainer.classList.add('hell-theme'); 
    } else if (score >= 10) {
        document.body.style.background = "linear-gradient(to top, #ADD8E6, #B0E0E6)"; 
        gameContainer.classList.add('snow-theme'); 
    } else if (score >= 5) {
        document.body.style.background = "linear-gradient(to top, #FFA500, #FF4500)"; 
        gameContainer.classList.add('lava-theme'); 
    } else {
        document.body.style.background = "linear-gradient(to top, #87CEEB, #1E90FF)"; 
    }
}

// ------------------ star Management -------------------
function dropStar() {
    star.style.left = `${Math.random() * (gameContainer.offsetWidth - 30)}px`; 
    star.style.top = '-30px'; 
    star.style.display = 'block'; 

    const dropInterval = setInterval(() => {
        const starRect = star.getBoundingClientRect(); 
        const basketRect = basket.getBoundingClientRect(); 

        if (starRect.top > gameContainer.offsetHeight) { 
            clearInterval(dropInterval); 
            star.style.display = 'none'; 
            gameOver(); 
        } else if (
            starRect.bottom >= basketRect.top && 
            starRect.right >= basketRect.left &&
            starRect.left <= basketRect.right
        ) {
            score++; 
            scoreDisplay.innerText = `Score: ${score}`; 
            updateTheme(); 
            animateBasket(); 
            clearInterval(dropInterval); 
            star.style.display = 'none'; 
        } else {
            star.style.top = `${starRect.top + 5}px`; 
        }
    }, 30); 
}

// ------------------ Iron Ball Management -------------------
function dropIronBall() {
    ironBall.style.left = `${Math.random() * (gameContainer.offsetWidth - 30)}px`; 
    ironBall.style.top = '-30px'; 
    ironBall.style.display = 'block'; 

    const dropInterval = setInterval(() => {
        const ironBallRect = ironBall.getBoundingClientRect(); 
        const basketRect = basket.getBoundingClientRect(); 

        if (ironBallRect.top > gameContainer.offsetHeight) { 
            clearInterval(dropInterval); 
            ironBall.style.display = 'none'; 
        } else if (
            ironBallRect.bottom >= basketRect.top && 
            ironBallRect.right >= basketRect.left &&
            ironBallRect.left <= basketRect.right
        ) {
            gameOver(); 
        } else {
            ironBall.style.top = `${ironBallRect.top + 5}px`; 
        }
    }, 30); 
}

// ------------------ Basket Animation -------------------
function animateBasket() {
    basket.style.transform = 'scale(1.1)'; 
    setTimeout(() => {
        basket.style.transform = 'scale(1)'; 
    }, 200); 
}

// ------------------ Game Control Functions -------------------
function startGame() {
    score = 0; 
    scoreDisplay.innerText = `Score: ${score}`; 
    restartBtn.style.display = 'none'; 
    updateTheme(); 
    gameInterval = setInterval(dropStar, 1000); 
    ironBallInterval = setInterval(dropIronBall, 2000); 
}

// ------------------ Game Over Function -------------------
function gameOver() {
    clearInterval(gameInterval); 
    clearInterval(ironBallInterval); 
    alert(`Game Over! Your score: ${score}`); 
    restartBtn.style.display = 'block'; 
    ironBall.style.display = 'none'; 
    star.style.display = 'none'; 
}

// ------------------ Restart Button Event -------------------
restartBtn.addEventListener('click', () => {
    startGame(); 
    restartBtn.style.display = 'none'; 
});

// ------------------ Game Initialization -------------------
startGame(); 
