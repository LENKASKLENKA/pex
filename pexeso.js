class MemoryGame {
    constructor(playerName) {
        this.playerName = playerName;
        this.matchedPairs = 0;
        this.flippedCards = [];
        this.totalPairs = 0;
        this.gameStartTime = null;
        this.timerInterval = null;
        this.images = ['Obr/09.jpg', 'Obr/10.jpg', 'Obr/11.jpg','Obr/11.jpg','Obr/04.jpg','Obr/05.jpg','Obr/06.jpg','Obr/07.jpg','Obr/08.jpg']  }

    startGame() {
        if (!this.playerName) {
            alert('Prosím, zadejte své jméno!');
            return;
        }
        document.getElementById('menu').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        this.restartGame();
    }

    restartGame() {
        this.matchedPairs = 0;
        this.flippedCards = [];
        document.getElementById('score').textContent = 0;
        document.getElementById('time').textContent = 'Čas: 0:00';
        
        const gameBoard = document.getElementById('board');
        gameBoard.innerHTML = '';
        
        const cards = [...this.images, ...this.images];
        cards.sort(() => Math.random() - 0.5);
        this.totalPairs = cards.length / 2;
        
        cards.forEach(image => gameBoard.appendChild(this.createCard(image)));
        
        this.gameStartTime = Date.now();
        this.startTimer();
        
        document.getElementById('gameOver').style.display = 'none';
        document.getElementById('restart').style.display = 'none';
    }

    startTimer() {
        clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => {
            const elapsedTime = Math.floor((Date.now() - this.gameStartTime) / 1000);
            const minutes = Math.floor(elapsedTime / 60);
            const seconds = elapsedTime % 60;
            document.getElementById('time').textContent = `Čas: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }, 1000);
    }

    createCard(imageSrc) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        
        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        const frontImage = document.createElement('img');
        frontImage.src = imageSrc;
        cardFront.appendChild(frontImage);
        
        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        const backImage = document.createElement('img');
        backImage.src = 'Obr/rub.png';
        cardBack.appendChild(backImage);
        
        cardElement.appendChild(cardFront);
        cardElement.appendChild(cardBack);
        cardElement.addEventListener('click', () => this.flipCard(cardElement));
        
        return cardElement;
    }

    flipCard(cardElement) {
        if (this.flippedCards.length === 2 || cardElement.classList.contains('flipped')) return;
        
        cardElement.classList.add('flipped');
        this.flippedCards.push(cardElement);
        
        if (this.flippedCards.length === 2) {
            this.checkMatch();
        }
    }

    checkMatch() {
        const [firstCard, secondCard] = this.flippedCards;
        if (firstCard.querySelector('.card-front img').src === secondCard.querySelector('.card-front img').src) {
            this.matchedPairs++;
            document.getElementById('score').textContent = this.matchedPairs;
            this.flippedCards = [];
            if (this.matchedPairs === this.totalPairs) {
                this.gameOver();
            }
        } else {
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                this.flippedCards = [];
            }, 1000);
        }
    }

    gameOver() {
        clearInterval(this.timerInterval);
        const gameTime = (Date.now() - this.gameStartTime) / 1000;
        const gameDate = new Date().toLocaleString();
        document.getElementById('gameOver').style.display = 'block';
        document.getElementById('restart').style.display = 'inline-block';
        
        const results = JSON.parse(localStorage.getItem('results')) || [];
        results.push({ name: this.playerName, time: gameTime, date: gameDate });
        results.sort((a, b) => a.time - b.time);
        localStorage.setItem('results', JSON.stringify(results));
        
        this.displayResults();
    }

    displayResults() {
        const results = JSON.parse(localStorage.getItem('results')) || [];
        const resultsTable = document.getElementById('results');
        resultsTable.innerHTML = '';
        
        const topResults = results.slice(0, 3);
        const fragment = document.createDocumentFragment();
        
        topResults.forEach(result => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${result.name}</td><td>${result.time.toFixed(2)} s</td><td>${result.date}</td>`;
            fragment.appendChild(row);
        });
        
        resultsTable.appendChild(fragment);
    }
}

// Spuštění hry
let game;
document.getElementById('startGameBtn').addEventListener('click', () => {
    const playerName = document.getElementById('playerName').value.trim();
    game = new MemoryGame(playerName);
    game.startGame();
});

document.getElementById('restart').addEventListener('click', () => {
    game.restartGame();
});

document.getElementById('clearResultsBtn').addEventListener('click', () => {
    localStorage.removeItem('results');
    if (game) {
        game.displayResults();
    } else {
        const tempGame = new MemoryGame('');
        tempGame.displayResults();
    }
});

window.onload = function () {
    if (document.getElementById('results')) {
        const tempGame = new MemoryGame('');
        tempGame.displayResults();
    }
};
