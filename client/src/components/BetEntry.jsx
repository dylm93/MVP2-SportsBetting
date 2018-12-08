import React from 'react';

const BetEntry = (props) => (
    <div>
        <div className = 'openbet-gameid'>{props.bet.gameid}
        </div>
        {props.bet.team} :
        ${props.bet.amount}
    </div>
)

export default BetEntry;