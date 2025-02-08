document.getElementById('startGameBtn').addEventListener('click', startGame);
document.getElementById('playAgainBtn').addEventListener('click', resetGame);

let playerName = '';
let gameStartTime;
let flippedCards = [];
let matchedPairs = 0;
const totalPairs = 8;

const imageFiles = [
    '01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg'
];

function startGame() {
    playerName = document.getElementById('playerName').value.trim();
    if (playerName === '') {
        alert('Prosím, zadejte své jméno!');
        return;
    }
    document.getElementById('playerDisplay').textContent = `Hráč: ${playerName}`;
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');
    initializeGameBoard();
    gameStartTime = Date.now();
    document.getElementById('time').textContent = `Čas: 0:00`;
}

function gameOver() {
    const gameTime = (Date.now() - gameStartTime) / 1000;
    document.getElementById('finalPlayerName').textContent = `Hráč: ${playerName}`;
    document.getElementById('game').classList.add('hidden');
    document.getElementById('gameOver').classList.remove('hidden');

    const results = JSON.parse(localStorage.getItem('results')) || [];
    const currentDate = new Date().toLocaleString();
    results.push({ name: playerName, time: gameTime, date: currentDate });
    results.sort((a, b) => a.time - b.time);
    localStorage.setItem('results', JSON.stringify(results));

    displayResults();
}

function resetGame() {
    document.getElementById('menu').classList.remove('hidden');
    document.getElementById('gameOver').classList.add('hidden');
    document.getElementById('playerName').value = '';
    document.getElementById('playerDisplay').textContent = '';
    document.getElementById('finalPlayerName').textContent = '';
    flippedCards = [];
    matchedPairs = 0;
    document.getElementById('time').textContent = `Čas: 0:00`;
}

function initializeGameBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    const cards = generateCards();
    cards.forEach(card => {
        board.appendChild(card);
    });
}

function generateCards() {
    const cardValues = imageFiles.slice(0, Math.min(totalPairs, imageFiles.length)).map(file => `Obr/${file}`);
    const cards = [];
    cardValues.forEach(value => {
        const card1 = createCard(value);
        const card2 = createCard(value);
        cards.push(card1, card2);
    });
    return shuffle(cards);
}

function createCard(imageSrc) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    const backImage = document.createElement('img');
    backImage.src = 'rub.png';
    cardBack.appendChild(backImage);

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    const frontImage = document.createElement('img');
    frontImage.src = imageSrc;
    cardFront.appendChild(frontImage);

    cardInner.appendChild(cardBack);
    cardInner.appendChild(cardFront);
    cardElement.appendChild(cardInner);

    cardElement.addEventListener('click', () => flipCard(cardElement));

    return cardElement;
}

function flipCard(cardElement) {
    if (flippedCards.length === 2 || cardElement.querySelector('.card-inner').classList.contains('flipped')) return;

    cardElement.querySelector('.card-inner').classList.add('flipped');
    flippedCards.push(cardElement);

    if (flippedCards.length === 2) {
        const [firstCard, secondCard] = flippedCards;

        if (firstCard.querySelector('.card-front img').src === secondCard.querySelector('.card-front img').src) {
            matchedPairs++;
            document.getElementById('score').textContent = `Skóre: ${matchedPairs}`;
            flippedCards = [];
            if (matchedPairs === totalPairs) {
                gameOver();
            }
        } else {
            setTimeout(() => {
                firstCard.querySelector('.card-inner').classList.remove('flipped');
                secondCard.querySelector('.card-inner').classList.remove('flipped');
                flippedCards = [];
            }, 1000);
        }
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function displayResults() {
    const results = JSON.parse(localStorage.getItem('results')) || [];
    const resultsTable = document.getElementById('results');
    resultsTable.innerHTML = '';

    const topResults = results.slice(0, 3);
    const fragment = document.createDocumentFragment();

    topResults.forEach(result => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const timeCell = document.createElement('td');
        const dateCell = document.createElement('td');

        nameCell.textContent = result.name;
        const time = parseFloat(result.time);
        timeCell.textContent = isNaN(time) ? 'Neplatný čas' : time.toFixed(2) + ' s';
        dateCell.textContent = result.date;

        row.appendChild(nameCell);
        row.appendChild(timeCell);
        row.appendChild(dateCell);

        fragment.appendChild(row);
    });

    resultsTable.appendChild(fragment);
}

window.onload = function () {
    displayResults();
};
