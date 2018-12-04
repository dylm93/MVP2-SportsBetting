import React from 'react';

const BetEntry = (props) => (
    <div>
        {props.bet.team} :
        ${props.bet.amount}
    </div>
)

export default BetEntry;