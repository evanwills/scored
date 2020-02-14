import { IAction, IPlayerSimple } from '../types/scored'
import { GAME_PLAYERS__AT, ALL_PLAYERS__AT } from '../types/scored-enums'
// import { } from '../../types/player.types'


export const addPlayerToGame__AC = (_player: IPlayerSimple) : IAction => {
  return {
    type: GAME_PLAYERS__AT.ADD,
    payload: {
      player: _player
    },
    error: false,
    meta: {
      now: -1
    }
  }
}

export const updatePlayer__AC = (_id : number, _name : string, _position: number) : IAction => {
  return {
    type: GAME_PLAYERS__AT.REARRANGE,
    payload: {
      id: _id,
      name: _name,
      position: _position
    },
    error: false,
    meta: {
      now: -1
    }
  }
}

/**
 * Add a new player to the system.
 * (This is not the same as adding a player to a game)
 *
 * @param _name name of the player being added to the system
 */
export const addNewPlayer__AC = (_name : string) => {
  return {
    type: ALL_PLAYERS__AT.ADD,
    payload: {
      name: _name
    },
    error: false,
    meta: {
      now: -1
    }
  }
}

/**
 * Change the name of an existing player
 * (This is not the same as adding a player to a game)
 *
 * @param _name name of the player being added to the system
 */
export const updateExistingPlayer__AC = (_name : string) => {
  return {
    type: ALL_PLAYERS__AT.UPDATE,
    payload: {
      name: _name
    },
    error: false,
    meta: {
      now: -1
    }
  }
}

/**
 * Remove an existing player from the system
 * (This means )
 *
 * @param _name name of the player being added to the system
 */
export const dactivateExistingPlayer__AC = (_id : number) => {
  return {
    type: ALL_PLAYERS__AT.DELETE,
    payload: {
      score: _id
    },
    error: false,
    meta: {
      now: -1
    }
  }
}
