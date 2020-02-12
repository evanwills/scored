import { IAction } from '../../types/scored'

export enum PAST_GAME__AT {
  INCREMENT_INDEX = 'INCREMENT_PAST_GAME_INDEX',
  ADD = 'ADD_FINALISED_GAME'
}

export const incrementGameIndex__AC = () : IAction => {
  return {
    type: PAST_GAME__AT.INCREMENT_INDEX,
    payload: {},
    error: false,
    meta: { now: -1 }
  }
}
