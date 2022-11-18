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
        this.scoreUpdater = this.scoreUpdater.bind(this);
    }

    async scoreUpdater(val){
        // const userData = this.getData(this.state.user);
        const data = {'username': this.state.user, 'value': val}
        console.log('updater fired', val)
        const newScore = await this.sendData(data, 'updateScore')


        const newState = this.state;
        newState.score = newScore.score;
        this.setState({newState});
    }

    sendData = async (data, endpoint) => {

        const res = await fetch(`/api/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        // .then(response => response.json())
        // .then(response => console.log('fetch response:',response))
        // .then(response => {return response})
        // .catch(error => {
        //     console.log('error in fetch')
        // });
        const returnData = await res.json()

        console.log('fetches res', returnData)

        return returnData;
    }

    getData = async (user) => {
    
        const res = await fetch(`/api/score/${user}`)
        const userData = res.json();

        console.log('getData', userData);

        return userData;


    }

    async handleLogInClick(){
        const data = {'username': document.getElementById('username').value};
        console.log('log in click');

        const returnData = await this.sendData(data, 'logIn');

        console.log('after', returnData)

        let newState = this.state;
        this.setState({
            user: data.username,
            score: returnData.score
        })
    }

    componentDidMount(){
        
    }

    async componentDidUpdate(){
        // const score = await this.getData(this.state.user)
        // console.log('score', score)
    }

    render(props) {
        return(
            <div>
            <div className='scoreBar'>
                    <input type="text" id="username" name="username" placeholder='username'></input>
                    <button onClick={this.handleLogInClick}>Log in</button>
                    <span>Username: {this.state.user} </span>
                    <span>Score: {this.state.score}$</span>
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