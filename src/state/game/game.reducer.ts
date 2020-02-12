import { Reducer } from 'redux'
import { GAME__AT } from '../../types/game.types'
import { GAME_STATE, IConfigGame } from '../../types/types'
// import { } from '../utilities/typegards'

import { intialGameConfig } from './game.initial-state'


export const gameID__R : Reducer = (state = -1, action) => {
  if (action.type === GAME__AT.INITIALISE && action.payload.id >= 1) {
    return action.payload.id
  } else {
    return state
  }
}

export const gameStartEnd__R : Reducer = (state : number = -1, action) : number => {
  switch (action.type) {
    case GAME__AT.END:
    case GAME__AT.START:
      if (action.meta.now >= 1) {
        return action.meta.now
      }
      break;
    case GAME__AT.INITIALISE:
      return -1
  }
  return state
}

// export const gameTurns__R : Reducer = (state: [], action) => {
// }

export const gameConfig__R : Reducer = (state : IConfigGame = intialGameConfig, action) : IConfigGame => {
  switch (action.type) {
    case GAME__AT.INITIALISE:
    case GAME__AT.CONFIG:
      return action.payload.config

    default:
      return state
  }
}

// export const gamePlayers__R : Reducer = (state, action) => {
// }

export const gameState__R : Reducer = (state : GAME_STATE = GAME_STATE.NO_GAME, action) => {
  switch (action.type) {
    case GAME__AT.STATE_MACHINE:
      return action.payload.stateMachine

    case GAME__AT.INITIALISE:
      return GAME_STATE.GAME_INITIALISED
  }
  return state
}
