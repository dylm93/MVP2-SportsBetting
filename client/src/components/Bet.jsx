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
    if (this.props.currentOdds > 0) {
        var multiplied = ((this.props.currentOdds/100) + 1) * this.state.bet
    } else if (this.props.currentOdds < 0) {
        var multiplied = ((100/Math.abs(this.props.currentOdds)) + 1) * this.state.bet
    }
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

// fetchScores () {
//     axios.get('/scores')
//         .then(data => console.log(data))
//         .catch(err => console.error(err))
// }



render () {
    return (
    <div className = 'balance-betslip-openbets-container'>
        <div className = 'balance'>Balance: ${this.state.money}</div>
        <div className = 'betslipcontainer'>
        <div className='betslipheader'>
            <h1 className = 'betsliptext'>BET SLIP</h1>
        </div>
            <div >
                <div className = 'currentbet'>  
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

    )


}
}

export default Bet;