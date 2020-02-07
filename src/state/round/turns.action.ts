import { IAction, IMeta } from '../utilities/types'
import { TURN__AT, IScoreTurnAction } from './round.types'



export const startTurn__AC = () : IAction => {
  return {
    type: TURN__AT.START,
    payload: {},
    error: false,
    meta: {
      now: -1
    }
  }
}

export const pauseTurn__AC = () : IAction => {
  return {
    type: TURN__AT.PAUSE,
    payload: {},
    error: false,
    meta: {
      now: -1
    }
  }
}

export const resumeTurn__AC = () : IAction => {
  return {
    type: TURN__AT.RESUME,
    payload: {},
    error: false,
    meta: {
      now: -1
    }
  }
}

export const scoreTurn__AC = (
  score : number,
  totalScore: number,
  meta: IMeta,
  dispatched: boolean = false
) : IScoreTurnAction => {
  return {
    type: TURN__AT.SCORE,
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

export const endTurn__AC = () : IAction => {
  return {
    type: TURN__AT.END,
    payload: {},
    error: false,
    meta: {
      now: -1
    }
  }
}

