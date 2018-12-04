class Login extends React.Component {
    constructor (props) {
        super(props)
    this.state = {
        username: '',
        password: ''
    }
    }

render () {
    return (
        <div>
            <input value = {this.state.username} onChange = {(e) => this.usernameSubmit(e)}></input>
            <input value = {this.state.password} onChange = {(e) => this.passwordSubmit(e)}></input>
            <button onClick = {()}>Login</button>





        </div>

    )
}

}

export default Login;