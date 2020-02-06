
import { IAction, IGetTurns, ITurnComplete, SCORE_SORT_METHOD, TURN_SORT_FIELDS, FILTER_BY_PROP } from '../utilities/types'
import { pureSort, ICompare } from '../utilities/functional-sort'


// ========================================================
// START: public score related utilities



/**
 * get a callback function that can be passed to Array.filter()
 *
 * @param whichType which type of score (ITurn) should be returned
 * @param id        row or player UID to filter by
 */
export const filterByType = (whichType : FILTER_BY_PROP, id: number) => (item: ITurnComplete) : boolean => {
  return (item[whichType] === id)
}

/**
 * Sort a list of completed turns by round score, total
 * score or position in round
 *
 * This is  a pure function Sort occurs on a copy of the
 * original
 *
 * @param turns list of completed turns to be sorted
 * @param sortedBy the property they should be sorted by
 */
export const sortTurns = (
  turns: ITurnComplete[],
  sortedBy : SCORE_SORT_METHOD = SCORE_SORT_METHOD.order
) => {
  switch (sortedBy) {
    case SCORE_SORT_METHOD.round:
    case SCORE_SORT_METHOD.total:
      return pureSort(turns, sortTurnByScore(sortedBy))

    case SCORE_SORT_METHOD.order:
      return pureSort(turns, sortTurnByOther())

    default:
      return turns
  }
}

/**
 * Get all the turns for a player round.
 *
 * @param allScores all the scores (ITurns) recored so far
 * @param id        UID of the round to be retrieved
 * @param sortedBy  the order in which to retrieve the turns
 */
export const getPlayerTurns : IGetTurns = (
  allScores: ITurnComplete[],
  id: number,
  sortedBy : SCORE_SORT_METHOD = SCORE_SORT_METHOD.order
) : ITurnComplete[] => {
  return sortTurns(
    allScores.filter(
      filterByType(FILTER_BY_PROP.playerID, id)
    ),
    sortedBy
  )
}

/**
 * Get all the turns for a given round.
 *
 * @param allScores all the scores (ITurns) recored so far
 * @param id        UID of the round to be retrieved
 * @param sortedBy  the order in which to retrieve the turns
 */
export const getRoundTurns : IGetTurns = (
  allScores: ITurnComplete[],
  id: number,
  sortedBy : SCORE_SORT_METHOD = SCORE_SORT_METHOD.order
) : ITurnComplete[] => {
  return sortTurns(
    allScores.filter(
      filterByType(FILTER_BY_PROP.id, id)
    ),
    sortedBy
  )
}

/**
 * Get the cumulative score for a given player
 *
 * @param playerID ID for the player we want the score total for
 * @param allScores All the scores from all the player
 */
export const getTotalScore = (playerID : number, allScores: ITurnComplete[]) => {
  return allScores.filter(
    // get all the turns for this player
    (turn: ITurnComplete) => (turn.playerID === playerID)
  ).reduce(
    // accumulate the score
    (oldTotal: number, turn: ITurnComplete) => (oldTotal + turn.score.round)
    ,0
  )
}



//  END:  public score related utilities
// ========================================================
// START: local score related utilities



/**
 * get a callback function that can be passed to Array.sort()
 *
 * @param whichScore which score should the sort be based on
 */
const sortTurnByScore = (
  whichScore : SCORE_SORT_METHOD = SCORE_SORT_METHOD.round
) : ICompare => (
  turnA : ITurnComplete,
  turnB: ITurnComplete
) : number => {
  return turnB.score[whichScore] - turnA.score[whichScore]
}

const sortTurnByOther = (
  field : TURN_SORT_FIELDS = TURN_SORT_FIELDS.playOrder
) : ICompare => (
  turnA : ITurnComplete,
  turnB: ITurnComplete
) : number => {
  return turnA[field] - turnB[field]
}



//  END:  local score related utilities
// ========================================================
