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

setNBA () {
    axios.get ('/api', {params: {sport: 'basketball_nba'}})
        .then(data=>this.setState ({
            games: data.data}, () => {console.log(this.state.games)}))
        .catch(err=>console.error(err))
}

setNFL () {
    axios.get ('/api', {params: {sport: 'americanfootball_nfl'}})
        .then(data=>this.setState ({
        games: data.data}, () => {console.log(this.state.games)}))
        .catch(err=>console.error(err))
}

fetchOdds () {
    axios.get ('/api', {params: {sport: this.state.sport}})
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
            <div className = 'leagues'>
                <button onClick = {() => this.setNBA()} value = 'NBA'>NBA</button>
                <button onClick = {() => this.setNFL()} value = 'NFL'>NFL</button>
            </div>
            <Bet currentGame = {this.state.currentGame} currentOdds = {this.state.currentOdds} />
            <Games games = {this.state.games} onGameClick = {this.onGameClick} /> 
        </div>
    )

}

}

export default App;