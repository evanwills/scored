import { IAction } from '../utilities/types'

export enum PAST_GAME__AT {
  INCREMENT_INDEX = 'INCREMENT_PAST_GAME_INDEX',
  ADD_FINALISED = 'ADD_FINALISED_GAME'
}

export const incrementGameIndex__AC = () : IAction => {
  return {
    type: PAST_GAME__AT.INCREMENT_INDEX,
    payload: {},
    error: false,
    meta: { now: -1 }
  }
}
