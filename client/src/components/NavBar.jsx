import React from 'react';
import axios from 'axios';

class NavBar extends React.Component {
    constructor (props) {
        super (props)

    this.state = {
        username: ''
    }
    }

componentDidMount () {
    this.getUser()
}

getUser () {
    axios.get ('/login')
        .then(data=> this.setState ({
            username: data.data.username.toUpperCase()}))
        .catch(err=> console.error(err))
}

    render () {
        return (
            <div className = 'navbar'>
                    <h1 className = 'header' >BET310</h1>
                        <div className = 'user-money'>
                            <div className = 'user'>
                                {this.state.username}
                            </div>
                            <div className = 'money'>
                                ${this.props.money}
                            </div>
                        </div>
            </div>
        )
    }
}

export default NavBar;