import { Middleware } from 'redux'

import { IMeta, IWholeScored, IMetaStamped } from '../types/scored'
import { TURN__AT, ROUND__AT, ROUND_STATE, ERROR__AT, GAME_STATE } from '../types/scored-enums'
import { getTotalScore } from '../score/score.utils'

import { endTurn__AC, startTurn__AC, scoreTurn__AC } from '../round/turns.action'
import { initialiseRound__AC, finaliseRound__AC, roundStateMachine__AC } from '../round/round.action'
import error__AC from '../errors/error.action'

/**
 * Checks whether the game is in an appropriate state to carry out
 * required actions
 *
 * @param meta meta information useful to all actions
 */
const okAction = (meta: IMetaStamped) : boolean => {
  return (meta.gameState !== GAME_STATE.PLAYING_GAME &&
          meta.roundState !== ROUND_STATE.ROUND_TAKING_TURNS
  )
}

/**
 * round__MW() does all the work on validating the round state and
 * enhancing actions so they include all the data needed by their
 * reducers
 *
 * @param store Redux store
 */
const round__MW : Middleware = (store) => (next) => (action) => {
  console.log('inside round__MW()')

  const currentState : IWholeScored = store.getState()
  const { config, end, players, round, scores } = currentState.currentGame

  switch (action.type) {
    case TURN__AT.SCORE:
      if (!okAction(action.meta)) {
        return next(error__AC(
          [action.meta.gameState, action.meta.roundState],
          ERROR__AT.INVALID_ACTION,
          action,
          37,
          'round.middleware.ts'
        ))
      }
      // We don't want an infinite loop so lets add
      if (typeof (action.meta as IMeta).dispatched === 'undefined') {
        store.dispatch(
          scoreTurn__AC(
            action.payload.score,
            getTotalScore(
              round.turns.current.playerID,
              scores
            ),
            action.meta,
            true
          )
        )

        // Now that the score has been processed, we can end the turn
        store.dispatch(endTurn__AC())

        if (end === -1) {
          return next(startTurn__AC())
        } else {
          store.dispatch(finaliseRound__AC())
          return next(initialiseRound__AC(
            players.playersSeatOrder,
            config.playOrder
          ))
        }
      }
      break

    case TURN__AT.START:
      if (round.playersInOrder.length === 0) {
        if (round.turns.played.length > 0) {
          // We've reached the end of the current round
          // Better do all the adding up for this round
          store.dispatch(finaliseRound__AC())
        }

        // Better get everything ready for the next round
        return next(
          initialiseRound__AC(
            players.playersSeatOrder,
            config.playOrder
          )
        )
        // Now we can let the start action do its thing
      }
      break

    // case TURN__AT.END:
    //   if (round.playersInOrder.length === (players.playersSeatOrder.length - 1)) {
    //     return next(action)
    //   } else {
    //     return next(action)
    //   }
    //   break

    case ROUND__AT.INITIALISE:
      if (round.stateMachine !== ROUND_STATE.NO_ROUND && round.stateMachine !== ROUND_STATE.ROUND_FINALISED) {
        return next(
          error__AC(
            [round.stateMachine, ROUND_STATE.ROUND_INITIALISED],
            ERROR__AT.STATE_TRANSITION_FAILURE,
            action,
            104,
            'round.middleware.ts'
          )
        )
      } else {
        store.dispatch(roundStateMachine__AC(ROUND_STATE.ROUND_INITIALISED))
        return next(action)
      }

    // case ROUND__AT.ADD_TURN:
    //   return next(action)

    // case ROUND__AT.UPDATE_TURN:
    //   return next(action)

    // case ROUND__AT.FINALISE:
    //   return next(action)
  }

  return next(action)
}

export default round__MW
