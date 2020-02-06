import { IAction, IMeta } from '../utilities/types'
import { TURN, IScoreTurnAction } from './round.types'



export const startTurnAC = () : IAction => {
  return {
    type: TURN.START,
    payload: {}
  }
}

export const pauseTurnAC = () : IAction => {
  return {
    type: TURN.PAUSE,
    payload: {}
  }
}

export const resumeTurnAC = () : IAction => {
  return {
    type: TURN.RESUME,
    payload: {}
  }
}

export const scoreTurnAC = (
  score : number,
  totalScore: number,
  meta: IMeta,
  dispatched: boolean = false
) : IScoreTurnAction => {
  return {
    type: TURN.SCORE,
    payload: {
      score: score,
      totalScore: totalScore
    },
    error: false,
    meta: {
      ...meta,
      dispatched: dispatched
    }
  }
}

export const endTurnAC = () : IAction => {
  return {
    type: TURN.END,
    payload: {}
  }
}

