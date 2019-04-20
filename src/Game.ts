
/**
 * Creates the "board" of 2048
 * @param num - The x by x dimensions you want to give the game
 */
function createBoard(num: number) {
    let board = Array(num);
    for (let i = 0; i < num; i++)
        board[i] = Array(num);

    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
            board[i][j] = 0;
        }
    }
    return board;
}

function rotateLeft(matrix: GameState) {
    let rows = matrix.length;
    let cols = matrix[0].length;
    let endState: GameState = [];
    for (let row = 0; row < rows; ++row) {
        endState.push([]);
        for (var column = 0; column < cols; ++column) {
            endState[row][column] = matrix[column][cols - row - 1];
        }
    }
    return endState;
}

type GameState = Array<Array<number>>;

class Game {
    state!: GameState;

    constructor(options?: Game){
        this.state = options ? options.state : createBoard(4);
        if (!options) {
            this.addPiece();
            this.addPiece();
        }
    }

    addPiece() {
        console.log("Added");
        let randomX = Math.floor(Math.random() * (4 - 0)) + 0;
        let randomY = Math.floor(Math.random() * (4 - 0)) + 0;
        let board = this.state;
        let pieceSet = false;
        while (!pieceSet) {
            if (this.boardFull()) {
                console.warn("CANNOT PLACE ANYMORE PIECES?!");
                break;
            }
            if (board[randomX][randomY] == 0) {
                board[randomX][randomY] = 2;
                pieceSet = true;
            } else {
                randomX = Math.floor(Math.random() * (4 - 0)) + 0;
                randomY = Math.floor(Math.random() * (4 - 0)) + 0; 
            }
        }
        this.state = board;
    }

    boardFull() {
        let test = false;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.state[i][j] == 0) {
                    return test;
                }
            }
        }
        return true;
    }

    slideLeft(options?: GameState) {
        let board = options ? options : this.state;
        let hasChanged = false;
        board = board.map((i: Array<number>) => {
            let min = 0
            for (let j = 0; j < i.length; j++) {
                if (i[j] !== 0) {
                    for (let k = j; k > min; k--) {
                        if (i[k-1] === 0) {
                            i[k-1] = i[k];
                            i[k] = 0;
                            hasChanged = true;
                        }
                        if (i[k-1] === i[k]) {
                            i[k-1] = i[k-1] + i[k];
                            min = k-1;
                            i[k] = 0;
                            hasChanged = true;
                            break;
                        }
                    }
                }
            }
            return i;
        });
        this.state = board;
        return hasChanged;
    }

    move(dir: 'left'|'up'|'down'|'left') {
        let board: GameState = this.state;
        let hasChanged = false;
        if (dir == 'left') {
            hasChanged = this.slideLeft();
        } else if (dir == 'up') {
            for (let i = 0; i < 1; i++){
                board = rotateLeft(board);
            }
            hasChanged = this.slideLeft(board);
            for (let i = 1; i < 4; i++) {
                board = rotateLeft(board);
            }
        } else if (dir == 'down') {
            for (let i = 0; i < 3; i++){
                board = rotateLeft(board);
            }
            hasChanged = this.slideLeft(board);
            for (let i = 3; i < 4; i++) {
                board = rotateLeft(board);
            }
        } else if (dir == 'right') {
            for (let i = 0; i < 2; i++){
                board = rotateLeft(board);
            }
            hasChanged = this.slideLeft(board);
            for (let i = 2; i < 4; i++) {
                board = rotateLeft(board);
            }
        }
        this.state = board;
        if (hasChanged) {
            this.addPiece();
        }
    }
}

export default Game;