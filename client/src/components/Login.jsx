import React from 'react';
import App from './App.jsx';
import axios from "axios";


class Login extends React.Component {
    constructor (props) {
        super(props)
    this.state = {
        username: '',
        password: '',
        loggedIn: false
    }
    }

usernameSubmit (e) {
    this.setState ({
        username: e.target.value
    })
}
passwordSubmit (e) {
    this.setState ({
        password: e.target.value
    })
}

Login () {
var login =  {username: this.state.username,
     password: this.state.password
    }
    axios.post ('/signup', login) 
        .then(() => this.setState ({
            loggedIn: true
        })) 
}

render () {
    return (
        <div>
            {this.state.loggedIn ? < App /> :
            <div> 
                <input value = {this.state.username} onChange = {(e) => this.usernameSubmit(e)}></input>
                <input value = {this.state.password} onChange = {(e) => this.passwordSubmit(e)}></input>
                <button onClick = {() => this.Login()}>Login</button>
            </div>
            }
        </div>

    )
}

}

export default Login;