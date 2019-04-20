import React, { Component } from 'react';
import './Board.css';
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
        props.number == 16 ? "#00f5e0" : props.number == 32 ? "#CA33FF" :
        props.number == 64 ? "#ff6df3" : props.number == 128 ? "#25ff00" :
        props.number == 256 ? "#6faeff" : props.number == 512 ? "#FF33CE" :
        props.number == 1024 ? "#ff6969" : props.number == 2048 ? "#ffd533" : "#ececec";
    return <span style={styling}><p>{props.number != 0 ? props.number : undefined}</p></span>;
}

class Board extends Component<{}, { game: Game }> {
    constructor(props: any) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.state = {
            game: new Game()
        }
    }
    
    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown(e: KeyboardEvent) {
        const keyCodes: Array<number> = [ 37, 38, 39, 40 ];
        const labels: any = { 37: 'left', 38: 'up', 39: 'right', 40: 'down' };

        if (keyCodes.includes(e.keyCode)) {
            e.preventDefault();
            const newGame = new Game(this.state.game);
            newGame.move(labels[e.keyCode]);
            this.setState({game: newGame});
        }
    }

    render() {
        const padding = {
            padding: '10px',
            backgroundColor: "purple"
        }

        const colors = { 0: "none", 2: "pink", 4: "blue" };

        return (
            <div className="Board">
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
            </div>
        );
    }
}

export default Board;
