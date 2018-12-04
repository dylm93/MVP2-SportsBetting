import React from 'react';
import App from './App.jsx';
import axios from "axios";


class Login extends React.Component {
    constructor (props) {
        super(props)
    this.state = {
        username: '',
        password: '',
        usernamelogin: '',
        passwordlogin: '',
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
usernameloginSubmit (e) {
    this.setState ({
        usernamelogin: e.target.value
    })
}
passwordloginSubmit (e) {
    this.setState ({
        passwordlogin: e.target.value
    })
}

Signup () {
    var login =  {username: this.state.username,
        password: this.state.password
        }
        axios.post ('/signup', login) 
            .then(() => this.setState({
                loggedIn: true
            })) 
}

Login () {
    var login =  {username: this.state.usernamelogin,
        password: this.state.passwordlogin
        }
        axios.post ('/login', login) 
            .then(() => this.setState ({
                loggedIn: true
            })) 
}

render () {
    return (
        <div>
            {this.state.loggedIn ? < App betId = {this.state.betId} /> :
            <div className = 'login-signup-container'> 
                <div className = 'signup'>
                    <input value = {this.state.username} onChange = {(e) => this.usernameSubmit(e)} placeholder = 'username'></input>
                    <input value = {this.state.password} onChange = {(e) => this.passwordSubmit(e)} placeholder = 'password'></input>
                    <button className = 'login-signup-button' onClick = {() => this.Signup()}>Sign Up</button>
                </div>
                <div className = 'login'>
                    <input value = {this.state.usernamesignup} onChange = {(e) => this.usernameloginSubmit(e)} placeholder = 'username'></input>
                    <input value = {this.state.passwordsignup} onChange = {(e) => this.passwordloginSubmit(e)} placeholder = 'password'></input>
                    <button className = 'login-signup-button' onClick = {() => this.Login()}>Login</button>
                </div>
            </div>
            }
        </div>

    )
}

}

export default Login;