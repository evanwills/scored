import { TURN, ROUND } from './round.types'
import { endTurnAC, startTurnAC, scoreTurnAC } from './turns.action'
import { initialiseRoundAC, finaliseRoundAC } from './round.action'
import { getTotalScore } from '../score/score.utils'
import { IWholeScored, IActionStamped } from '../utilities/types'
import { Middleware } from 'redux'

export const roundMiddleWare : Middleware = (store) => (next) => (action) => {
  const currentState : IWholeScored = store.getState()
  const { config, end, players, round, scores } = currentState.currentGame

  switch (action.type) {
    case TURN.SCORE:
      // We don't want an infinite loop so lets add
      if (typeof (action.meta.dispatched as IActionStamped) === 'undefined') {
        store.dispatch(
          scoreTurnAC(
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
        store.dispatch(endTurnAC())

        if (end === null) {
          return next(startTurnAC())
        } else {
          return next(finaliseRoundAC())
        }
      }
      break

    case TURN.START:
      if (round.playersInOrder.length === 0) {
        // We've reached the end of the current round
        // Better do all the adding up for this round
        store.dispatch(finaliseRoundAC())

        // Better get everything ready for the next round
        store.dispatch(
          initialiseRoundAC(
            players.playersSeatOrder,
            config.playOrder
          )
        )
        // Now we can let the start action do its thing
      }
      break

    case TURN.END:
      if (round.playersInOrder.length === (players.all.length - 1)) {
        return next(action)
      }
      break

    case ROUND.INITIALISE:
      break

    case ROUND.ADD_TURN:
      break

    case ROUND.UPDATE_TURN:
      break

    case ROUND.FINALISE:
      break;
  }

}
