document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    const restartButton = document.getElementById('restart');
    
    // Game variables
    let currentPlayer = "X";
    let gameActive = true;
    let gameState = ["", "", "", "", "", "", "", "", ""];
    
    // Winning combinations (indexes of the gameState array)
    const winningConditions = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal from top-left
        [2, 4, 6]  // Diagonal from top-right
    ];

    // Cell click handler
    function handleCellClick(e) {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
        
        // Check if cell is already played or game is inactive
        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }
        
        // Update game state
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());
        
        // Check game result
        checkResult();
    }
    
    // Check for win or draw
    function checkResult() {
        let roundWon = false;
        
        // Check all winning combinations
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            const condition = gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
            
            if (condition) {
                roundWon = true;
                break;
            }
        }
        
        // Handle win
        if (roundWon) {
            statusText.textContent = `Player ${currentPlayer} has won!`;
            gameActive = false;
            statusText.classList.add('game-won');
            return;
        }
        
        // Handle draw
        if (!gameState.includes("")) {
            statusText.textContent = "Game ended in a draw!";
            gameActive = false;
            return;
        }
        
        // Continue game with next player
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
    
    // Restart game
    function restartGame() {
        currentPlayer = "X";
        gameActive = true;
        gameState = ["", "", "", "", "", "", "", "", ""];
        statusText.textContent = `Player ${currentPlayer}'s turn`;
        statusText.classList.remove('game-won');
        
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove('x');
            cell.classList.remove('o');
        });
    }
    
    // Event listeners
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
});