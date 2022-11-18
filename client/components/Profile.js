import React, { Component } from "react";
import { json, Navigate, useNavigate, } from "react-router-dom";
import HighScores from "./highScoresList";

class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            signedIn: false,
            username: null,
        }
        this.handleLogInClick = this.handleLogInClick.bind(this);
        this.handleSignUpClick = this.handleSignUpClick.bind(this);
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
        .then(response => {if(response === 'success') success = true})
        .catch(error => {
            console.log('error in fetch')
        });

        return false;
    }

    async handleLogInClick(){
        let navigate = useNavigate();
        const data = {'username': document.getElementById('logIn').value};
        console.log('log in click');

        const status = await this.sendData(data, 'logIn');
    }

    handleSignUpClick(){
        const data = {'username': document.getElementById('signUp').value};
        console.log('clicked')

        this.sendData(data, 'signUp');

        // fetch('/api/signUp', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data),
        // })
        // .then(response => response.json)
        // .then(data => console.log('Data Sent', data))
        // .catch(error => {
        //     console.log('error in fetch')
        // });

        console.log('clicked 2', data)

    }

    render(){
        if(!this.state.signedIn){
            return(
                <div>
                        <h2 className="profileHeaders">Log In</h2>
                        <input type="text" defaultValue="Username" id="logIn"></input>
                        <button type="submit" onClick={this.handleLogInClick}>Log In</button>
                    

                        <h2 className="profileHeaders">Sign Up</h2>
                        <input type="text" defaultValue="Username" id="signUp"></input>
                        <button onClick={this.handleSignUpClick}>Log In</button>

                        <h2 className="profileHeaders" id="highScoreHeader">High Scores</h2>
                        <HighScores/>
                </div>
            )   
        }
    }
}

export default Profile;