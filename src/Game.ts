
/**
 * Creates the "board" of 2048
 * @param num - The x by x dimensions you want to give the game
 */
function createBoard(num: number) {
    let board = Array(num);
    for (let i = 0; i < num; i++)
        board[i] = Array(num);

    let count = 0;
    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
            let object = {value: 0, key: count, new: false};
            board[i][j] = object;
            count++;
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

interface IData {
    value: number;
    key: number;
    new: boolean;
}

type GameState = Array<Array<IData>>;

class Game {
    state!: GameState;
    score: number;
    gameOver: boolean;

    constructor(options?: Game){
        this.state = options ? options.state : createBoard(4);
        this.score = options ? options.score : 0;
        this.gameOver = options ? options.gameOver : false;
        if (!options) {
            this.addPiece();
            this.addPiece();
        }
    }

    removeNew() {
        for (let i = 0; i < this.state.length; i++) {
            for (let j = 0; j < this.state.length; j++) {
                this.state[i][j].new = false;
            }
        }
    }
    addPiece() {
        let randomX = Math.floor(Math.random() * (4 - 0)) + 0;
        let randomY = Math.floor(Math.random() * (4 - 0)) + 0;
        let board = this.state;
        let pieceSet = false;
        while (!pieceSet) {
            if (this.boardFull()) {
                console.warn("CANNOT PLACE ANYMORE PIECES?!");
                break;
            }
            if (board[randomX][randomY].value == 0) {
                board[randomX][randomY].value = 2;
                board[randomX][randomY].new = true;
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
        for (let i = 0; i < this.state.length; i++) {
            for (let j = 0; j < this.state.length; j++) {
                if (this.state[i][j].value == 0) {
                    return test;
                }
            }
        }
        return true;
    }

    isGameOver() {
        if (this.boardFull()) {
            // If there are no places to merge.
            // Return true
            for (let i = 0; i < this.state.length; i++) {
                for (let j = 0; j < this.state.length; j++) {
                    // Checks the tile to the right
                    if (j < this.state.length - 1) {
                        if (this.state[i][j].value == this.state[i][j+1].value)
                            return false;
                    }
                    // Checks the tile to the left
                    if (j > 0) {
                        if (this.state[i][j].value == this.state[i][j-1].value)
                            return false;
                    }
                    // Checks the tile above
                    if (i < this.state.length - 1) {
                        if (this.state[i][j].value == this.state[i+1][j].value)
                            return false;
                    }
                    // Checks the tile below
                    if (i > 0) {
                        if (this.state[i][j].value == this.state[i-1][j].value)
                            return false;
                    }
                }
            }
            // Otherwise
            this.gameOver = true;
            return true;
        }
        return false;
    }

    slideLeft(options?: GameState) {
        let board = options ? options : this.state;
        let hasChanged = false;
        let pointsGained = 0;
        board = board.map((i: Array<IData>) => {
            let min = 0
            for (let j = 0; j < i.length; j++) {
                if (i[j].value !== 0) {
                    for (let k = j; k > min; k--) {
                        if (i[k-1].value === 0) {
                            i[k-1].value = i[k].value;
                            i[k].value = 0;
                            hasChanged = true;
                        }
                        // Merge section
                        if (i[k-1].value === i[k].value) {
                            i[k-1].value = i[k-1].value + i[k].value;
                            pointsGained += i[k-1].value;
                            min = k-1;
                            i[k].value = 0;
                            hasChanged = true;
                            break;
                        }
                    }
                }
            }
            return i;
        });
        this.state = board;
        this.score = this.score + pointsGained;
        return hasChanged;
    }

    move(dir: 'left'|'up'|'down'|'right') {
        if (this.isGameOver()) {
            console.warn("Game over, you lost.");
            this.removeNew();
            return;
        }
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
            this.removeNew();
            this.addPiece();
        }
    }
}

export default Game;