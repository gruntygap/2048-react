import React, { Component } from 'react';
import { array } from 'prop-types';
import { NONAME } from 'dns';

class Board extends Component<{}, { board: Array<Array<number>> }> {
    constructor(props: any) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.state = {
            board: this.createBoard()
        }
        // this.state.board[0][0] = 2;
        // this.state.board[0][1] = 2;
        // this.state.board[0][2] = 2;
        // this.state.board[0][3] = 2;
    }
    
    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyDown);
        this.addPiece();
        this.addPiece();
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown(e: KeyboardEvent) {
        const keyCodes: Array<number> = [ 37, 38, 39, 40 ];
        const labels: any = { 37: 'left', 38: 'up', 39: 'right', 40: 'down' };

        if (keyCodes.includes(e.keyCode)) {
            e.preventDefault();
            console.log(labels[e.keyCode]);
            this.slideNCombine(labels[e.keyCode]);
        }
    }

    slideNCombine(direction: String) {
        let { board } = this.state;
        if (direction === 'left') {
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (board[i][j] !== 0) {
                        for (let k = j; k > 0; k--) {
                            if (board[i][k-1] === 0) {
                                board[i][k-1] = board[i][k];
                                board[i][k] = 0;
                            }
                            if (board[i][k-1] === board[i][k]) {
                                board[i][k-1] = board[i][k] + board[i][k-1];
                                board[i][k] = 0;
                                break;
                            }
                        }
                    }
                }
            }
        } else if (direction === 'up') {
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (board[i][j] !== 0) {
                        for (let k = i; k > 0; k--) {
                            if (board[k-1][j] === 0) {
                                board[k-1][j] = board[k][j];
                                board[k][j] = 0;
                            }
                            if (board[k-1][j] === board[k][j]) {
                                board[k-1][j] = board[k][j] + board[k-1][j];
                                board[k][j] = 0;
                                break;
                            }
                        }
                    }
                }
            }
        } else if (direction === 'right') {
            for (let i = 3; i >= 0; i--) {
                for (let j = 3; j >= 0; j--) {
                    if (board[i][j] !== 0) {
                        for (let k = j; k < 3; k++) {
                            if (board[i][k+1] === 0) {
                                board[i][k+1] = board[i][k];
                                board[i][k] = 0;
                            }
                            if (board[i][k+1] === board[i][k]) {
                                board[i][k+1] = board[i][k] + board[i][k+1];
                                board[i][k] = 0;
                                break;
                            }
                        }
                    }
                }
            }
        } else if (direction === 'down') {
            for (let i = 3; i >= 0; i--) {
                for (let j = 3; j >= 0; j--) {
                    if (board[i][j] !== 0) {
                        for (let k = i; k < 3; k++) {
                            if (board[k+1][j] === 0) {
                                board[k+1][j] = board[k][j];
                                board[k][j] = 0;
                            }
                            if (board[k+1][j] === board[k][j]) {
                                board[k+1][j] = board[k][j] + board[k+1][j];
                                board[k][j] = 0;
                                break;
                            }
                        }
                    }
                }
            }
        }
        this.setState({board});
        this.addPiece();
    }

    createBoard() {
        let board = Array(4);
        for (let i = 0; i < 4; i++)
            board[i] = Array(4);

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                board[i][j] = 0;
            }
        }
        return board;
    }

    addPiece() {
        let randomX = Math.floor(Math.random() * (4 - 0)) + 0;
        let randomY = Math.floor(Math.random() * (4 - 0)) + 0;
        let { board } = this.state;
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
        this.setState({board});
    }

    boardFull() {
        let test = false;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.state.board[i][j] == 0) {
                    return test;
                }
            }
        }
        return true;
    }

    render() {
        const padding = {
            padding: '10px'
        }

        const colors = { 0: "none", 2: "pink", 4: "blue" };

        return (
            <div className="App">
                {this.state.board.map((i)=>{
                    return <p>
                        {i.map((j)=>{
                            if (j == 0)
                                return <span style={{padding: "10px"}}>{j}</span>
                            if (j !== 0)
                                return <span style={{padding: "10px", backgroundColor: }}>{j}</span>
                        })}
                    </p>;
                })}
                <header className="App-header">
                    <p> Edit <code>src/App.tsx</code> and save to reload.</p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >Learn React</a>
                </header>
            </div>
        );
    }
}

export default Board;
