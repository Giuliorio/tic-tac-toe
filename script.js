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