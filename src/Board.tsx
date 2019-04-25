import React, { Component } from 'react';
import './Board.css';
import Game from './Game';

const Tile: React.SFC<{number?: number, class?: string}> = (props) => {
    const styling: any = {
        width: "50px",
        height: "50px",
        display: "inline-block",
        borderRadius: "10px",
        verticalAlign: "middle",
        margin: "10px 10px 10px 10px"
    };

    styling['backgroundColor'] = props.number == 2 ? "#33CEFF" : 
        props.number == 4 ? "#FF3368" : props.number == 8 ? "#3368FF" :
        props.number == 16 ? "#00f5e0" : props.number == 32 ? "#CA33FF" :
        props.number == 64 ? "#ff6df3" : props.number == 128 ? "#25ff00" :
        props.number == 256 ? "#6faeff" : props.number == 512 ? "#FF33CE" :
        props.number == 1024 ? "#ff6969" : props.number == 2048 ? "#ffd533" : "#ececec";
    return <span className={props.class} style={styling}><>{props.number != 0 ? props.number : undefined}</></span>;
}

interface IData {
    value: number;
    key: number;
    new: boolean;
}

class Board extends Component<{}, { game: Game }> {
    startX: number;
    startY: number;

    constructor(props: any) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.startX = 0;
        this.startY = 0;
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

    handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
        if (this.state.game.gameOver) {
          return;
        }
        if (e.touches.length != 1) {
          return;
        }
        this.startX = e.touches[0].screenX;
        this.startY = e.touches[0].screenY;
        e.preventDefault();
      }

      handleTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
        if (this.state.game.gameOver) {
          return;
        }
        if (e.changedTouches.length != 1) {
          return;
        }
        var deltaX = e.changedTouches[0].screenX - this.startX;
        var deltaY = e.changedTouches[0].screenY - this.startY;
        var direction = -1;
        // Code sourced from:
        // https://github.com/IvanVergiliev/2048-react/blob/master/src/index.js
        if (Math.abs(deltaX) > 3 * Math.abs(deltaY) && Math.abs(deltaX) > 30) {
          direction = deltaX > 0 ? 2 : 0;
        } else if (Math.abs(deltaY) > 3 * Math.abs(deltaX) && Math.abs(deltaY) > 30) {
          direction = deltaY > 0 ? 3 : 1;
        }
        if (direction != -1) {
            const labels: Array<'left'|'up'|'right'|'down'> = ['left', 'up', 'right', 'down'];
            const newGame = new Game(this.state.game);
            newGame.move(labels[direction]);
            this.setState({game: newGame});
        }
      }

    render() {
        let count = -1;
        let gameOver: string = this.state.game.gameOver ? "gameOver" : "game";
        const handleSubmit = (e: React.MouseEvent): void => {
            e.preventDefault();
            this.setState({game: new Game()});
        };
        const bttn = <button onClick={handleSubmit}>Restart</button>;
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
                <div className="score">
                    <p>{this.state.game.score}</p>
                    {this.state.game.gameOver ? bttn : <></> }
                </div>
                <div className={gameOver} onTouchStart={this.handleTouchStart.bind(this)} onTouchEnd={this.handleTouchEnd.bind(this)}>
                    {this.state.game.state.map((i: Array<IData>)=>{
                        count++;
                        return <div className="row" key={count}>
                            {i.map((j: IData)=>{
                                return j.new ? <Tile class={"overlay"} key={j.key} number={j.value}/> : <Tile key={j.key} number={j.value}/>;
                            })}
                        </div>;
                    })}
                </div>
            </div>
        );
    }
}

export default Board;
