import { Reducer } from 'redux'
import { GAME__AT, IResumeGameAction } from '../game/game.types'
import { IPause, IPauseLog, IPauseFailLog, IActionStamped, PAUSE_LOG_TYPE, GAME_STATE, IGameActive, IPlayerSimple } from '../utilities/types'
import { ERROR__AT } from '../errors/error.types'
import { initialPause, initialGame } from './game.initial-state'
import { initialRound } from '../round/round.initital-states'
import { pause__R } from './pause.reducer'
import { round__R } from '../round/round.reducer'
import { ROUND__AT, TURN__AT } from '../round/round.types'
import { GAME_PLAYERS__AT } from '../player/player.types'
import { gamePlayer__R } from '../player/player.reducer'


export const game__R : Reducer = (state = initialPause, action) => {
  switch (action.type) {
    case GAME__AT.CHOOSING:
      if (
        state.stateMachine === GAME_STATE.GAME_FINALISED
        || state.stateMachine === GAME_STATE.NO_GAME
      ) {
        return {
          ...initialGame,
          stateMachine: GAME_STATE.CHOOSING_GAME
        }
      } else {
        throw new Error('Cannot choose a new game while a game is already in progress')
      }

    case GAME__AT.INITIALISE:
      if (state.stateMachine === GAME_STATE.GAME_FINALISED) {
        return {
          id: action.payload.id,
          end: -1,
          confg: state.config,
          players: state.players,
          round: initialRound,
          start: -1,
          stateMachine: GAME_STATE.GAME_INITIALISED
        }
      } else if (state.stateMachine === GAME_STATE.CHOOSING_GAME) {
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
      if (
        state.stateMachine === GAME_STATE.GAME_PAUSED ||
        state.stateMachine === GAME_STATE.GAME_INITIALISED ||
        state.stateMachine === GAME_STATE.MANAGE_PLAYERS
      ) {
        const machine = (state.stateMachine === GAME_STATE.GAME_PAUSED) ? GAME_STATE.GAME_PAUSED : GAME_STATE.MANAGE_PLAYERS

        return {
          ...state,
          players: gamePlayer__R(state.players, action),
          stateMachine: machine
        }
      }

    case GAME_PLAYERS__AT.UPDATE_NAME:
    case GAME_PLAYERS__AT.UPDATE_SCORE:
      return {
        ...state,
        players: gamePlayer__R(state.players, action)
      }

    case GAME__AT.START:
      if (state.stateMachine === GAME_STATE.MANAGE_PLAYERS) {
        if (state.players.playersSeatOrder.length >= 2) {
          return {
            ...state,
            start: action.meta.now,
            stateMachine: GAME_STATE.PLAYING_GAME
          }
        } else {
          throw new Error('Cannot start game with less than two players')
        }
      } else {
        throw new Error('Cannot start game when in ' + state.stateMachine + ' state')
      }

    case GAME__AT.PAUSE:
      if (state.stateMachine !== GAME_STATE.PLAYING_GAME) {
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

    case ROUND__AT.INITIALISE:
    case ROUND__AT.FINALISE:
    case TURN__AT.START:
    case TURN__AT.SCORE:
      return {
        ...state,
        round: round__R(state.round, action)
      }

    default:
      return state
  }
}
