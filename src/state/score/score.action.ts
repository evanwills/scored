
import { IAction, ITurnComplete } from '../../types/types'

export const SCORE__AT = {
  ADD: 'Add score',
  UPDATE: 'Update past score'
}

/**
 * Create an action to add a completed round's scores
 *
 * @param playedTurns list of turns from the most recently
 *                    played round
 */
export const scoresAdd__AC = (playedTurns: ITurnComplete[]) : IAction => {
  return {
    type: SCORE__AT.ADD,
    payload: {
      turns: playedTurns
    },
    error: false,
    meta: {
      now: -1
    }
  }
}

/**
 * Create an action to update the score of a specific action
 *
 * @param turnID
 * @param newScore
 */
export const scoresUpdate__AC = (turnID: number, newScore: number) : IAction => {
  return {
    type: SCORE__AT.ADD,
    payload: {
      id: turnID,
      score: newScore
    },
    error: false,
    meta: {
      now: -1
    }
  }
}
