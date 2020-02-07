import { TURN__AT, ROUND__AT } from './round.types'
import { endTurn__AC, startTurn__AC, scoreTurn__AC } from './turns.action'
import { initialiseRound__AC, finaliseRound__AC } from './round.action'
import { getTotalScore } from '../score/score.utils'
import { IWholeScored, IActionStamped } from '../utilities/types'
import { Middleware } from 'redux'

export const roundMiddleWare : Middleware = (store) => (next) => (action) => {
  const currentState : IWholeScored = store.getState()
  const { config, end, players, round, scores } = currentState.currentGame

  switch (action.type) {
    case TURN__AT.SCORE:
      // We don't want an infinite loop so lets add
      if (typeof (action.meta.dispatched as IActionStamped) === 'undefined') {
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

        if (end === null) {
          return next(startTurn__AC())
        } else {
          return next(finaliseRound__AC())
        }
      }
      break

    case TURN__AT.START:
      if (round.playersInOrder.length === 0) {
        // We've reached the end of the current round
        // Better do all the adding up for this round
        store.dispatch(finaliseRound__AC())

        // Better get everything ready for the next round
        store.dispatch(
          initialiseRound__AC(
            players.playersSeatOrder,
            config.playOrder
          )
        )
        // Now we can let the start action do its thing
      }
      break

    case TURN__AT.END:
      if (round.playersInOrder.length === (players.all.length - 1)) {
        return next(action)
      }
      break

    case ROUND__AT.INITIALISE:
      break

    case ROUND__AT.ADD_TURN:
      break

    case ROUND__AT.UPDATE_TURN:
      break

    case ROUND__AT.FINALISE:
      break;
  }

}
