import { Store, createStore, combineReducers, applyMiddleware } from 'redux'

// -------------------------------------
// START: reducer imports


import { gameConfigReducer, DefaultConfigReducer } from './game/config.reducer'
import { startReducer, endReducer } from './game/start-end.reducer'
import { pauseReducer } from './game/pause.reducer'
import { gamePlayerReducer, allPlayerReducer } from './player/player.reducer'
import { scoresReducer } from './score/scores.reducer'
import { roundReducer } from './round/round.reducer'
import { pastGameReducer } from './game/past-games.reducer'


//  END:  reducer imports
// -------------------------------------
// START: middleware imports


import { addNowToMetaMiddleware } from './middleware/add-now-to-action.middleware'
import { pauseResumeMiddleware } from './game/pause-resume.middleware'
import { loggerMiddleware } from './middleware/logger.middleware'
import crashReporter from './middleware/crash-reporter.middleware'
import { roundMiddleWare } from './round/round.middleware'


//  END:  middleware imports
// -------------------------------------
// START: creating redux store


export const store : Store = createStore(
  combineReducers({
    allPlayers: allPlayerReducer,
    currentGame: combineReducers({
      end: startReducer,
      config: gameConfigReducer,
      pause: pauseReducer,
      players: gamePlayerReducer,
      round: roundReducer,
      scores: scoresReducer,
      start: endReducer,
    }),
    defautlConfig: DefaultConfigReducer,
    PastGames: pastGameReducer
  }),
  applyMiddleware(
    addNowToMetaMiddleware,
    crashReporter,
    loggerMiddleware,
    pauseResumeMiddleware,
    roundMiddleWare
  )
)

//  END:  creating redux store
// -------------------------------------
