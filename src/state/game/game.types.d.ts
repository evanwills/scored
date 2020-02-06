import { IPayload, IAction } from '../utilities/types'

/**
 * Action types
 */
export enum GAME_AT {
  INITIALISE = 'INITIALISE_GAME',
  START = 'START_GAME',
  PAUSE = 'PAUSE_GAME',
  RESUME = 'RESUME_GAME',
  END = 'END_GAME'
}


export interface IResumeGamePayload extends IPayload {
  pauseDuration: number
}

export interface IResumeGameAction extends IAction {
  type: GAME_AT,
  payload: IResumeGamePayload
}
