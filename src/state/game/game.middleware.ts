
import { Middleware } from 'redux'
import { GAME_STATE, IActionStamped } from '../utilities/types'
import { GAME__AT } from './game.types'
import { gameMachineState__AC, initialiseGameFull__AC } from './game.action'
import {
  initialPause,
  initialGamePlayers,
  intialGameConfig,
  initialGame
} from './game.initial-state'
import { error__AC } from '../errors/error.action'
import { ERROR__AT } from '../errors/error.types'
import { GAME_PLAYERS__AT } from '../player/player.types'

/**
 * gameMiddleware does validation for game related actions,
 * ensuring that actions don't cause the app to move into
 * an invalid state
 *
 * It also provides any extra bits of state a reducer
 * might need
 *
 * @param store
 */
const gameMiddleWare : Middleware = (store) => (next) => (action) => {
  const _currentState = store.getState()
  const { stateMachine } = _currentState.currentGame

  switch (action.type) {
    case GAME__AT.CHOOSING:
      if (
        stateMachine === GAME_STATE.GAME_FINALISED
        || stateMachine === GAME_STATE.NO_GAME
      ) {
        store.dispatch(action)
        return next(gameMachineState__AC(GAME_STATE.CHOOSING_GAME))
      } else {
        return next(
          error__AC(
            [stateMachine, GAME_STATE.CHOOSING_GAME],
            ERROR__AT.STATE_TRANSITION_FAILURE,
            action
          )
        )
      }

    case GAME__AT.INITIALISE:
      if (
        stateMachine !== GAME_STATE.GAME_FINALISED &&stateMachine !== GAME_STATE.CHOOSING_GAME) {
          return next(
            error__AC(
              [stateMachine, GAME_STATE.GAME_INITIALISED],
              ERROR__AT.STATE_TRANSITION_FAILURE,
              action
            )
          )
        }
        const gameConfig = (action.payload.id === -1) ? _currentState.currentGame.config : getGameConfigById(action.payload.id)
        store.dispatch(
          initialiseGameFull__AC(
            pastGames.index + 1,
            (action.payload.id === -1) ? _currentState.currentGame.config :
          )
        )
        next(
          {
            type: 'INCREMENT_PAST_GAME_INDEX',
            payload: {},
            error: false,
            meta: { now: -1 }
          }
        )
        return {
          id: action.payload.id,
          end: -1,
          confg: state.config,
          players: state.players,
          round: initialRound,
          start: -1,
          stateMachine: GAME_STATE.GAME_INITIALISED
        }
      } else if (stateMachine === GAME_STATE.CHOOSING_GAME) {
        return {
          ...initialGame,
          id: action.payload.id,
          confg: action.payload.config,
          stateMachine: GAME_STATE.GAME_INITIALISED
        }
      } else {
        throw new Error ('Cannot inititalise game due to game being in progress')
      }

    case GAME_PLAYERS__AT.ADD:
    case GAME_PLAYERS__AT.REARRANGE:
    case GAME_PLAYERS__AT.DEACTIVATE:
    case GAME_PLAYERS__AT.REMOVE:
      // These four changes effect the state machine's state
      // So they need to be handled differently
      if (stateMachine === GAME_STATE.GAME_PAUSED) {
        store.dispatch(action)
      } else if (
        stateMachine === GAME_STATE.GAME_INITIALISED ||
        stateMachine === GAME_STATE.MANAGE_PLAYERS
      ) {
        store.dispatch(action)
        return next(gameMachineState__AC(GAME_STATE.MANAGE_PLAYERS))
      } else {
        return next(
          error__AC(
            [stateMachine, GAME_STATE.MANAGE_PLAYERS],
            ERROR__AT.STATE_TRANSITION_FAILURE,
            action
          )
        )
      }

    // case GAME_PLAYERS__AT.UPDATE_SCORE:
    //   Not sure how to implement this or even whether it
    //   should be implemented


    case GAME__AT.START:
      if (stateMachine === GAME_STATE.MANAGE_PLAYERS) {
        if (currentGame.players.playersSeatOrder.length >= 2) {
          store.dispatch(action)
          return next(
            gameMachineState__AC(GAME_STATE.PLAYING_GAME)
          )
        } else {
          return next(
            error__AC(
              [
                stateMachine,
                GAME_STATE.MANAGE_PLAYERS,
                ' because you need more than one player to start a game'
              ],
              ERROR__AT.STATE_TRANSITION_FAILURE_SPECIAL,
              action
            )
          )
        }
      } else {
        return next(
          error__AC(
            [stateMachine, GAME_STATE.PLAYING_GAME],
            ERROR__AT.STATE_TRANSITION_FAILURE,
            action
          )
        )
      }

    case GAME__AT.PAUSE:
      if (stateMachine !== GAME_STATE.PLAYING_GAME) {
        throw new Error('Can\'t pause a game that is not being played')
      }
      return {
        ...state,
        pause: pause__R(state.pause, action),
        round: round__R(state.round, action),
        stateMachine: GAME_STATE.GAME_PAUSED
      }

    case GAME__AT.RESUME:
      if (state.stateMachine !== GAME_STATE.GAME_PAUSED) {
        throw new Error('Can\'t resume a game that is not paused')
      }
      return {
        ...state,
        pause: pause__R(state.pause, action),
        round: round__R(state.round, action),
        stateMachine: GAME_STATE.PLAYING_GAME
      }

    case GAME__AT.END:
      if (state.stateMachine === GAME_STATE.PLAYING_GAME) {
        return {
          ...state,
          end: action.meta.now,
          round: round__R(state.round, action),
          stateMachine: GAME_STATE.GAME_ENDED
        }
      } else {
        throw new Error('Cannot end game while game is not being played')
      }
}


export default gameMiddleWare
