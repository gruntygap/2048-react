import React, { Component } from 'react';
import Game from './Game';

const Tile: React.SFC<{number?: number}> = (props) => {
    const styling: any = {
        width: "50px",
        height: "50px",
        display: "inline-block",
        borderRadius: "10px",
        verticalAlign: "middle",
        margin: "0px 10px 0px 10px"
    };
    styling['backgroundColor'] = props.number == 2 ? "#33CEFF" : 
        props.number == 4 ? "#FF3368" : props.number == 8 ? "#3368FF" :
        props.number == 16 ? "#33CEFF" : props.number == 32 ? "#CA33FF" :
        props.number == 64 ? "#ff6df3" : props.number == 128 ? "#6433FF" :
        props.number == 256 ? "#6faeff" : props.number == 512 ? "#FF33CE" :
        props.number == 1024 ? "#ff6969" : props.number == 2048 ? "#ffd533" : "#ececec";
    return <span style={styling}><p>{props.number != 0 ? props.number : undefined}</p></span>;
}

class Board extends Component<{}, { board: Array<Array<number>>, game: any }> {
    constructor(props: any) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.state = {
            board: this.createBoard(),
            game: new Game()
        }
        console.log(this.state.game);
        this.state.game.addPiece();
        this.state.board[0][0] = 2;
        this.state.board[0][1] = 8;
        this.state.board[0][2] = 4;
        this.state.board[0][3] = 4;
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
            this.state.game.addPiece();
            e.preventDefault();
            this.slideNCombine(labels[e.keyCode]);
            this.addPiece();
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

    format(number: number){
        let format: any = {
            padding: '10px'
        }
        if (number == 2)
            format['backgroundColor'] = "purple";
        if (number == 4)
            format['backgroundColor'] = "blue";
        if (number == 8)
            format['backgroundColor'] = "pink";
        if (number == 16)
            format['backgroundColor'] = "pink";
        if (number == 32)
            format['backgroundColor'] = "pink";
        return format;
    }

    render() {
        const padding = {
            padding: '10px',
            backgroundColor: "purple"
        }

        const colors = { 0: "none", 2: "pink", 4: "blue" };

        return (
            <div className="App">
                <p>Alpha Game Board</p>
                {this.state.board.map((i)=>{
                    return <p>
                        {i.map((j)=>{
                            return <span style={this.format(j)}>{j}</span>
                        })}
                    </p>;
                })}
                <p>Testing the colors of the Tiles</p>
                <Tile number={2}/>
                <Tile number={4}/>
                <Tile number={8}/>
                <Tile number={16}/>
                <Tile number={32}/>
                <Tile number={64}/>
                <Tile number={128}/>
                <Tile number={256}/>
                <Tile number={512}/>
                <Tile number={1024}/>
                <Tile number={2048}/>
                <Tile/>

                <p>Beta Game Board</p>
                {this.state.game.state.map((i: Array<number>)=>{
                    return <p>
                        {i.map((j: number)=>{
                            return <Tile number={j}/>
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
