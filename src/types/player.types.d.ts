import { IPayload } from './types'


export enum GAME_PLAYERS__AT {
  ADD = 'Add player to game',
  UPDATE_NAME = 'Update game player\'s name',
  UPDATE_SCORE = 'Update player\'s score and rank',
  REARRANGE = 'Change the seating order of players',
  DEACTIVATE = 'Stop player from having turns',
  REMOVE = 'Remove player who hasn\'t had a turn'
}

export enum ALL_PLAYERS__AT {
  ADD = 'Add new player',
  UPDATE = 'Update player\'s name',
  DELETE = 'Remove player from list'
}

export interface IAddPlayerToGamePayload extends IPayload {
  id: number
}
