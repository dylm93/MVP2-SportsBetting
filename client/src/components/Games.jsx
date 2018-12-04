import React from 'react';
import Game from './Game.jsx';

const Games = (props) => (
    <div className = 'site'>
        {props.games.map((game, index) => 
        <Game game = {game} key = {index} onGameClick = {props.onGameClick} /> )}
    </div>
);

export default Games;