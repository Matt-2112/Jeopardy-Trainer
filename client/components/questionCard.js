import React, { Component } from "react";
import fetch from 'isomorphic-fetch';
// import { runInThisContext } from "vm";

class QuestionCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            category: null,
            answer: null,
            question: null,
            value: null,
            selected: false,
            reveal: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }


    async handleKeyDown(e){

        const subAnswer = document.getElementById('subAnswer').value;
        console.log(subAnswer);

        if (e.key === 'Enter') {
            const newState = this.state;
            newState.reveal = true;
            console.log(newState);
            this.setState({newState});

            

            if(this.state.answer.includes(subAnswer)){

                this.props.scoreUpdater(this.state.value);
                console.log('right !')
            } else {
                let value = -this.state.value;
                this.props.scoreUpdater(value);
            }
        
        }
    }



    handleClick(){
        console.log('clicked!')
        const newState = this.state;
        // console.log(newState);
        newState.selected = true;
        this.setState({newState});
        // newState.reveal = true;
        // this.setState({newState})
        // console.log(this.state);
    }

    componentDidMount(){
        fetch('http://jservice.io/api/random')
        .then(response => response.json())
        .then(data => data = data[0])
        .then(stateData => this.setState({
            category: stateData.category.title,
            answer: stateData.answer,
            question: stateData.question,
            value: stateData.value,
        }));
        

        console.log('prop data', this.state)
    }

    render(){
        if(!this.state.reveal && !this.state.selected){
            return(
                <button type="submit" onClick={this.handleClick} className="clue">
                    <p id="categoryHeader">{this.state.category}</p>
                    <p>{this.state.value}$</p>
                    <p>{this.state.question}</p>
                </button>
            )
        } 
        else if (this.state.selected && !this.state.reveal) {
            return (
                <button className="clue">
                <p>{this.state.category}</p>
                <p>{this.state.value}$</p>
                <p>{this.state.question}</p>
                <input id="subAnswer" autoFocus type="text" onKeyDown={this.handleKeyDown}></input>
            </button>
            )
        }
        else {
            return(
                <button type="submit" onClick={this.handleClick} className="clue">
                    <p>{this.state.category}</p>
                    <p>{this.state.value}$</p>
                    <p>{this.state.answer}</p>
                </button>
            )
        }
    }
}

export default QuestionCard;