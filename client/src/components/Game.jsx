import React from 'react';

class Game extends React.Component  {
    constructor(props) {
        super(props);
    this.state = {
        team1: '',
        team2: '',
        odds1: '',
        odds2: '',
        soccer: false,
        soccerOrOtherSport: null,
        hover: false,
        gamehover: false,
        game1hover: false,
        gameID: 0
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
    console.log ('sport:', this.props.sport)

    var game = this.props.game.split(`'`)
    
    var team1 = game[1].split(',')[0]
    var team2 = game[1].split(',')[1]
    var soccerOrOther = game[3].split(',');
    
    if(soccerOrOther.length === 2) {
    
    var odds1 = game[3].split(',')[0]
    var odds2 = game[3].split(',')[1]
    var gameID = `${this.props.sport}${game[4]}`
    console.log('gameID:', gameID)

    if (odds1 > 2) {
        odds1 = '+' + Math.ceil((Math.round(odds1 * 100 - 100))/10)*10
        if (odds1 === '2') {
            odds1 = '+' + 100;
        }
    }
    if (odds1 < 2) {
        var denominator = odds1 - 1;
        odds1 = Math.ceil((-100/denominator)/10)*10
        if (odds1 === '2') {
            odds1 = '+' + 100;
        }
    }
    if (odds1 === '2') {
        odds1= +100
    }

    if (odds2 > 2) {
        odds2 = '+' + Math.ceil((Math.round(odds2 * 100 - 100))/10)*10
        if (odds2 === 2) {
            odds2 = '+' + 100;
        }
    }
    if (odds2 < 2) {
        var denominator = odds2 - 1;
        odds2 = Math.ceil((-100/denominator)/10)*10;
        if (odds2 === 2) {
            odds2 = '+' + 100;
        }
    }
    if (odds2 === '2') {
        odds2 = '+' + 100;
    }

    console.log('odds', odds1, odds2)
    console.log('game:', game)
    this.setState ({
        team1: team1,
        team2: team2,
        odds1: odds1,
        odds2: odds2,
        soccerOrOtherSport: 'vs',
        soccer: false,
        gameID: gameID
    })
    
} else {
    var odds1 = game[3].split(',')[0]
    var odds2 = game[3].split(',')[1]
    var tie = game[3].split(',')[2]


    if (odds1 > 2) {
        odds1 = '+' + Math.ceil((Math.round(odds1 * 100 - 100))/10)*10
    }
    if (odds1 < 2) {
        var denominator = odds1 - 1;
        odds1 = Math.ceil((-100/denominator)/10)*10
    }
    if (odds1 === 2) {
        odds1= +100
    }
    
    if (tie > 2) {
        tie = '+' + Math.ceil((Math.round(tie * 100 - 100))/10)*10
    }
    if (tie < 2) {
        var denominator = tie - 1;
        tie = Math.ceil((-100/denominator)/10)*10
    }
    if (tie === 2) {
        tie= +100
    }
    

    if (odds2 > 2) {
        odds2 = '+' + Math.ceil((Math.round(odds2 * 100 - 100))/10)*10
    }
    if (odds2 < 2) {
        var denominator = odds2 - 1;
        odds2 = Math.ceil((-100/denominator)/10)*10
    }

    if (odds2 === 2) {
        odds2 = +100
    }
    console.log('game:', game)
    this.setState ({
        team1: team1,
        team2: team2,
        odds1: odds1,
        odds2: odds2,
        soccerOrOtherSport: tie,
        soccer: true
    })
}
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
            <div>{this.state.gameID}</div>
            <div className = 'teamodds1' onMouseOver = {this.game1Hover} onMouseLeave={this.game1Leave}>
                <div onClick = {() => this.props.onGameClick(this.state.gameID, this.state.team1, this.state.odds1)} className = 'team1'>{this.state.team1}</div>
                <div className = 'odds1'>{this.state.odds1}</div>
            </div>
            {this.state.soccer? <div onClick = {() => this.props.onGameClick(`${this.state.team1} Tie ${this.state.team2}`, this.state.soccerOrOtherSport)} className = 'tie'> 
                Draw {this.state.soccerOrOtherSport}
            </div> : <div className = 'versus'>{this.state.soccerOrOtherSport}</div>}
            <div className = 'teamodds2' onMouseOver = {this.game2Hover} onMouseLeave={this.game2Leave}>
                <div onClick = {() => this.props.onGameClick(this.state.gameID, this.state.team2, this.state.odds2)} className = 'team2'>{this.state.team2}</div>
                <div className = 'odds2'>{this.state.odds2}</div>
            </div>
        </div>
        </div>
    </div>
    )
}
 
}

export default Game;