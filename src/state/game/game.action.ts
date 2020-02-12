import { IAction, GAME_STATE, IConfigGame, IGameActive, IMeta, GAME__AT, IResumeGameAction } from '../../types/scored'
// import { } from '../../types/game.types'
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
 * @param {string}  gameConfigID The ID for the game config to be used
 * @param {boolean} _clockwise Whether turns a taken in a clockwise
 *                             or counter clockwise order
 * @param {string}  _endMode   How the game ends
 * @param {string}  _playOrder Play order for the start of each round.
 */
export const initialiseGame__AC = (gameConfigID : number) => {
  return {
    type: GAME__AT.INITIALISE,
    payload: {
      id: gameConfigID
    },
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
export const initialiseGameFull__AC = (_game : IGameActive, _meta : IMeta) => {
  return {
    type: GAME__AT.INITIALISE,
    payload: _game,
    error: false,
    meta: {..._meta}
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

export const gameMachineState__AC = (stateMachineState: GAME_STATE) : IAction => {
  return {
    type: GAME__AT.STATE_MACHINE,
    payload: {
      stateMachine: stateMachineState
    },
    error: false,
    meta: {
      now: -1
    }
  }
}
