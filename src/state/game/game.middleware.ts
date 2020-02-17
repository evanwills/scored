
import { Middleware } from 'redux'

import { GamePlayers, IConfigGame, IMeta } from '../types/scored'
import { GAME_STATE, ERROR__AT, GAME__AT, ROUND__AT, TURN__AT, ROUND_STATE } from '../types/scored-enums'

import { gameMachineState__AC, initialiseGameFull__AC } from '../game/game.action'
import { initialPause } from '../game/game.initial-state'
import error__AC from '../errors/error.action'
import { getItemById } from '../utilities/item-by-id.utils'
import { initialRound } from '../round/round.initital-states'
import { incrementGameIndex__AC, PAST_GAME__AT } from '../pastGames/past-game.actions'
import { initialiseRound__AC, roundStateMachine__AC } from '../round/round.action'

// import { gameConfigs, pastGames} from './game.mocs'

/**
 * game__MW does validation for game related actions,
 * ensuring that actions don't cause the app to move into
 * an invalid state
 *
 * It also provides any extra bits of state a reducer
 * might need
 *
 * @param store
 */
const game__MW : Middleware = (store) => (next) => (action) => {
  const { currentGame, gameConfigs, pastGames } = store.getState()
  const { config, players, stateMachine } = currentGame

  switch (action.type) {
    // NOTE: This switch has no default because each case has an IF
    //       statement. Thus to reduce code duplication we return
    //       next() at the end of the function

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
            action,
            44,
            'game.middleware.ts'
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
            action,
            61,
            'game.middleware.ts'
          )
        )
      }

      // if configID === -1 assume game is a rematch
      const gameConfig : IConfigGame = (action.payload.id === -1) ? config : getItemById(action.payload.id, gameConfigs)

      const gamePlayers : GamePlayers = (players.playersSeatOrder.length > 1) ? players.playersSeatOrder : []

      store.dispatch(incrementGameIndex__AC())

      return next(
        initialiseGameFull__AC(
          {
            id: pastGames.index + 1,
            end: -1,
            config: gameConfig,
            players: gamePlayers,
            pause: initialPause,
            round: initialRound,
            scores: [],
            start: -1,
            stateMachine: GAME_STATE.GAME_INITIALISED
          },
          action.meta
        )
      )

    case GAME__AT.ADD_PLAYER:
    case GAME__AT.MOVE_PLAYER:
    // case GAME_PLAYERS__AT.DEACTIVATE:
    case GAME__AT.REMOVE_PLAYER:
      // These four changes effect the state machine's state
      // So they need to be handled differently
      if (
        stateMachine !== GAME_STATE.GAME_PAUSED &&
        stateMachine !== GAME_STATE.MANAGE_PLAYERS &&
        stateMachine !== GAME_STATE.GAME_INITIALISED
      ) {
        return next(
          error__AC(
            [stateMachine, GAME_STATE.MANAGE_PLAYERS],
            ERROR__AT.STATE_TRANSITION_FAILURE,
            action,
            113,
            'game.middleware.ts'
          )
        )
      } else {
        return next(action)
      }

    // case GAME_PLAYERS__AT.UPDATE_SCORE:
    //   Not sure how to implement this or even whether it
    //   should be implemented


    case GAME__AT.START:
      console.log('inside game__MW > GAME__AT.START (' + GAME__AT.START + ')')
      if (stateMachine === GAME_STATE.MANAGE_PLAYERS) {
        console.log('players.playersSeatOrder.length:', players.playersSeatOrder.length)
        console.log('action.meta:', action.meta)
        console.log('(' + players.playersSeatOrder.length + ' >= 2):', (players.playersSeatOrder.length >= 2))
        console.log('(' + action.meta.dispatch + ' >= FALSE):', (action.meta.dispatch === false))
        if (players.playersSeatOrder.length >= 2 && typeof (action.meta as IMeta).dispatched === 'undefined') {
          console.log('dispatching gameMachineState__AC(GAME_STATE.PLAYING_GAME)')
          console.log('dispatching primary action')
          store.dispatch({
            ...action,
            meta: {
              ...action.meta,
              dispatched: true
            }
          })
          console.log('dispatching initialiseRound__AC()')
          console.log(initialiseRound__AC(
            players.playersSeatOrder,
            config.playOrder,
            action.payload.id
          ))
          store.dispatch(initialiseRound__AC(
            players.playersSeatOrder,
            config.playOrder,
            action.payload.id
          ))
          console.log('executing final action: roundStateMachine__AC(ROUND_STATE.ROUND_INITIALISED)')
          next(roundStateMachine__AC(ROUND_STATE.ROUND_INITIALISED))
        } else {
          return next(
            error__AC(
              [
                stateMachine,
                GAME_STATE.MANAGE_PLAYERS,
                'because you need more than one player to start a game'
              ],
              ERROR__AT.STATE_TRANSITION_FAILURE_SPECIAL,
              action,
              153,
              'game.middleware.ts'
            )
          )
        }
      } else {
        return next(
          error__AC(
            [stateMachine, GAME_STATE.PLAYING_GAME],
            ERROR__AT.STATE_TRANSITION_FAILURE,
            action,
            168,
            'game.middleware.ts'
          )
        )
      }

    case GAME__AT.PAUSE:
    // case ROUND__AT.INITIALISE:
    // case ROUND__AT.ADD_TURN:
    // case ROUND__AT.UPDATE_TURN:
    // case ROUND__AT.FINALISE:
    // case TURN__AT.START:
    // case TURN__AT.SCORE:
    // case TURN__AT.SCORE_END:
    // case TURN__AT.SCORE_END_GAME:
    // case TURN__AT.END:
    // case TURN__AT.PAUSE:
    // case TURN__AT.RESUME:
      if (stateMachine !== GAME_STATE.PLAYING_GAME) {
        return next(
          error__AC(
            [
              stateMachine,
              GAME_STATE.PLAYING_GAME,
              'game is not currently playing'
            ],
            ERROR__AT.STATE_TRANSITION_FAILURE_SPECIAL,
            action,
            191,
            'game.middleware.ts'
          )
        )
      }
      break;

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
            action,
            209,
            'game.middleware.ts'
          )
        )
      }
      break;

    case GAME__AT.END:
      if (stateMachine === GAME_STATE.PLAYING_GAME) {
        return next(action)
      } else {
        return next(
          error__AC(
            [
              stateMachine,
              GAME_STATE.PLAYING_GAME,
              'Cannot end game while game is not being played'
            ],
            ERROR__AT.STATE_TRANSITION_FAILURE_SPECIAL,
            action,
            229,
            'game.middleware.ts'
          )
        )
      }

    case PAST_GAME__AT.INCREMENT_INDEX:
      if (stateMachine !== GAME_STATE.CHOOSING_GAME && stateMachine !== GAME_STATE.GAME_FINALISED) {
        return next(
          error__AC(
            [
              stateMachine,
              GAME_STATE.CHOOSING_GAME,
              'Cannot increment the past game index unless a new game is being initialised'
            ],
            ERROR__AT.STATE_TRANSITION_FAILURE_SPECIAL,
            action,
            246,
            'game.middleware.ts'
          )
        )
      }
      break;

    case PAST_GAME__AT.ADD:
      if (stateMachine !== GAME_STATE.GAME_ENDED) {
        return next(
          error__AC(
            [
              stateMachine,
              GAME_STATE.CHOOSING_GAME,
              'Cannot archive the current game until it has ended'
            ],
            ERROR__AT.STATE_TRANSITION_FAILURE_SPECIAL,
            action,
            266,
            'game.middleware.ts'
          )
        )
      }
  }
  return next(action)
}


export default game__MW
