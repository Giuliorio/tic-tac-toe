const Gameboard = (function() {
    const gameboard = [
        [null, null, null], 
        [null, null, null], 
        [null, null, null]
    ];

    const getGameState = () => gameboard;
    const takeAction = (piece, row, column) => {
        gameboard[row].splice(column, 1, piece)
    };
    return { getGameState, takeAction };
})();