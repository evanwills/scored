import { Store, createStore, combineReducers, applyMiddleware } from 'redux'

// -------------------------------------
// START: reducer imports


import { pause__R } from './game/pause.reducer'
import { gameStartEnd__R, gameID__R, gameConfig__R, gameState__R } from './game/game.reducer'
import { gamePlayer__R, allPlayer__R } from './player/player.reducer'
import { scores__R } from './score/scores.reducer'
import { round__R } from './round/round.reducer'
import { pastGame__R } from './pastGames/past-games.reducer'
import gameConfigs__R from './gameConfig/gameConfig.reducer'
import errorLog__R from './errors/errorLog.reducer'
import uiState__R from './ui-state/ui-state.reducer'


//  END:  reducer imports
// -------------------------------------
// START: middleware imports


import addMetaToActionMiddleware from './middleware/add-now-to-action.middleware'
import { pauseResumeMiddleware } from './game/pause-resume.middleware'
import loggerMiddleware from './middleware/logger.middleware'
import roundMiddleWare from './round/round.middleware'
import gameConfigMiddleware from './gameConfig/gameConfig.middleware'
import gameMiddleWare from './game/game.middleware'
import initialState from './initial-state'


//  END:  middleware imports
// -------------------------------------
// START: creating redux store


const scoredStore : Store = createStore(
  combineReducers({
    allPlayers: allPlayer__R,
    currentGame: combineReducers({
      id: gameID__R,
      end: gameStartEnd__R,
      config: gameConfig__R,
      pause: pause__R,
      players: gamePlayer__R,
      round: round__R,
      scores: scores__R,
      start: gameStartEnd__R,
      state: gameState__R
    }),
    errorLog: errorLog__R,      // fully implemented
    gameConfigs: gameConfigs__R, // fully implemented
    pastGames: pastGame__R,
    uiState: uiState__R
  }),
  initialState,
  applyMiddleware(
    addMetaToActionMiddleware,
    // crashReporter,
    loggerMiddleware,
    gameConfigMiddleware,
    gameMiddleWare, // handles validating game state transitions
    pauseResumeMiddleware,
    roundMiddleWare
  )
)

//  END:  creating redux store
// -------------------------------------

export default scoredStore
