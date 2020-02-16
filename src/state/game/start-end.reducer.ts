import { Reducer } from 'redux'
// import { IAction } from '../types/scored'
import { GAME_STATE, GAME__AT } from '../types/scored-enums'

import valueInEnum from '../utilities/value-in-enum'

export const start__R : Reducer = (state, action) => {
  if (action.type === GAME__AT.START) {
    const {now, gameState} = action.meta
    if (
      gameState === GAME_STATE.GAME_FINALISED
      || gameState === GAME_STATE.MANAGE_PLAYERS
    ) {
      return now
    } else {
      throw new Error('Cannot end the game if state is not ' + GAME_STATE.PLAYING_GAME + ' (current state: ' + action.meta.gameState + ')')
    }
  }
  return state
}


export const end__R : Reducer = (state, action) => {
  if (action.type === GAME__AT.END) {
    const {now, gameState} = action.meta
    if (gameState === GAME_STATE.PLAYING_GAME) {
      return now
    } else {
      throw new Error('Cannot end the game if state is not ' + GAME_STATE.PLAYING_GAME + ' (current state: ' + action.meta.gameState + ')')
    }
  }
  return state
}


export const stateMachine__R : Reducer = (state, action) => {
  const { gameState } = action.meta.gameState

  switch (action.type) {
    case GAME__AT.CHOOSING:
      // return state
    case GAME__AT.INITIALISE:
    case GAME__AT.ADD_PLAYER:
    case GAME__AT.MOVE_PLAYER:
    case GAME__AT.REMOVE_PLAYER:
    case GAME__AT.START:
    case GAME__AT.PAUSE:
    case GAME__AT.RESUME:
    case GAME__AT.END:
      // The assumption here is that any transition errors
      // would have been picked up
      // if (valueInEnum(gameState, GAME_STATE)) {
        return gameState
      // } else {
      //   throw new Error('Invalid game state given ("' + gameState + ')')
      // }

    default:
      return state
  }
}
