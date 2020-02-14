import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import scoredStore from './state/index'
import { initialiseGame__AC } from './state/game/game.action';
import { END_MODE, PLAY_ORDER } from './state/types/scored-enums';
import { newGameConf__AC } from './state/gameConfig/gameConfig.action'
import { addNewPlayer__AC } from './state/player/player.action'

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

scoredStore.dispatch(addNewPlayer__AC('Evan'))
scoredStore.dispatch(addNewPlayer__AC('Georgie'))
scoredStore.dispatch(addNewPlayer__AC('Mallee'))
scoredStore.dispatch(addNewPlayer__AC('Ada'))
scoredStore.dispatch(addNewPlayer__AC('Anika'))
scoredStore.dispatch(addNewPlayer__AC('Ryan'))

scoredStore.dispatch(newGameConf__AC({
  id: 1,
  active: true,
  allowNegative: false,
  endMode: END_MODE.CURRENT_PLAYER,
  minScore: 0,
  maxScore: 0,
  name: 'Quirkle',
  playOrder: PLAY_ORDER.SEATING_POSTION,
  scoreBonuses: false,
  trackTime: true
}))
scoredStore.dispatch(newGameConf__AC({
  id: 2,
  active: true,
  allowNegative: false,
  endMode: END_MODE.CURRENT_PLAYER,
  minScore: 0,
  maxScore: 0,
  name: 'Scrabble',
  playOrder: PLAY_ORDER.SEATING_POSTION,
  scoreBonuses: false,
  trackTime: true
}))
scoredStore.dispatch(initialiseGame__AC(1))
console.log(scoredStore.getState())
