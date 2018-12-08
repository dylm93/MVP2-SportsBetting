import React from 'react';
import OpenBets from './OpenBets.jsx';
import NavBar from './NavBar.jsx';
import axios from 'axios';

class Bet extends React.Component {
    constructor (props) {
        super (props)
    this.state = {
        bet: '',
        betId: null,
        possibleBet: '',
        openBets: [],
        money: null,
        winners: []
    }
    this.fetchBalance = this.fetchBalance.bind(this);
    this.fetchOpenBets = this.fetchOpenBets.bind(this);
    this.fetchWinners = this.fetchWinners.bind(this);
    }

componentDidMount () {
    this.fetchBalance()
    this.fetchOpenBets()
    this.fetchWinners()
}

betSlip (e) {
    this.setState ({
        bet: e.target.value
    })
}

placeBet () {
    if (this.props.currentOdds > 0) {
        var multiplied = ((this.props.currentOdds/100) + 1) * this.state.bet
    } else if (this.props.currentOdds < 0) {
        var multiplied = ((100/Math.abs(this.props.currentOdds)) + 1) * this.state.bet
    }
    var data = {
        amount: multiplied,
        team: this.props.currentGame,
        gameID: this.props.currentGameID
    }
    if (data.team !== "" && multiplied !== 0) {

    axios.post('/bets', {
        gameid: data.gameID,
        amount: multiplied,
        team: data.team,
        betId: this.state.betId
    })
        .then(data => this.fetchOpenBets())
    
    axios.put('/placedbet', {money: this.state.money - this.state.bet})
        .then(data => this.fetchBalance())
}
}

fetchOpenBets () {
    axios.get('/bets')
        .then(data => this.setState ({
            openBets: data.data }))
        .catch (err => console.error(err))

}

fetchBalance () {
    axios.get('/placedbet')
        .then(data=>this.setState({
            money: data.data.balance}))
        .catch(err => console.error(err))
}

fetchWinners () {
    axios.get('/winners')
        .then(data=>
            axios.get('/comparewinners', {params: {winners: data.data}}))
                .then(data=> 
                    {var winnings = 0;
                        for (var i = 0; i < data.data.length; i++) {
                        winnings += data.data[i]['amount']
                    }
                    console.log(winnings)
                    if (winnings > 0) {
                        axios.put('/placedbet', {money: this.state.money + winnings})
                            .then(()=>axios.delete('/bets', {params: {winners: data.data}})
                                .then(() => this.fetchBalance())
                                    .then(() => this.fetchOpenBets()))
                    }})
}


render () {
    return (
    <div>
    <NavBar money = {this.state.money} />
        <div className = 'balance-betslip-openbets-container'>
            <div className = 'betslipcontainer'>
            <div className='betslipheader'>
                <h1 className = 'betsliptext'>BET SLIP</h1>
            </div>
                <div >
                    <div className = 'currentbet'>  
                        <span className = 'currentgameID'>{this.props.currentGameID}</span>
                        <span className = 'currentgame' >{this.props.currentGame}</span>
                        <span className = 'currentodds'>{this.props.currentOdds}</span>
                    </div> 
                    <div className = 'makebetinputcontainer'>
                        <input className = 'makebetinput' value = {this.state.bet} onChange = {(e) => this.betSlip(e)}></input>
                    </div>
                    <button onClick = {() => this.placeBet()} className = 'placebetbutton'>PLACE BET</button>
                </div>
            </div>
            <div className = 'openbets' >
                <div className = 'openbets-header'>Open Bets</div>
                <OpenBets bets = {this.state.openBets}/>
            </div>
        </div>
    </div>

    )


}
}

export default Bet;