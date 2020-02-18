import { Middleware } from 'redux'

import { IWholeScored, IPlayerSimple, IHasId, IHasName } from '../types/scored'
import { ERROR__AT, GAME_PLAYERS__AT, GAME__AT } from '../types/scored-enums'

import { isIdPayload__TG, isPlayerSimple__TG, isDispatchedAction_TG } from '../types/typeguards'

import { getItemById, itemMatchesID } from '../utilities/item-by-id.utils'
import error__AC from '../errors/error.action'
import { addFullPlayerToGame__AC } from '../game/game.action'


// import {allPlayers, } from '../game/game.mocs'

// ========================================================
// START: Redux reducer

const gamePlayers__MW : Middleware = (store) => (next) => (action) => {
  console.log('inside gamePlayers__MW()')

  switch (action.type) {
    case GAME_PLAYERS__AT.ADD:
      if (isDispatchedAction_TG(action)) {
        console.log('Second visit of this action to gamePlayer__MW()')
        console.log('action:', action)
        // throw new Error('only way I know to stop this infinite loop')

        // We've seen this one before.
        // We don't need to do anything more
        return next(action)
      }

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
            action,
            37,
            'player.middleware.ts'
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
          return next(
            addFullPlayerToGame__AC(
              (_player as IPlayerSimple),
              action.meta
            )
          )
        } else {
          // Something weird is going on here.
          // Can't add an inactive player to a game
          return next(
            error__AC(
              [(_player as IHasName).name, `{_playerID}`],
              ERROR__AT.CANT_ADD_INACTIVE_PLAYER,
              action,
              68,
              'player.middleware.ts'
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
            action,
            81,
            'player.middleware.ts'
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

export default gamePlayers__MW
