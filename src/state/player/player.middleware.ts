
import { Middleware } from 'redux'

import { IWholeScored, IPlayerSimple, IHasId, IHasName } from '../types/scored'
import { ERROR__AT, ALL_PLAYERS__AT, GAME_PLAYERS__AT, GAME__AT } from '../types/scored-enums'

import { isIdPayload__TG, isPlayerSimple__TG } from '../types/typeguards'

import { isDuplicateName, sanitiseName } from '../utilities/name.utils'
import { getItemById, itemMatchesID } from '../utilities/item-by-id.utils'
import error__AC from '../errors/error.action'

// import {allPlayers, } from '../game/game.mocs'

// ========================================================
// START: Redux reducer

export const gamePlayers__MW : Middleware = (store) => (next) => (action) => {
  switch (action.type) {
    case GAME__AT.ADD_PLAYER:
      const { currentGame, allPlayers } : IWholeScored = store.getState()

      if (!isIdPayload__TG(action.payload)) {
        throw new Error('No ID has been specified')
      }

      const _playerID : number = action.payload.id

      // Check whether the player is already listed in the game
      if (itemMatchesID(_playerID, currentGame.players.playersSeatOrder)) {
        // You're a duffa. You've already added that player
        const _alreadyPlayer = getItemById(
          _playerID,
          currentGame.players.playersSeatOrder
        )
        return next(
          error__AC(
            [(_alreadyPlayer as IPlayerSimple).name, `{_playerID}`],
            ERROR__AT.PLAYER_ALREADY_ADDED,
            action
          )
        )
      }

      // Get the player's basic details
      const _player : IPlayerSimple | IHasId = getItemById(
        _playerID,
        allPlayers.players
      )

      // Check whether the player exists
      if (isPlayerSimple__TG(_player)) {
        if ((_player as IPlayerSimple).active === true) {
          // All good!!! Go and do what needs doing
          return next({
            ...action,
            type: GAME_PLAYERS__AT.ADD,
            payload: {
              player: {..._player}
            }
          })
        } else {
          // Something weird is going on here.
          // Can't add an inactive player to a game
          return next(
            error__AC(
              [(_player as IHasName).name, `{_playerID}`],
              ERROR__AT.CANT_ADD_INACTIVE_PLAYER,
              action
            )
          )
        }
      } else {
        // That's odd! No player!
        // Send an error
        return next(
          error__AC(
            ['player', `{_playerID}`],
            ERROR__AT.NOT_FOUND_BY_ID,
            action
          )
        )
      }
    case GAME__AT.REMOVE_PLAYER:
      break;

    case GAME__AT.MOVE_PLAYER:
      break;
  }
  next(action)
}

/**
 * Validate player names before adding them to the system
 * @param store
 */
export const allPlayers__MW : Middleware = (store) => (next) => (action) => {
  switch (action.type) {
    case ALL_PLAYERS__AT.UPDATE:
    case ALL_PLAYERS__AT.ADD:
      const _name = action.payload.name.trim()
      const _sanitised = sanitiseName(_name)
      if (_name !== _sanitised) {
        store.dispatch(
          error__AC(
            [_sanitised],
            ERROR__AT.BAD_NAME,
            action,

          )
        )
      }
      const _currentState : IWholeScored = store.getState()

      if (isDuplicateName(_sanitised, _currentState.allPlayers.players) > 0) {
        // Can't work around a duplicate name
        return next(
          error__AC(
            ['player', _sanitised],
            ERROR__AT.DUPLICATE_NAME,
            action
          )
        )
      } else {
        return next({
          ...action,
          payload: {
            ...action.payload,
            name: _sanitised
          }
        })
      }

    default:
      return next(action)
  }
}


// //  END:  Redux reducer
// // ========================================================
