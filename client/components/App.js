import React, { Component } from "react";
import CluesContainer from '../containers/cluesContainer';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Profile from '../components/Profile'

class App extends Component {

    render(){
        return(
            <Router>
                <nav>
                    <Link to="/profile">Profile</Link>
                    <Link to="/">Play</Link>
                </nav>
                <Routes>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/" element={<CluesContainer/>}/>
                </Routes>
            </Router>
        )
    }
}

export default App;