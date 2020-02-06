
import { IAction, ITurnComplete } from '../utilities/types'

export const SCORE = {
  ADD: 'Add score',
  UPDATE: 'Update past score'
}

/**
 * Create an action to add a completed round's scores
 *
 * @param playedTurns list of turns from the most recently
 *                    played round
 */
export const scoresAddAC = (playedTurns: ITurnComplete[]) : IAction => {
  return {
    type: SCORE.ADD,
    payload: {
      turns: playedTurns
    }
  }
}

/**
 * Create an action to update the score of a specific action
 *
 * @param turnID
 * @param newScore
 */
export const scoresUpdateAC = (turnID: number, newScore: number) : IAction => {
  return {
    type: SCORE.ADD,
    payload: {
      id: turnID,
      score: newScore
    }
  }
}
