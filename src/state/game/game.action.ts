import { IAction, IGameActive, IMeta, IResumeGameAction, IPlayerSimple, IMetaStamped } from '../types/scored'
import { GAME_STATE, GAME__AT, GAME_PLAYERS__AT } from '../types/scored-enums'
// import { } from '../../types/game.types'

const dummyAction = {
  type: '',
  payload: {},
  error: false,
  meta: {
    now: -1
  }
}


/**
 * Set the game to paused (i.e. stop counting the time)
 */
export const pauseGame__AC = () => {
  return {
    ...dummyAction,
    type: GAME__AT.PAUSE,
  }
}

/**
 * Set the game to paused (i.e. stop counting the time)
 */
export const resumeGame__AC = (action: IAction, duration: number) : IResumeGameAction => {
  return {
    ...dummyAction,
    ...action,
    type: GAME__AT.RESUME,
    payload: {
      ...action.payload,
      pauseDuration: duration
    }
  }
}

/**
 * Set the game to paused (i.e. stop counting the time)
 */
export const endGame__AC = () => {
  return {
    ...dummyAction,
    type: GAME__AT.END
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
    ...dummyAction,
    type: GAME__AT.INITIALISE,
    payload: {
      id: gameConfigID
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
    ...dummyAction,
    type: GAME__AT.START,
    payload: {
      id: _id
    }
  }
}

export const gameMachineState__AC = (stateMachineState: GAME_STATE) : IAction => {
  return {
    ...dummyAction,
    type: GAME__AT.STATE_MACHINE,
    payload: {
      stateMachine: stateMachineState
    }
  }
}


export const addPlayerToGame__AC = (_id: number) : IAction => {
  return {
    ...dummyAction,
    type: GAME_PLAYERS__AT.ADD,
    payload: {
      id: _id
    }
  }
}


export const addFullPlayerToGame__AC = (_player: IPlayerSimple, _meta: IMetaStamped) : IAction => {
  const _code = (typeof _meta.code === 'undefined') ? 1 : _meta.code + 1

  if (_code > 100) {
    throw new Error('WTF is going on here why is this being called so many times?')
  }

  return {
    ...dummyAction,
    type: GAME__AT.ADD_PLAYER,
    payload: {
      player: _player
    },
    meta: {
      ..._meta,
      dispatched: true,
      code: _code
    }
  }
}
