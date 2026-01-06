let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer = 0;
let timerInterval;
let canFlip = false;
let maxMoves = 25;
let maxTime = 90;
let totalPairs = 8;

const emojis = ['🎮', '🎲', '🎯', '🎨', '🎭', '🎪', '🎸', '🎹', '🎺', '🎻', '🎤', '🎧', '🎬', '🎼', '🏀', '⚽', '🎾', '🏈', '⚾', '🏐'];

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

function selectOption(btn, group) {
    const buttons = btn.parentElement.querySelectorAll('.option-btn');
    buttons.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
}

function changeTheme(theme, btn) {
    document.body.className = theme;
    const buttons = btn.parentElement.querySelectorAll('.option-btn');
    buttons.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
}

function exitGame() {
    if (confirm('Are you sure you want to exit the game?')) {
        window.close();
        setTimeout(() => {
            alert('Thanks for playing! You can close this tab manually.');
        }, 100);
    }
}

function startGame() {
    const selectedDifficulty = document.querySelector('#difficultyPage .option-btn.selected');
    const difficulty = selectedDifficulty.dataset.difficulty;
    const pairs = parseInt(selectedDifficulty.dataset.pairs);
    const previewTime = parseInt(selectedDifficulty.dataset.preview);
    maxMoves = parseInt(selectedDifficulty.dataset.moves);
    maxTime = parseInt(selectedDifficulty.dataset.time);
    totalPairs = pairs;
    
    resetGame();
    document.getElementById('maxMoves').textContent = maxMoves;
    document.getElementById('maxTime').textContent = maxTime;
    
    setupGame(difficulty, pairs);
    showPage('gamePage');
    
    showPreview(previewTime);
}

function setupGame(difficulty, pairs) {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.className = `game-board ${difficulty}`;
    gameBoard.innerHTML = '';
    
    const selectedEmojis = emojis.slice(0, pairs);
    cards = [...selectedEmojis, ...selectedEmojis];
    shuffleArray(cards);
    
    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = index;
        card.dataset.emoji = emoji;
        card.innerHTML = `
            <div class="card-back"></div>
            <div class="card-front">${emoji}</div>
        `;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function showPreview(seconds) {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => card.classList.add('preview'));
    
    const previewMsg = document.getElementById('previewMessage');
    const previewCounter = document.getElementById('previewCounter');
    previewMsg.classList.add('show');
    previewCounter.textContent = seconds;
    
    let countdown = seconds;
    const countdownInterval = setInterval(() => {
        countdown--;
        previewCounter.textContent = countdown;
        
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            previewMsg.classList.remove('show');
            allCards.forEach(card => card.classList.remove('preview'));
            canFlip = true;
            startTimer();
        }
    }, 1000);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function flipCard() {
    if (!canFlip || this.classList.contains('flipped') || this.classList.contains('matched')) return;
    
    this.classList.add('flipped');
    flippedCards.push(this);
    
    if (flippedCards.length === 2) {
        canFlip = false;
        moves++;
        document.getElementById('moves').textContent = moves;
        updateStatColors();
        
        if (moves >= maxMoves) {
            setTimeout(() => gameLose('Out of moves!'), 600);
            return;
        }
        
        setTimeout(checkMatch, 600);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.emoji === card2.dataset.emoji) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        
        if (matchedPairs === totalPairs) {
            setTimeout(showWin, 500);
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }
    
    flippedCards = [];
    canFlip = true;
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer++;
        document.getElementById('timer').textContent = timer;
        updateStatColors();
        
        if (timer >= maxTime) {
            gameLose('Time\'s up!');
        }
    }, 1000);
}

function updateStatColors() {
    const movesContainer = document.getElementById('movesContainer');
    const timerContainer = document.getElementById('timerContainer');
    
    movesContainer.classList.remove('warning', 'danger');
    timerContainer.classList.remove('warning', 'danger');
    
    if (moves >= maxMoves * 0.8) {
        movesContainer.classList.add('danger');
    } else if (moves >= maxMoves * 0.6) {
        movesContainer.classList.add('warning');
    }
    
    if (timer >= maxTime * 0.8) {
        timerContainer.classList.add('danger');
    } else if (timer >= maxTime * 0.6) {
        timerContainer.classList.add('warning');
    }
}

function resetGame() {
    clearInterval(timerInterval);
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    timer = 0;
    canFlip = false;
    document.getElementById('moves').textContent = '0';
    document.getElementById('timer').textContent = '0';
    document.getElementById('movesContainer').classList.remove('warning', 'danger');
    document.getElementById('timerContainer').classList.remove('warning', 'danger');
}

function showWin() {
    clearInterval(timerInterval);
    canFlip = false;
    document.getElementById('finalMoves').textContent = moves;
    document.getElementById('finalTime').textContent = timer;
    document.getElementById('winMessage').classList.add('show');
}

function hideWin() {
    document.getElementById('winMessage').classList.remove('show');
}

function gameLose(reason) {
    clearInterval(timerInterval);
    canFlip = false;
    document.getElementById('loseReason').textContent = reason;
    document.getElementById('loseMessage').classList.add('show');
}

function hideLose() {
    document.getElementById('loseMessage').classList.remove('show');
}