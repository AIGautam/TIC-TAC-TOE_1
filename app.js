const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("statusText");
const resetButton = document.getElementById("resetButton");
const playerInputSection = document.querySelector(".player-input");
const gameArea = document.querySelector(".game-area");
const trophy = document.getElementById("trophy");
const winnerName = document.getElementById("winnerName");

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let player1Name = "";
let player2Name = "";
let running = false;

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function startGame() {
    player1Name = document.getElementById("player1").value || "Player X";
    player2Name = document.getElementById("player2").value || "Player O";
    currentPlayer = "X";
    running = true;
    playerInputSection.classList.add("hidden");
    gameArea.classList.remove("hidden");
    statusText.textContent = `${player1Name}'s turn`;
    initializeGame();
}

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
}

function cellClicked() {
    const cellIndex = this.getAttribute("data-index");

    if (options[cellIndex] !== "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer === "X" ? player1Name : player2Name}'s turn`;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }
        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        running = false;
        statusText.textContent = `${currentPlayer === "X" ? player1Name : player2Name} wins!`;
        showTrophy(currentPlayer === "X" ? player1Name : player2Name);
    } else if (!options.includes("")) {
        running = false;
        statusText.textContent = "It's a draw!";
    } else {
        changePlayer();
    }
}

function showTrophy(winner) {
    gameArea.classList.add("hidden");
    trophy.classList.remove("hidden");
    winnerName.textContent = `Congratulations ${winner}! 🏆`;
}

function resetGame() {
    options = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    running = true;
    gameArea.classList.remove("hidden");
    trophy.classList.add("hidden");
    statusText.textContent = `${currentPlayer === "X" ? player1Name : player2Name}'s turn`;
}

function restartGame() {
    options = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    running = false;
    currentPlayer = "X";
    playerInputSection.classList.remove("hidden");
    gameArea.classList.add("hidden");
    trophy.classList.add("hidden");
}
