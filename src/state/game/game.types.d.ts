import { IPayload, IAction, IPause } from '../utilities/types'
import { Reducer } from 'redux'

/**
 * Action types
 */
export enum GAME__AT {
  CHOOSING = 'CHOOSING_GAME',
  INITIALISE = 'INITIALISE_GAME',
  ADD_PLAYERS = 'ADD_PLAYERS',
  MOVE_PLAYER = 'MOVE_PLAYERS',
  REMOVE_PLAYER = 'REMOVE_PLAYER',
  START = 'START_GAME',
  PAUSE = 'PAUSE_GAME',
  RESUME = 'RESUME_GAME',
  END = 'END_GAME',
  STATE_MACHINE = 'UPDATE_STATE_MACHINE'
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
