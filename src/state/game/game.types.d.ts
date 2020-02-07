import { IPayload, IAction, IPause } from '../utilities/types'
import { Reducer } from 'redux'

/**
 * Action types
 */
export enum GAME__AT {
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
  type: GAME__AT,
  payload: IResumeGamePayload
}

export interface IResumeGameReducer extends Reducer {
  (state: IPause, action: IActionStamped | IResumeGameAction) : IPause
}
