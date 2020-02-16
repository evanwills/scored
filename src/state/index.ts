import { Store, createStore, combineReducers, applyMiddleware } from 'redux'

// -------------------------------------
// START: reducer imports


import { pause__R } from './game/pause.reducer'
import { gameEnd__R, gameID__R, gameConfig__R, gameStart__R, gameState__R } from './game/game.reducer'
import { gamePlayer__R, allPlayer__R } from './player/player.reducer'
import { scores__R } from './score/scores.reducer'
import { round__R } from './round/round.reducer'
import { pastGame__R } from './pastGames/past-games.reducer'
import gameConfigs__R from './gameConfig/gameConfig.reducer'
import errorLog__R from './errors/errorLog.reducer'
import uiState__R from './ui-state/ui-state.reducer'
import appSettings__R from './app-settings/app-settings.reducer'


//  END:  reducer imports
// -------------------------------------
// START: middleware imports


import addMetaToAction__MW from './middleware/add-now-to-action.middleware'
import logger__MW from './middleware/logger.middleware'
import gameConfig__MW from './gameConfig/gameConfig.middleware'
import gameMiddleWare from './game/game.middleware'
import pauseResume__MW from './game/pause-resume.middleware'
import round__MW from './round/round.middleware'
import { allPlayers__MW, gamePlayers__MW } from './player/player.middleware'
import initialState from './initial-state'


//  END:  middleware imports
// -------------------------------------
// START: creating redux store


const scoredStore : Store = createStore(
  combineReducers({
    allPlayers: allPlayer__R,
    appSettings: appSettings__R,
    currentGame: combineReducers({
      id: gameID__R,
      end: gameEnd__R,
      config: gameConfig__R,
      pause: pause__R,
      players: gamePlayer__R,
      round: round__R,
      scores: scores__R,
      start: gameStart__R,
      stateMachine: gameState__R
    }),
    errorLog: errorLog__R,
    gameConfigs: gameConfigs__R,
    pastGames: pastGame__R,
    uiState: uiState__R
  }),
  initialState,
  applyMiddleware(
    addMetaToAction__MW,
    logger__MW,
    allPlayers__MW,
    gameConfig__MW,
    gameMiddleWare, // handles validating game state transitions
    gamePlayers__MW,
    pauseResume__MW,
    round__MW
  )
)



//  END:  creating redux store
// -------------------------------------

export default scoredStore
