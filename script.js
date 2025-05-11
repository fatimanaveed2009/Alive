let score = 0;
let cross = true;

// Load audios
let music = new Audio('music.mp3');
let gameOverSound = new Audio('gameover.mp3');

// DOM references
const person = document.querySelector('.person');
const obstacle = document.querySelector('.obstacle');
const scoreBox = document.querySelector('.ScoreCount');
const gameOverText = document.querySelector('.gameOver');
const restartBtn = document.querySelector('.restartBtn');

let interval;

// Start background music on first interaction
function startGameMusic() {
    music.loop = true;
    music.play().catch((e) => console.log('Music autoplay blocked:', e));
    document.removeEventListener('keydown', startGameMusic);
    document.removeEventListener('touchstart', startGameMusic);
}
document.addEventListener('keydown', startGameMusic);
document.addEventListener('touchstart', startGameMusic);

// Start game
function startGame() {
    obstacle.classList.add('obstacleMove');
    gameOverText.style.visibility = 'hidden';
    restartBtn.style.display = 'none';
    score = 0;
    updateScore(score);
    cross = true;

    interval = setInterval(() => {
        let px = parseInt(window.getComputedStyle(person).left);
        let py = parseInt(window.getComputedStyle(person).top);

        let ox = parseInt(window.getComputedStyle(obstacle).left);
        let oy = parseInt(window.getComputedStyle(obstacle).top);

        let offsetX = Math.abs(px - ox);
        let offsetY = Math.abs(py - oy);

        if (offsetX < 120 && offsetY < 100) {
            gameOverText.style.visibility = 'visible';
            obstacle.classList.remove('obstacleMove');
            music.pause();
            gameOverSound.play();
            clearInterval(interval);
            restartBtn.style.display = 'block'; // show restart button
        } else if (offsetX < 150 && cross) {
            score++;
            updateScore(score);
            cross = false;
            setTimeout(() => {
                cross = true;
            }, 1000);
        }
    }, 100);
}

// Jump function
function jump() {
    if (!person.classList.contains('animatePerson')) {
        person.classList.add('animatePerson');
        setTimeout(() => {
            person.classList.remove('animatePerson');
        }, 700);
    }
}

// Key press
document.onkeydown = function (e) {
    if (e.key === "ArrowUp" || e.keyCode === 38) {
        jump();
    }
};

// Touch for mobile
document.addEventListener('touchstart', () => {
    jump();
});

// Update score
function updateScore(score) {
    scoreBox.innerHTML = "Your Score : " + score;
}

// Restart game on button click
restartBtn.addEventListener('click', () => {
    restartGame();
});

function restartGame() {
    gameOverText.style.visibility = 'hidden';
    restartBtn.style.display = 'none';
    obstacle.classList.remove('obstacleMove');
    obstacle.offsetHeight; // reflow to restart animation
    startGameMusic();
    startGame();
}

// Initial start on window load
window.onload = startGame;
