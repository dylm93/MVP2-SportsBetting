import React from 'react';
import OpenBets from './OpenBets.jsx';
import axios from 'axios';

class Bet extends React.Component {
    constructor (props) {
        super (props)
    this.state = {
        bet: '',
        possibleBet: '',
        openBets: [],
        money: null,
    }
    this.fetchBalance = this.fetchBalance.bind(this);
    }

componentDidMount () {
    this.fetchOpenBets()
    this.fetchBalance()
}

betSlip (e) {
    this.setState ({
        bet: e.target.value
    })
    
}

placeBet () {
    var multiplied = this.props.currentOdds * this.state.bet;
    var data = {
        amount: multiplied,
        team: this.props.currentGame
    }
    if (data.team !== "" && multiplied !== 0) {
       

    axios.post('/bets', {
        amount: multiplied,
        team: data.team
    })
        .then(data => this.fetchOpenBets())
    
    axios.put('/placedbet', {money: this.state.money - multiplied})
    
}

}

fetchOpenBets () {
    axios.get('/bets') 
        .then(data => this.setState ({
            openBets: data.data }))
        .catch (err => console.error(err))

}

fetchBalance () {
    console.log('fetching balance')
    axios.get('/signup')
        .then(data=>this.setState({
            money: data.data.balance}))
        .catch(err => console.error(err))
}


render () {
    return (
    <div>
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