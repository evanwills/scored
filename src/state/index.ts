import { Store, createStore, combineReducers, applyMiddleware } from 'redux'

// -------------------------------------
// START: reducer imports


import { pause__R } from './game/pause.reducer'
import { gameEnd__R, gameID__R, currentGameConfig__R, gameStart__R, gameState__R } from './game/game.reducer'
import gamePlayer__R from './game/game-players.reducer'
import allPlayer__R from './player/player.reducer'
import { scores__R } from './score/scores.reducer'
import { round__R } from './round/round.reducer'
import { pastGame__R } from './past-games/past-games.reducer'
import gameConfigs__R from './game-config/game-config.reducer'
import errorLog__R from './errors/errorLog.reducer'
import uiState__R from './ui-state/ui-state.reducer'
import appSettings__R from './app-settings/app-settings.reducer'


//  END:  reducer imports
// -------------------------------------
// START: middleware imports


import stampAction__MW from './middleware/stamp-action.middleware'
import logger__MW from './middleware/logger.middleware'
import gameConfig__MW from './game-config/game-config.middleware'
import game__MW from './game/game.middleware'
import pauseResume__MW from './game/pause-resume.middleware'
import round__MW from './round/round.middleware'
import allPlayers__MW from './player/player.middleware'
import gamePlayers__MW from './game/game-players.middleware'
import initialState from './initial-state'
import errorReporter from './errors/error.reporter'
import stateMachine__MW from './middleware/state-machine.middleware'


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
      config: currentGameConfig__R,
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
    stampAction__MW,
    logger__MW,
    allPlayers__MW,
    gameConfig__MW,
    game__MW, // handles validating game state transitions
    gamePlayers__MW,
    pauseResume__MW,
    round__MW,
    stateMachine__MW
  )
)

const unsubscribeErrorreporter = scoredStore.subscribe(errorReporter(scoredStore))



//  END:  creating redux store
// -------------------------------------

export default scoredStore
