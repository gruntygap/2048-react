import React, { Component } from 'react';

interface TileProps {
    number?: number;
}

class Tile extends Component<TileProps, { number: number|undefined, mergedTile: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = {
            number: this.props.number ? this.props.number : undefined,
            mergedTile: false
        }
    }

    setNumber(number: number) {
        this.setState({ number });
    }

    render() {
        const styling = {
            width: "50px",
            height: "50px",
            backgroundColor: "purple",
            display: "inline-block",
            borderRadius: "10px",
            verticalAlign: "middle"
        };
        return <span style={styling}><p>{this.state.number}</p></span>;
    }
}

export default Tile;