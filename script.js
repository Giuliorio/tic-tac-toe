const Gameboard = (function() {
    const gameboard = [
        [null, null, null], 
        [null, null, null], 
        [null, null, null]
    ];

    const getGameState = () => structuredClone(gameboard);
    const takeAction = (mark, row, column) => {
        gameboard[row].splice(column, 1, mark);
    };
    return { getGameState, takeAction };
})();

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
        console.log(Gameboard.getGameState())
        verifyOutcome(Gameboard.getGameState())

        switchPlayerTurn();
        incrementRound()
    };

    return { getActivePlayer, playRound, incrementRound, getRound};
})()