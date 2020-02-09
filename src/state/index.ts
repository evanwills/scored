import { Store, createStore, combineReducers, applyMiddleware } from 'redux'

// -------------------------------------
// START: reducer imports


import { gameConfig__R, defaultConfig__R } from './game/config.reducer'
import { start__R, end__R } from './game/start-end.reducer'
import { pause__R } from './game/pause.reducer'
import { gamePlayer__R, allPlayer__R } from './player/player.reducer'
import { scores__R } from './score/scores.reducer'
import { round__R } from './round/round.reducer'
import { pastGame__R } from './game/past-games.reducer'


//  END:  reducer imports
// -------------------------------------
// START: middleware imports


import addNowToMetaMiddleware from './middleware/add-now-to-action.middleware'
import { pauseResumeMiddleware } from './game/pause-resume.middleware'
import loggerMiddleware from './middleware/logger.middleware'
// import crashReporter from './middleware/crash-reporter.middleware'
import { roundMiddleWare } from './round/round.middleware'


//  END:  middleware imports
// -------------------------------------
// START: creating redux store


export const store : Store = createStore(
  combineReducers({
    allPlayers: allPlayer__R,
    currentGame: combineReducers({
      end: start__R,
      config: gameConfig__R,
      pause: pause__R,
      players: gamePlayer__R,
      round: round__R,
      scores: scores__R,
      start: end__R,
    }),
    defautlConfig: defaultConfig__R,
    pastGames: pastGame__R
  }),
  applyMiddleware(
    addNowToMetaMiddleware,
    // crashReporter,
    loggerMiddleware,
    pauseResumeMiddleware,
    roundMiddleWare
  )
)

//  END:  creating redux store
// -------------------------------------
