import React, { Component } from "react";
import ListItem from "./listItem";

class HighScores extends Component {
    constructor(props){
        super(props)
        this.state = {
            highscores: []
        };
        this.getHighScores = this.getHighScores.bind(this)
    }

    async getHighScores(){
        const res = await fetch(`/api/highScores`)
        const highScores = await res.json();

        console.log('high scores', highScores);

        const newState = this.state;
        newState.highscores = highScores;
        this.setState({newState})
    }

    async componentDidMount(){

       await this.getHighScores();
    
    }

    render(){

        const scores = [];
        for (let i = 0; i < this.state.highscores.length; i++) {
            scores.push(<ListItem user={this.state.highscores[i].username} score={this.state.highscores[i].score}/>)
        }

        return(
            <ol className="highScoresList">
                { scores }
            </ol>
        )
    }
}

export default HighScores;