const Gameboard = (function() {
    const gameboard = [];

    const setGameboard = () => {
        for (let i = 0; i < 3; i++) {
            const row = [];
            for (let j = 0; j < 3; j++) {
                row.push(Cell());
            }
            gameboard.push(row);
        }
    }
    const getGameboard = () => gameboard.map(row => row.map(cell => cell.getValue()));
    const takeAction = (mark, row, column) => {
        gameboard[row][column].addMark(mark);
    };

    setGameboard()

    return { getGameboard, takeAction };
})();

function Cell() {
    let value = null;

    const addMark = (mark) => {value = mark};
    const getValue = () => value

    return {  addMark, getValue }
}

const GameController = (function(
    playerOneName = 'Player One',
    playerTwoName = 'Player Two'
) {

    const players = [
        {
            name: playerOneName,
            mark: 'X'
        },
        {
            name: playerTwoName,
            mark: 'O'
        }
    ];

    let round = 0;

    let activePlayer = players[0];
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players [0];
    };

    const getRound = () => round;
    const incrementRound = () => round++;

    const getActivePlayer = () => activePlayer;

    const evaluateVictory = (board, mark) => {
        // Evaluate Rows
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === mark && board[i][1] === mark && board[i][2] === mark ) {
                return true;
            }
        }
        // Evaluate Columns
        for (let i = 0; i < 3; i++) {
            if (board[0][i] === mark && board[1][i] === mark && board[2][i] === mark ) {
                return true;
            }
        }
        // Evaluate Diagonals
        if ((board[0][0] === mark && board[1][1] === mark && board[2][2] === mark) ||
            (board[0][2] === mark && board[1][1] === mark && board[2][0] === mark)) {
                return true;
            }
    }

    const verifyOutcome = (board) => {
        if (evaluateVictory(board, getActivePlayer().mark)) {
            console.log(`${getActivePlayer().name} won!`)
            return
        }

        if (getRound() === 9) {
            console.log("It's a tie!")
        }
    }

    const playRound = (row, column) => {
        Gameboard.takeAction(getActivePlayer().mark, row, column);
        console.log(Gameboard.getGameboard())
        verifyOutcome(Gameboard.getGameboard())

        switchPlayerTurn();
        incrementRound()
    };

    return { getActivePlayer, playRound, incrementRound, getRound};
})()