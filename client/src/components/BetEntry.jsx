import React from 'react';

const BetEntry = (props) => (
    <div className = 'open-bet'>
        <div className = 'openbet-gameid'>{props.bet.gameid}
        </div>
        {props.bet.team} :
        ${props.bet.amount}
    </div>
)

export default BetEntry;