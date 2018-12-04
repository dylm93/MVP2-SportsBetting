import React from 'react';

class Game extends React.Component  {
    constructor(props) {
        super(props);
    this.state = {
        team1: '',
        team2: '',
        odds1: '',
        odds2: '',
        hover: false
    }
    this.onMouseOver = this.onMouseOver.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
    }

componentDidMount () {
    this.gameSplitter()
}

gameSplitter () {
    var game = this.props.game.split(`'`)
    var team1 = game[1].split(',')[0]
    var team2 = game[1].split(',')[1]
    var odds1 = game[3].split(',')[0]
    var odds2 = game[3].split(',')[1]
    console.log(game)
    this.setState ({
        team1: team1,
        team2: team2,
        odds1: odds1,
        odds2: odds2
    })
}

onMouseOver () {
    this.setState ({
        hover: true
    })
}

onMouseLeave () {
    this.setState ({
        hover: false
    })
}

    
render () {
    return (
    <div>
        <div>
        <div onMouseOver = {this.onMouseOver} onMouseLeave = {this.onMouseLeave} className = {this.state.hover ? 'selectedgamecontainer' : 'gamecontainer'}>
            <div>
                <div onClick = {() => this.props.onGameClick(this.state.team1, this.state.odds1)} className = 'team1'>{this.state.team1}</div>
                <div className = 'odds1'>{this.state.odds1}</div>
            </div>
            <div className = 'versus'>vs</div>
            <div>
                <div onClick = {() => this.props.onGameClick(this.state.team2, this.state.odds2)} className = 'team2'>{this.state.team2}</div>
                <div className = 'odds2'>{this.state.odds2}</div>
            </div>
        </div>
        </div>
    </div>
    )
}
 
}

export default Game;