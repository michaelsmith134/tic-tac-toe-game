// Game state
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// Winning combinations
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// DOM elements
const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('.cell');
const currentPlayerDisplay = document.getElementById('currentPlayer');
const winnerMessage = document.getElementById('winner');
const resetBtn = document.getElementById('resetBtn');

// Event listeners
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetBtn.addEventListener('click', resetGame);

// Handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    // Check if cell is already filled or game is over
    if (board[index] !== '' || !gameActive) {
        return;
    }

    // Update board and cell
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    // Check for winner or draw
    checkResult();
}

// Check game result
function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        if (board[a] === board[b] && board[b] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        winnerMessage.textContent = `🎉 Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    // Check for draw
    if (!board.includes('')) {
        winnerMessage.textContent = "🤝 It's a draw!";
        gameActive = false;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    currentPlayerDisplay.textContent = currentPlayer;
}

// Reset game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    winnerMessage.textContent = '';
    currentPlayerDisplay.textContent = currentPlayer;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
}
