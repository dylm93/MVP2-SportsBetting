import React from 'react';

class Game extends React.Component  {
    constructor(props) {
        super(props);
    this.state = {
        team1: '',
        team2: '',
        odds1: '',
        odds2: '',
        hover: false,
        gamehover: false,
        game1hover: false
    }
    this.onMouseOver = this.onMouseOver.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
    this.game1Hover = this.game1Hover.bind(this)
    this.game1Leave = this.game1Leave.bind(this)
    this.game2Hover = this.game2Hover.bind(this)
    this.game2Leave = this.game2Leave.bind(this)
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

    if (odds1 > 2) {
        odds1 = '+' + Math.ceil((Math.round(odds1 * 100))/25)*25
    }
    if (odds1 < 2) {
        odds1 = '-' + Math.ceil(((2 - odds1 + 1) * 100)/25)*25
    }
    if (odds2 > 2) {
        odds2 = '+' + Math.ceil((Math.round(odds2 * 100))/25)*25
    }
    if (odds2 < 2) {
        odds2 = '-' + Math.ceil(((2 - odds2 + 1) * 100)/25)*25
    }
    console.log(odds1, odds2)
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

game1Hover () {
    this.setState ({
        gamehover: true
    })
}

game1Leave () {
    this.setState ({
        gamehover: false
    })
}

game2Hover () {
    this.setState ({
        game1hover: true
    })
}

game2Leave () {
    this.setState ({
        game1hover: false
    })
}


    
render () {
    return (
    <div>
        <div>
        <div onMouseOver = {this.onMouseOver} onMouseLeave = {this.onMouseLeave} className = {this.state.hover ? 'selectedgamecontainer' : 'gamecontainer'}>
            <div onMouseOver = {this.game1Hover} onMouseLeave={this.game1Leave} className = {this.state.gamehover ? 'team1containerhover' : 'team1container'}>
                <div onClick = {() => this.props.onGameClick(this.state.team1, this.state.odds1)} className = 'team1'>{this.state.team1}</div>
                <div className = 'odds1'>{this.state.odds1}</div>
            </div>
            <div className = 'versus'>vs</div>
            <div onMouseOver = {this.game2Hover} onMouseLeave={this.game2Leave} className = {this.state.game1hover ? 'team2containerhover' : 'team2container'}>
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