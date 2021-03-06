import React from 'react';
import App from './App.jsx';
import Winners from './Winners.jsx';
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
    // axios.defaults.baseURL = 'http://ec2-35-174-4-106.compute-1.amazonaws.com'
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
            .catch(()=> alert('User already exists'))
}

Login () {
    var login =  {username: this.state.usernamelogin,
        password: this.state.passwordlogin
        }
        axios.post ('/login', login) 
            .then(() => this.setState ({
                loggedIn: true
            })) 
            .catch(() => alert('Invalid Credentials'))
}

render () {
    return (
        <div>
            <Winners />
            {this.state.loggedIn ? < App username = {this.state.username} betId = {this.state.betId} /> :
        <div> 
            {/* <div className = 'navbar-login'>
                <h1 className = 'header-login' >BET310</h1>
            </div> */}
            <div className = 'login-signup-container'> 
                <div className = 'signup'>
                    <input value = {this.state.username} onChange = {(e) => this.usernameSubmit(e)} placeholder = 'username'></input>
                    <input value = {this.state.password} onChange = {(e) => this.passwordSubmit(e)} placeholder = 'password' type = 'password'></input>
                    <button className = 'login-signup-button' onClick = {() => this.Signup()}>Sign Up</button>
                </div>
                <div className = 'login'>
                    <input value = {this.state.usernamesignup} onChange = {(e) => this.usernameloginSubmit(e)} placeholder = 'username'></input>
                    <input value = {this.state.passwordsignup} onChange = {(e) => this.passwordloginSubmit(e)} placeholder = 'password' type = 'password'></input>
                    <button className = 'login-signup-button' onClick = {() => this.Login()}>Login</button>
                </div>
            </div>
        </div>    
            }
        </div>

    )
}

}

export default Login;