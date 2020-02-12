import { IConfigGame, IConfigGameDefault, IAction } from '../../types/types'

export enum GAME_CONFIG__AT {
  ADD = 'ADD_NEW_GAME_CONGIG',
  UPDATE = 'UPDATE_GAME_CONFIG',
  REMOVE = 'ARCHIVE_GAME_CONFIG',
  CLONE = 'CLONE_GAME_CONFIG',
}

export const newGameConf__AC = (config: IConfigGameDefault) : IAction => {
  // I'll leave validation of min & max to
  // gameConfigMiddleware()
  return {
    type: GAME_CONFIG__AT.ADD,
    payload: {
      gameConfig: {
        ...config
      }
    },
    error: false,
    meta: {
      now: -1
    }
  }
}

export const updateGameConf__AC = (config: IConfigGame) : IAction => {
  // I'll leave validation of min & max to
  // gameConfigMiddleware()
  return {
    type: GAME_CONFIG__AT.UPDATE,
    payload: {
      gameConfig: {...config}
    },
    error: false,
    meta: {
      now: -1
    }
  }
}

export const removeGameConf__AC = (_id: number) : IAction => {
  // I'll leave validation of min & max to
  // gameConfigMiddleware()
  return {
    type: GAME_CONFIG__AT.UPDATE,
    payload: {
      id: _id
    },
    error: false,
    meta: {
      now: -1
    }
  }
}

export const cloneGameConf__AC = (_id: number, _name: string) : IAction => {
  // I'll leave validation of min & max to
  // gameConfigMiddleware()
  return {
    type: GAME_CONFIG__AT.CLONE,
    payload: {
      id: _id,
      name: _name
    },
    error: false,
    meta: {
      now: -1
    }
  }
}
