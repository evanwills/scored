import { IConfigGame, IAction, IConfigGameAction, IConfigGameDefault, IPayload } from '../types/scored'

import { GAME_CONFIG__AT } from '../types/scored-enums'

/**
 * Helper function because add and update have the same payload but
 * are treated differently by the reducer.
 *
 * @param _type   Type value for the action (ADD or UPDATE)
 * @param _config Game config to be added or updated.
 */
const addUpdateConf = (_type : GAME_CONFIG__AT, _config: IConfigGame) : IConfigGameAction => {
  return {
    type: _type,
    payload: {
      gameConfig: {
        ..._config
      }
    },
    error: false,
    meta: {
      now: -1
    }
  }
}

export const newGameConf__AC = (config: IConfigGame) : IAction => {
  // I'll leave validation of min & max to
  // gameConfigMiddleware()
  return addUpdateConf(GAME_CONFIG__AT.ADD, config)
}

export const updateGameConf__AC = (config: IConfigGame) : IAction => {
  // I'll leave validation of min & max to
  // gameConfigMiddleware()
  return addUpdateConf(GAME_CONFIG__AT.UPDATE, config)
}

export const removeGameConf__AC = (_id: number) : IAction => {
  // I'll leave validation of min & max to
  // gameConfigMiddleware()
  return {
    type: GAME_CONFIG__AT.REMOVE,
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
