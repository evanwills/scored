import { Middleware } from 'redux'

import { IMeta } from '../types/scored'
import { TURN__AT } from '../types/scored-enums'
import { getTotalScore } from '../score/score.utils'

import { endTurn__AC, startTurn__AC, scoreTurn__AC } from '../round/turns.action'
import { initialiseRound__AC, finaliseRound__AC } from '../round/round.action'


const round__MW : Middleware = (store) => (next) => (action) => {
  // const currentState : IWholeScored = store.getState()
  // const { config, end, players, round, scores } = currentState.currentGame
  const { config, end, players, round, scores } = store.getState()

  switch (action.type) {
    case TURN__AT.SCORE:
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

    // case ROUND__AT.INITIALISE:
    //   return next(action)

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
