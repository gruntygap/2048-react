
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

type GameState = Array<Array<number>>;

class Game {
    state!: GameState;

    constructor(options?: GameState){
        this.state = options ? options : createBoard(4);
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

    slide(dir: String) {
        // need to implement!
    }
}

export default Game;