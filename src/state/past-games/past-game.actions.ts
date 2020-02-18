import { IAction, IGameFinished } from '../types/scored'

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

export const addFinalisedGameIndex__AC = (game: IGameFinished) : IAction => {
  return {
    type: PAST_GAME__AT.ADD,
    payload: {
      endedGame: game
    },
    error: false,
    meta: { now: -1 }
  }
}
