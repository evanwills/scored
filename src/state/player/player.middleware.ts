
import { Middleware, Store } from 'redux'

import { IAction, IWholeScored, IPlayerSimple, ERROR__AT, ALL_PLAYERS__AT, GAME_PLAYERS__AT } from '../../types/scored'

import { isDuplicateName, sanitiseName } from '../utilities/name.utils'
import { getItemById, itemMatchesID } from '../utilities/item-by-id.utils'
import error__AC from '../errors/error.action'
import { isIdPayload__TG } from '../../types/typeguards'


// ========================================================
// START: Redux reducer

export const GamePlayersMiddleware : Middleware = (store) => (next) => (action) => {
  switch (action.type) {
    case GAME_PLAYERS__AT.ADD:
      const {allPlayers, currentGame} : IWholeScored = store.getState()

      if (isIdPayload__TG(action.payload)) {
        throw new Error('No ID has been specified')
      }

      const _playerID : number = action.payload.id
      // Get the player's basic details
      const _player : IPlayerSimple = getItemById(
        _playerID,
        allPlayers.players
      )

      // Check whether the player is already listed in the game
      if (itemMatchesID(_playerID, currentGame.players.playersSeatOrder)) {
        // You're a duffa. You've already added that player
        store.dispatch(
          error__AC(
            [_player.name, `{_playerID}`],
            ERROR__AT.PLAYER_ALREADY_ADDED,
            action
          )
        )
      } else if (_player.id < 1) {
        // Check whether the player exists

        // That's odd! No player!
        // Send an error
        store.dispatch(
          error__AC(
            [`{_playerID}`],
            ERROR__AT.PLAYER_NOT_FOUND,
            action
          )
        )
      } else if (_player.active === false) {
        // Something weird is going on here.
        // Can't add an inactive player to a game
        store.dispatch(
          error__AC(
            [_player.name, `{_playerID}`],
            ERROR__AT.CANT_ADD_INACTIVE_PLAYER,
            action
          )
        )
      } else {
        // All good!!! Go and do what needs doing
        return next({
          ...action,
          payload: {
            player: {..._player}
          }
        })
      }
      break;

    default:
      next(action)
  }
}

/**
 * Validate player names before adding them to the system
 * @param store
 */
export const playersAllMiddleware : Middleware = (store) => (next) => (action) => {
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

      if (isDuplicateName(_sanitised, _currentState.allPlayers.players)) {
        // Can't work around a duplicate name
        return next(
          error__AC(
            ['player', _sanitised],
            ERROR__AT.DUPLICATE_NAME,
            action
          )
        )
      }



      return next({
        ...action,
        payload: {
          ...action.payload,
          name: _sanitised
        }
      })

    default:
      next(action)
  }
}


//  END:  Redux reducer
// ========================================================
