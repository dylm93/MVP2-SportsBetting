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
            games: [],
        }, () => this.setState({
            games: data.data
        })))
        .catch(err=>console.error(err))
}

setNFL () {
    axios.get ('/api', {params: {sport: 'americanfootball_nfl'}})
        .then(data=>this.setState ({
            games: [],
    }, () => this.setState({
            games: data.data
    })))
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

// renderTag() {
//     const { 
//       sport,
//       games,
//     } = this.state
//     console.log('hello',games)
//     if (sport === 'nfl') return <Games sport={sport} games={games} onGameClick={this.onGameClick} />  
//     if (sport === 'nba') return <Games sport={sport} games={games} onGameClick={this.onGameClick} />; 
// }

render () {
    return (
        <div>
            <div className = 'leagues'>
                <button onClick = {() => this.setNBA()} value = 'NBA'>NBA</button>
                <button onClick = {() => this.setNFL()} value = 'NFL'>NFL</button>
            </div>
            <Bet currentGame = {this.state.currentGame} currentOdds = {this.state.currentOdds} />
            <Games games={this.state.games} onGameClick={this.onGameClick} /> 
        </div>
    )

}

}

export default App;