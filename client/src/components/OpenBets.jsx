import React from 'react';
import BetEntry from './BetEntry.jsx';

const OpenBets = (props) => (
    <div>
        {props.bets.map((bet, index) => 
            <BetEntry bet = {bet} key = {index} /> )}
    </div>
)

export default OpenBets;