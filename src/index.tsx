import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// =================================================================
// START: state stuff

import { initialiseGame__AC, gameMachineState__AC, addPlayerToGame__AC, startGame__AC } from './state/game/game.action'
import { GAME_STATE } from './state/types/scored-enums'
import scoredStore from './state/index'
// import { newGameConf__AC } from './state/game-config/game-config.action';
import { movePlayerToGame__AC } from './state/player/player.action';
import { startTurn__AC } from './state/round/turns.action';

//  END:  state stuff
// =================================================================

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


scoredStore.dispatch(gameMachineState__AC(GAME_STATE.CHOOSING_GAME))
scoredStore.dispatch(initialiseGame__AC(1))

// Add Georgie to players
scoredStore.dispatch(addPlayerToGame__AC(2))
console.log(scoredStore.getState())
throw new Error()

// Add Evan to players
scoredStore.dispatch(addPlayerToGame__AC(1))

// Add Ada to players
scoredStore.dispatch(addPlayerToGame__AC(4))

// Add Mallee to players
scoredStore.dispatch(addPlayerToGame__AC(3))

// Move Mallee to first play position
scoredStore.dispatch(movePlayerToGame__AC(3,1))

// Start game
scoredStore.dispatch(startGame__AC(2))

// Start first turn
scoredStore.dispatch(startTurn__AC())


const { currentGame } = scoredStore.getState()
const { round } = currentGame
const { turns } = round

console.log('currentGame:', currentGame)
console.log('round:', round)
console.log('turns:', turns)
