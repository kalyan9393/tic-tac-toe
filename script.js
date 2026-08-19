const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

const scoreXElement = document.getElementById("scoreX");
const scoreOElement = document.getElementById("scoreO");

let board = ["", "", "", "", "", "", "", "",];

let currentPlayer = "X";
let gameActive = true;

let scoreX = 0;
let scoreO = 0;

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

restartBtn.addEventListener("click", restartGame);


function handleCellClick(event) {

    const cell = event.target;
    const index = cell.dataset.index;

    // Don't allow moves after game ends
    if (!gameActive || board[index] !== "") {
        return;
    }

    board[index] = currentPlayer;

    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    checkGame();
}


function checkGame() {

    let winningPattern = null;

    for (const pattern of winningPatterns) {

        const [a, b, c] = pattern;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            winningPattern = pattern;
            break;
        }
    }

    // Someone won
    if (winningPattern) {

        gameActive = false;

        winningPattern.forEach(index => {
            cells[index].classList.add("winner");
        });

        if (currentPlayer === "X") {
            scoreX++;
            scoreXElement.textContent = scoreX;
        } else {
            scoreO++;
            scoreOElement.textContent = scoreO;
        }

        statusText.textContent =
            `🎉 Player ${currentPlayer} Wins!`;

        return;
    }

    // Draw
    if (!board.includes("")) {

        gameActive = false;

        statusText.textContent = "🤝 It's a Draw!";

        return;
    }

    // Change player
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent =
        `Player ${currentPlayer}'s Turn`;
}


function restartGame() {

    board = ["", "", "", "", "", "", "", "",];

    currentPlayer = "X";
    gameActive = true;

    statusText.textContent = "Player X's Turn";

    cells.forEach(cell => {

        cell.textContent = "";

        cell.classList.remove(
            "x",
            "o",
            "winner"
        );
    });
}
