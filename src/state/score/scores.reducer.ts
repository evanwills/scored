import { Reducer } from '../../node_modules/redux/index'
import { IAction, IGetTurns, ITurnComplete, SCORE_SORT_METHOD, TURN_SORT_FIELDS, FILTER_BY_PROP } from '../utilities/types'
import { SCORE } from '../actions/score.action'


// ========================================================
// START: Redux reducer



/**
 * score handles adding to the log of scores for each
 * players turn in the order that each turn occurs
 *
 * @param state  (slice of redux state) array of completed
 *               turn objects
 * @param action FSA compliant Redux action
 */
export const scoresReducer : Reducer = (state : ITurnComplete[] = [], action: IAction) => {
  switch (action.type) {
    case SCORE.ADD:
      return [...state, ...action.payload.turns]

    case SCORE.UPDATE:
      const {id, score} = action.payload
      return state.map((thisTurn : ITurnComplete) => {
        if (thisTurn.id === id) {
          return {
            ...thisTurn,
            score: {
              round: score,
              total: thisTurn.score.total - thisTurn.score.round + score
            }
          }
        } else {
          return thisTurn
        }
      })

    default:
      return state
  }
}



//  END:  Redux reducer
// ========================================================
