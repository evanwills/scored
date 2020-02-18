
import { Middleware } from 'redux'

import { IWholeScored } from '../types/scored'
import { ERROR__AT, ALL_PLAYERS__AT, GAME_PLAYERS__AT, GAME__AT } from '../types/scored-enums'

// import { isIdPayload__TG, isPlayerSimple__TG, isPlayerPayload__TG, isDispatchedAction_TG } from '../types/typeguards'

import { isDuplicateName, sanitiseName } from '../utilities/name.utils'
// import { getItemById, itemMatchesID } from '../utilities/item-by-id.utils'
import error__AC from '../errors/error.action'
// import { addFullPlayerToGame__AC } from '../game/game.action'

// import {allPlayers, } from '../game/game.mocs'

// ========================================================
// START: Redux reducer

/**
 * Validate player names before adding them to the system
 * @param store
 */
const allPlayers__MW : Middleware = (store) => (next) => (action) => {
  console.log('inside allPlayers__MW()')

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
            111,
            'player.middleware.ts'
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
            action,
            125,
            'player.middleware.ts'
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

export default allPlayers__MW
