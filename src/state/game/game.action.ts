import { IAction } from '../utilities/types'
import { GAME__AT, IResumeGameAction } from './game.types'
/**
 * Set the game to paused (i.e. stop counting the time)
 */
export const pauseGame__AC = () => {
  return {
    type: GAME__AT.PAUSE,
    payload: {}
  }
}

/**
 * Set the game to paused (i.e. stop counting the time)
 */
export const resumeGame__AC = (action: IAction, duration: number) : IResumeGameAction => {
  return {
    ...action,
    type: GAME__AT.RESUME,
    payload: {
      ...action.payload,
      pauseDuration: duration
    },
    error: false,
    meta: {
      now: -1
    }
  }
}

/**
 * Set the game to paused (i.e. stop counting the time)
 */
export const endGame__AC = () => {
  return {
    type: GAME__AT.END,
    payload: {},
    error: false,
    meta: {
      now: -1
    }
  }
}

/**
 *
 * @param {string}  _name      Name of the game being played
 * @param {boolean} _clockwise Whether turns a taken in a clockwise
 *                             or counter clockwise order
 * @param {string}  _endMode   How the game ends
 * @param {string}  _playOrder Play order for the start of each round.
 */
export const initialiseGame__AC = (_name : string, _clockwise : string, _endMode : string, _playOrder: string) => {
  return {
    type: GAME__AT.INITIALISE,
    payload: {
      name: _name,
      clockWise: _clockwise,
      endMode: _endMode,
      playOrder: _playOrder
    },
    error: false,
    meta: {
      now: -1
    }
  }
}

/**
 *
 * @param {number} _id First player to take a turn
 */
export const startGame__AC = (_id: number) => {
  return {
    type: GAME__AT.START,
    payload: {
      id: _id
    },
    error: false,
    meta: {
      now: -1
    }
  }
}
