class MemoryGame {
    constructor() {
        this.gameBoard = document.getElementById('game-board');
        this.timerElement = document.getElementById('timer');
        this.movesElement = document.getElementById('moves');
        this.matchesElement = document.getElementById('matches');
        this.restartBtn = document.getElementById('restart-btn');
        this.difficultySelect = document.getElementById('difficulty');
        this.themeBtn = document.getElementById('theme-btn');
        this.modal = document.getElementById('game-complete-modal');
        this.finalTimeElement = document.getElementById('final-time');
        this.finalMovesElement = document.getElementById('final-moves');
        this.playerNameInput = document.getElementById('player-name');
        this.saveScoreBtn = document.getElementById('save-score-btn');
        this.playAgainBtn = document.getElementById('play-again-btn');
        this.leaderboardList = document.getElementById('leaderboard-list');

        // Game state
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.startTime = null;
        this.timerInterval = null;
        this.gameActive = false;
        this.difficulty = 4;
        this.totalPairs = 8;
        
        // Store final game results for saving
        this.finalGameTime = '';
        this.finalGameMoves = 0;
        this.finalGameDifficulty = 4;

        // Card symbols for different difficulties
        this.symbols = {
            4: ['🐶', '🐱', '🐼', '🐵', '🦊', '🐸', '🐯', '🐨'],
            6: ['🐶', '🐱', '🐼', '🐵', '🦊', '🐸', '🐯', '🐨', '🐷', '🐮', '🐻', '🐰', '🦁', '🐺', '🐹', '🐭', '🦝', '🦔']
        };

        this.initializeGame();
        this.setupEventListeners();
        this.loadLeaderboard();
        this.loadTheme();
    }

    initializeGame() {
        this.difficulty = parseInt(this.difficultySelect.value);
        this.totalPairs = this.difficulty === 4 ? 8 : 18;
        this.gameBoard.className = `game-board grid-${this.difficulty}`;
        
        this.resetGameState();
        this.createCards();
        this.shuffleCards();
        this.renderCards();
        this.updateStats();
    }

    resetGameState() {
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.startTime = null;
        this.gameActive = false;
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        
        this.timerElement.textContent = '00:00';
    }

    createCards() {
        const symbols = this.symbols[this.difficulty];
        const cardSymbols = [];
        
        // Create pairs
        for (let i = 0; i < this.totalPairs; i++) {
            cardSymbols.push(symbols[i], symbols[i]);
        }
        
        // Shuffle the symbols first
        for (let i = cardSymbols.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cardSymbols[i], cardSymbols[j]] = [cardSymbols[j], cardSymbols[i]];
        }
        
        // Create card objects with consistent IDs
        this.cards = cardSymbols.map((symbol, index) => ({
            id: index,
            symbol: symbol,
            isFlipped: false,
            isMatched: false
        }));
    }

    shuffleCards() {
        // Cards are already shuffled in createCards, no need to shuffle again
        // This prevents ID mismatches
    }

    renderCards() {
        this.gameBoard.innerHTML = '';
        
        this.cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.dataset.cardId = card.id;
            
            cardElement.innerHTML = `
                <div class="card-face card-back">🧠</div>
                <div class="card-face card-front">${card.symbol}</div>
            `;
            
            cardElement.addEventListener('click', () => this.handleCardClick(card.id));
            this.gameBoard.appendChild(cardElement);
        });
    }

    handleCardClick(cardId) {
        const card = this.cards[cardId];
        const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
        
        // Ignore clicks on already flipped or matched cards
        if (card.isFlipped || card.isMatched || this.flippedCards.length >= 2) {
            return;
        }
        
        // Start timer on first move
        if (!this.gameActive) {
            this.startGame();
        }
        
        // Flip the card
        this.flipCard(card, cardElement);
        
        // Check for matches when 2 cards are flipped
        if (this.flippedCards.length === 2) {
            this.moves++;
            this.updateStats();
            this.checkForMatch();
        }
    }

    startGame() {
        this.gameActive = true;
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => this.updateTimer(), 1000);
    }

    flipCard(card, cardElement) {
        card.isFlipped = true;
        cardElement.classList.add('flipped');
        this.flippedCards.push({ card, element: cardElement });
    }

    checkForMatch() {
        const [first, second] = this.flippedCards;
        
        if (first.card.symbol === second.card.symbol) {
            // Match found
            setTimeout(() => {
                this.handleMatch(first, second);
            }, 500);
        } else {
            // No match
            setTimeout(() => {
                this.handleNoMatch(first, second);
            }, 1000);
        }
    }

    handleMatch(first, second) {
        first.card.isMatched = true;
        second.card.isMatched = true;
        first.element.classList.add('matched');
        second.element.classList.add('matched');
        
        this.matchedPairs++;
        this.flippedCards = [];
        this.updateStats();
        
        // Check if game is complete
        if (this.matchedPairs === this.totalPairs) {
            this.endGame();
        }
    }

    handleNoMatch(first, second) {
        // Add shake animation
        first.element.classList.add('shake');
        second.element.classList.add('shake');
        
        setTimeout(() => {
            first.card.isFlipped = false;
            second.card.isFlipped = false;
            first.element.classList.remove('flipped', 'shake');
            second.element.classList.remove('flipped', 'shake');
            this.flippedCards = [];
        }, 500);
    }

    updateTimer() {
        if (!this.startTime) return;
        
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
        const seconds = (elapsed % 60).toString().padStart(2, '0');
        this.timerElement.textContent = `${minutes}:${seconds}`;
    }

    updateStats() {
        this.movesElement.textContent = this.moves;
        this.matchesElement.textContent = `${this.matchedPairs}/${this.totalPairs}`;
    }

    endGame() {
        this.gameActive = false;
        clearInterval(this.timerInterval);
        
        // Store final game values before they get reset
        this.finalGameTime = this.timerElement.textContent;
        this.finalGameMoves = this.moves;
        this.finalGameDifficulty = this.difficulty;
        
        this.finalTimeElement.textContent = this.finalGameTime;
        this.finalMovesElement.textContent = this.finalGameMoves;
        
        // Automatically save score with default name, then show modal
        this.autoSaveScore();
        
        // Show completion modal
        setTimeout(() => {
            this.modal.classList.remove('hidden');
            this.playerNameInput.focus();
        }, 1000);
    }

    autoSaveScore() {
        // Automatically save score when game ends using stored final values
        const score = {
            name: 'Anonymous',
            time: this.finalGameTime,
            moves: this.finalGameMoves,
            difficulty: this.finalGameDifficulty,
            timestamp: Date.now(),
            isTemporary: true // Mark as temporary so it can be updated
        };
        
        let leaderboard = JSON.parse(localStorage.getItem('memoryGameLeaderboard') || '[]');
        
        // Remove any previous temporary score from this session
        leaderboard = leaderboard.filter(s => !s.isTemporary);
        
        leaderboard.push(score);
        
        // Sort by time (convert to seconds for comparison)
        leaderboard.sort((a, b) => {
            const timeA = this.timeToSeconds(a.time);
            const timeB = this.timeToSeconds(b.time);
            if (timeA !== timeB) return timeA - timeB;
            return a.moves - b.moves; // If time is same, sort by moves
        });
        
        // Keep only top 10 scores
        leaderboard = leaderboard.slice(0, 10);
        
        localStorage.setItem('memoryGameLeaderboard', JSON.stringify(leaderboard));
        this.loadLeaderboard();
    }

    saveScore() {
        const playerName = this.playerNameInput.value.trim() || 'Anonymous';
        
        let leaderboard = JSON.parse(localStorage.getItem('memoryGameLeaderboard') || '[]');
        
        // Find and remove the most recent temporary score (should be the current game)
        const tempScoreIndex = leaderboard.findIndex(s => s.isTemporary);
        
        if (tempScoreIndex !== -1) {
            // Remove the temporary score
            leaderboard.splice(tempScoreIndex, 1);
        }
        
        // Add the new score with the player's name using stored final values
        const score = {
            name: playerName,
            time: this.finalGameTime,
            moves: this.finalGameMoves,
            difficulty: this.finalGameDifficulty,
            timestamp: Date.now()
        };
        
        leaderboard.push(score);
        
        // Sort by time (convert to seconds for comparison)
        leaderboard.sort((a, b) => {
            const timeA = this.timeToSeconds(a.time);
            const timeB = this.timeToSeconds(b.time);
            if (timeA !== timeB) return timeA - timeB;
            return a.moves - b.moves; // If time is same, sort by moves
        });
        
        // Keep only top 10 scores
        leaderboard = leaderboard.slice(0, 10);
        
        localStorage.setItem('memoryGameLeaderboard', JSON.stringify(leaderboard));
        this.loadLeaderboard();
        
        this.modal.classList.add('hidden');
        this.playerNameInput.value = '';
    }

    timeToSeconds(timeString) {
        const [minutes, seconds] = timeString.split(':').map(Number);
        return minutes * 60 + seconds;
    }

    loadLeaderboard() {
        const leaderboard = JSON.parse(localStorage.getItem('memoryGameLeaderboard') || '[]');
        
        if (leaderboard.length === 0) {
            this.leaderboardList.innerHTML = '<p>No scores yet. Play to set a record!</p>';
            return;
        }
        
        const leaderboardHTML = leaderboard
            .slice(0, 5) // Show top 5
            .map((score, index) => {
                const rank = index + 1;
                const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `${rank}.`;
                const difficultyText = score.difficulty === 4 ? '4x4' : '6x6';
                
                return `
                    <div class="leaderboard-entry">
                        <span class="rank">${medal}</span>
                        <span class="name">${score.name}</span>
                        <div class="stats">
                            <span>⏱️ ${score.time}</span>
                            <span>🔄 ${score.moves}</span>
                            <span>📏 ${difficultyText}</span>
                        </div>
                    </div>
                `;
            })
            .join('');
        
        this.leaderboardList.innerHTML = leaderboardHTML;
    }

    setupEventListeners() {
        this.restartBtn.addEventListener('click', () => this.initializeGame());
        
        this.difficultySelect.addEventListener('change', () => this.initializeGame());
        
        this.themeBtn.addEventListener('click', () => this.toggleTheme());
        
        this.saveScoreBtn.addEventListener('click', () => this.saveScore());
        
        this.playAgainBtn.addEventListener('click', () => {
            this.modal.classList.add('hidden');
            this.playerNameInput.value = '';
            this.initializeGame();
        });
        
        // Allow Enter key to save score
        this.playerNameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.saveScore();
            }
        });
        
        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.modal.classList.add('hidden');
                this.playerNameInput.value = '';
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'r' || e.key === 'R') {
                this.initializeGame();
            }
            if (e.key === 't' || e.key === 'T') {
                this.toggleTheme();
            }
        });
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        this.themeBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        
        localStorage.setItem('memoryGameTheme', newTheme);
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('memoryGameTheme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.themeBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MemoryGame();
});

// Add some fun sound effects (optional - using Web Audio API)
class SoundEffects {
    constructor() {
        this.audioContext = null;
        this.initAudio();
    }

    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }

    playFlipSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    playMatchSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523, this.audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659, this.audioContext.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(784, this.audioContext.currentTime + 0.2); // G5
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.3);
    }

    playWinSound() {
        if (!this.audioContext) return;
        
        const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
        
        notes.forEach((freq, index) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime + index * 0.15);
            
            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime + index * 0.15);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + index * 0.15 + 0.2);
            
            oscillator.start(this.audioContext.currentTime + index * 0.15);
            oscillator.stop(this.audioContext.currentTime + index * 0.15 + 0.2);
        });
    }
}

// Initialize sound effects
const soundEffects = new SoundEffects();