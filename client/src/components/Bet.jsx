import React from 'react';
import OpenBets from './OpenBets.jsx';
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
    }
    this.fetchBalance = this.fetchBalance.bind(this);
    this.fetchOpenBets = this.fetchOpenBets.bind(this);
    }

componentDidMount () {
    this.fetchBalance()
    this.fetchOpenBets()
}

betSlip (e) {
    this.setState ({
        bet: e.target.value
    })
}

placeBet () {
    var odds = Math.abs(this.props.currentOdds)
    var multiplied = odds/100 * this.state.bet;
    var data = {
        amount: multiplied,
        team: this.props.currentGame,
    }
    if (data.team !== "" && multiplied !== 0) {

    axios.post('/bets', {
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




render () {
    return (
    <div className = 'balance-betslip-openbets-container'>
        <div>Balance: ${this.state.money}</div>
        <div className = 'betslipcontainer'>
        <h1 className='betslipheader'>Bet Slip:</h1>
            <div >
                    {this.props.currentGame}
                <input value = {this.state.bet} onChange = {(e) => this.betSlip(e)}></input>
                    {this.props.currentOdds}
                <div>{this.state.possibleBet}</div>
                <button onClick = {() => this.placeBet()} className = 'placebetbutton'>Place Bet</button>
            </div>
        </div>
        <div className = 'openbets' >
            <div>Open Bets</div>
            <OpenBets bets = {this.state.openBets}/>
        </div>
    </div>

    )


}
}

export default Bet;