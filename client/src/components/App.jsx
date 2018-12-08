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
        sport: '',
        currentGame: ''
    }
    this.onGameClick = this.onGameClick.bind(this)
}

setNBA () {
    axios.get ('/api', {params: {sport: 'basketball_nba', region: 'us'}})
        .then(data=>this.setState ({
            games: [],
        }, () => this.setState({
            games: data.data,
            sport: 'NBA'
        })))
        .catch(err=>console.error(err))
}

setNFL () {
    axios.get ('/api', {params: {sport: 'americanfootball_nfl', region: 'us'}})
        .then(data=>this.setState ({
            games: [],
    }, () => this.setState({
            games: data.data,
            sport: 'NFL'
    })))
        .catch(err=>console.error(err))
}

setNHL () {
    axios.get ('/api', {params: {sport: 'icehockey_nhl', region: 'us'}})
        .then(data=>this.setState ({
            games: [],
    }, () => this.setState({
            games: data.data,
            sport: 'NHL'
    })))
        .catch(err=>console.error(err))
}

setNCAAFB () {
    axios.get ('/api', {params: {sport: 'americanfootball_ncaaf', region: 'us'}})
        .then(data=>this.setState ({
            games: [],
    }, () => this.setState({
            games: data.data,
            sport: 'NCAAFB'
    })))
        .catch(err=>console.error(err))
}

setUCL () {
    axios.get ('/api', {params: {sport: 'soccer_uefa_champs_league', region: 'uk'}})
        .then(data=>this.setState ({
            games: [],
    }, () => this.setState({
            games: data.data,
            sport: 'UCL'
    })))
        .catch(err=>console.error(err))
}

setEPL () {
    axios.get ('/api', {params: {sport: 'soccer_epl', region: 'uk'}})
        .then(data=>this.setState ({
            games: [],
    }, () => this.setState({
            games: data.data,
            sport: 'EPL'
    })))
        .catch(err=>console.error(err))
}



fetchOdds () {
    axios.get ('/api', {params: {sport: this.state.sport}})
        .then(data=>this.setState ({
        games: data.data}))
        .catch(err=>console.error(err))
}

onGameClick (gameID, game, odds) {
    this.setState ({
        currentGameID: gameID,
        currentGame: game,
        currentOdds: odds
    })
}


render () {
    return (
        <div>
            <div className = 'leagues'>
                <button className = 'league-button' onClick = {() => this.setNBA()} value = 'NBA'>NBA</button>
                <button className = 'league-button' onClick = {() => this.setNFL()} value = 'NFL'>NFL</button>
                <button className = 'league-button' onClick = {() => this.setNHL()} value = 'NFL'>NHL</button>
                <button className = 'league-button' onClick = {() => this.setNCAAFB()} value = 'NCAAFB'>NCAAFB</button>
                <button className = 'league-button' onClick = {() => this.setUCL()} value = 'UCL'>UCL</button>
                <button className = 'league-button' onClick = {() => this.setEPL()} value = 'EPL'>EPL</button>
            </div>
            <Bet currentGameID = {this.state.currentGameID} currentGame = {this.state.currentGame} currentOdds = {this.state.currentOdds} />
            <Games games={this.state.games} sport = {this.state.sport} onGameClick={this.onGameClick} /> 
        </div>
    )

}

}

export default App;