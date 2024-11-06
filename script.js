const Gameboard = (function() {
    const gameboard = [
        [null, null, null], 
        [null, null, null], 
        [null, null, null]
    ];

    const getGameState = () => gameboard;
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
            piece: 'X'
        },
        {
            name: playerTwoName,
            piece: 'O'
        }
    ];

    let activePlayer = players[0];
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players [0];
    };

    const getActivePlayer = () => activePlayer;

    const playRound = (row, column) => {
        Gameboard.takeAction(getActivePlayer().mark, row, column);
        switchPlayerTurn();
        console.log(Gameboard.getGameState())
    };

    return { getActivePlayer, playRound };
})()