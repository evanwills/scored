import {IPayload, IPlayerSimple, IAction} from '../utilities/types'


export enum ROUND__AT {
  INITIALISE = 'INITIALISE_ROUND',
  ADD_TURN = 'ADD_TURN_TO_ROUND',
  UPDATE_TURN = 'UPDATE_ROUND_TURN',
  FINALISE = 'FINALISE_ROUND'
}

export enum TURN__AT {
  START = 'START_TURN',
  SCORE = 'SCORE_TURN',
  SCORE_END = 'SCORE_TURN_AND_END_AFTER_ROUND',
  SCORE_END_GAME = 'SCORE_TURN_AND_END',
  END = 'END_TURN',
  PAUSE = 'PAUSE_TURN',
  RESUME = 'RESUME_TURN'
}

export interface IPlayerPayload extends IPayload {
  playOrder: PLAY_ORDER,
  players: IPlayerSimple[]
}

export interface IPlayerAction extends IAction {
  type: ROUND,
  payload: IPlayerPayload
}


export interface IScoreTurnPayload extends IPayload {
  score: number,
  totalScore: number
}
export interface IScoreTurnAction extends IAction {
  type: TURN,
  payload: IScoreTurnPayload
}
