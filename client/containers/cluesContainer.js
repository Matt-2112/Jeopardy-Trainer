import React, { Component } from 'react';
import QuestionCard from '../components/questionCard';
import Category from '../components/categoryComponent';

class CluesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            score: 0
        }
        this.handleLogInClick = this.handleLogInClick.bind(this);
    }

    scoreUpdater(val){
        const newState = this.state;
        newState.val += val;
        this.setState({newState});
    }

    sendData = async (data, endpoint) => {
        let success = false;
        await fetch(`/api/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(response => console.log(response))
        .then(response => {if(response === 'success') success = true})
        .catch(error => {
            console.log('error in fetch')
        });

        return false;
    }

    getData = async (user) => {
        let userScore;
        await fetch(`/api/${user}`)
        .then(response => response.json())
        .then(data => {    
        userScore = data;
        console.log('score in fetch', userScore)
        return userScore;
        })


    }

    async handleLogInClick(){
        const data = {'username': document.getElementById('username').value};
        console.log('log in click');

        // const status = await this.sendData(data, 'logIn');

        console.log('after')

        let newState = this.state;
        this.setState({
            user: data.username,
            score: newState.score
        })
    }

    componentDidMount(){
        
    }

    async componentDidUpdate(){
        const score = await this.getData(this.state.user)
        console.log('score', score);
    }

    render() {
        return(
            <div>
            <div className='scoreBar'>
                    <input type="text" id="username" name="username" placeholder='username'></input>
                    <button onClick={this.handleLogInClick}>Log in</button>
                    <span>Username: {this.state.user}</span>
                    <span>Score: {this.state.score}</span>
                </div>
            <div className='cluesFlex'>
            <div className="cluesContainer">
                <span id='Categories'>
                    <div>
                    <Category scoreUpdater={this.scoreUpdater}/>
                    </div>
                    <div>
                    <Category scoreUpdater={this.scoreUpdater}/>
                    </div>
                    <div>
                    <Category scoreUpdater={this.scoreUpdater}/>
                    </div>
                    <div>
                        <Category/>
                    </div>
                </span>
            </div>
            </div>
            </div>
        )
    }
}

export default CluesContainer;