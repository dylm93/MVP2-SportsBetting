import React from 'react';
import Game from './Game.jsx';

const Games = (props) => {
    return (
    <div className = 'site'>
        {props.games.map((game, index) => 
        <Game sport = {props.sport} game = {game} key = {index} onGameClick = {props.onGameClick} /> )}
    </div>
    )
};

export default Games;