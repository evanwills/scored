
import { Middleware } from 'redux'
import { GAME_STATE, GamePlayers, IConfigGame } from '../utilities/types'
import { GAME__AT } from './game.types'
import { gameMachineState__AC, initialiseGameFull__AC } from './game.action'
import { initialPause } from './game.initial-state'
import error__AC from '../errors/error.action'
import { ERROR__AT } from '../errors/error.types'
import { GAME_PLAYERS__AT } from '../player/player.types'
import { getItemById } from '../utilities/item-by-id.utils'
import { initialRound } from '../round/round.initital-states'
import { incrementGameIndex__AC } from '../pastGames/past-game.actions'

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
  const { currentGame, gameConfigs, pastGames } = store.getState()
  const { stateMachine } = currentGame

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
        stateMachine !== GAME_STATE.GAME_FINALISED &&
        stateMachine !== GAME_STATE.CHOOSING_GAME
      ) {
        return next(
          error__AC(
            [stateMachine, GAME_STATE.GAME_INITIALISED],
            ERROR__AT.STATE_TRANSITION_FAILURE,
            action
          )
        )
      }

      // if configID === -1 assume game is a rematch
      const gameConfig : IConfigGame = (action.payload.id === -1) ? currentGame.config : getItemById(action.payload.id, gameConfigs)

      const players : GamePlayers = (currentGame.players.playersSeatOrder.length > 1) ? currentGame.players.playersSeatOrder : []

      store.dispatch(incrementGameIndex__AC())

      return next(
        initialiseGameFull__AC(
          {
            id: pastGames.index + 1,
            end: -1,
            confg: gameConfig,
            players: players,
            pause: initialPause,
            round: initialRound,
            scores: [],
            start: -1,
            stateMachine: GAME_STATE.GAME_INITIALISED
          }
        )
      )

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
                'because you need more than one player to start a game'
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
        return next(
          error__AC(
            [
              stateMachine,
              GAME_STATE.PLAYING_GAME,
              'game is not currently playing'
            ],
            ERROR__AT.STATE_TRANSITION_FAILURE_SPECIAL,
            action
          )
        )
      } else {
        return next(action)
      }

    case GAME__AT.RESUME:
      if (stateMachine !== GAME_STATE.GAME_PAUSED) {
        return next(
          error__AC(
            [
              stateMachine,
              GAME_STATE.PLAYING_GAME,
              'game is not currently paused'
            ],
            ERROR__AT.STATE_TRANSITION_FAILURE_SPECIAL,
            action
          )
        )
      }

    case GAME__AT.END:
      if (stateMachine === GAME_STATE.PLAYING_GAME) {
        next(action)
      } else {
        throw new Error('Cannot end game while game is not being played')
      }
  }
}


export default gameMiddleWare
