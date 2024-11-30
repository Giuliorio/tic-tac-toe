const Gameboard = () => {
    const gameboard = [];

    for (let i = 0; i < 3; i++) {
        const row = [];
        for (let j = 0; j < 3; j++) {
            row.push(Cell());
        }
        gameboard.push(row);
    }

    const getGameboard = () => gameboard.map(row => row.map(cell => cell));
    const takeAction = (mark, row, column) => {
        gameboard[row][column].addMark(mark);
    };

    return { getGameboard, takeAction };
};

function Cell() {
    let value = null;

    const addMark = (mark) => {value = mark};
    const getValue = () => value

    return {  addMark, getValue }
}

const GameController = (
    playerOneName = 'Player One',
    playerTwoName = 'Player Two'
) => {
    
    const board = Gameboard();
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
    let gameStatus;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players [0];
    };

    const getRound = () => round;
    const incrementRound = () => round++;
    const getActivePlayer = () => activePlayer;
    const getGameStatus = () => gameStatus;
    const setGameStatus = (newStatus) => gameStatus = newStatus;


    const evaluateVictory = (board, mark) => {
        // Evaluate Rows
        for (let i = 0; i < 3; i++) {
            if (board[i][0].getValue() === mark && board[i][1].getValue() === mark && board[i][2].getValue() === mark ) {
                return true;
            }
        }
        // Evaluate Columns
        for (let i = 0; i < 3; i++) {
            if (board[0][i].getValue() === mark && board[1][i].getValue() === mark && board[2][i].getValue() === mark ) {
                return true;
            }
        }
        // Evaluate Diagonals
        if ((board[0][0].getValue() === mark && board[1][1].getValue() === mark && board[2][2].getValue() === mark) ||
            (board[0][2].getValue() === mark && board[1][1].getValue() === mark && board[2][0].getValue() === mark)) {
                return true;
            }
    }

    const verifyOutcome = (board) => {
        if (evaluateVictory(board, getActivePlayer().mark)) {
            setGameStatus(`${getActivePlayer().name} won!`);
            return true;
        }   

        if (getRound() === 8) {
            setGameStatus("It's a tie!");
            return true;
        }
    }

    const playRound = (row, column) => {
        if (getGameStatus()) return;
        board.takeAction(getActivePlayer().mark, row, column);
        if (verifyOutcome(board.getGameboard())) return;

        switchPlayerTurn();
        incrementRound()
    };

    return {
        getActivePlayer,
        playRound, 
        getGameboard: 
        board.getGameboard,
        getGameStatus
    };
}

const screenController = (() => {
    const game = GameController();
    const announcementDiv = document.querySelector('.announcement')
    const gameDiv = document.querySelector('.board');
    
    const updateScreen = () => {
        gameDiv.textContent = '';

        const board = game.getGameboard();
        const activePlayer = game.getActivePlayer().name;

        if (!game.getGameStatus()) {
            announcementDiv.textContent= `It's ${activePlayer}'s turn.`;
        } else if (game.getGameStatus()) {
            announcementDiv.textContent = game.getGameStatus();
        }


        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellButton = document.createElement('div');
                cellButton.classList.add('cell')
                cellButton.dataset.row = rowIndex;
                cellButton.dataset.col = colIndex;
                cellButton.textContent = cell.getValue();
                
                gameDiv.appendChild(cellButton);
            })
        })
    }

    function clickHandler(e) {
        const selectedRow = e.target.dataset.row;
        const selectedCol = e.target.dataset.col;
        
        if (!selectedRow || !selectedCol) return

        game.playRound(selectedRow, selectedCol);
        updateScreen();
    }

    gameDiv.addEventListener('click', clickHandler);

    updateScreen();
})()