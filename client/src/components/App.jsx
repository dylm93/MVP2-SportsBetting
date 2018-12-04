import React from 'react';
import Games from './Games.jsx';
import Money from './Money.jsx';
import Bet from './Bet.jsx'
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        games: [],
        currentGame: ''
    }
    this.onGameClick = this.onGameClick.bind(this)
}

componentDidMount () {
    this.fetchOdds()
}

fetchOdds () {
    axios.get ('/api')
        .then(data=>this.setState ({
        games: data.data}))
        .catch(err=>console.error(err))
}

onGameClick (game, odds) {
    this.setState ({
        currentGame: game,
        currentOdds: odds
    })
}


render () {
    return (
        <div>
            <Bet currentGame = {this.state.currentGame} currentOdds = {this.state.currentOdds} />
            <Games games = {this.state.games} onGameClick = {this.onGameClick} /> 
        </div>
    )

}

}

export default App;