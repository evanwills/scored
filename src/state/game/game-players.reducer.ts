import { Reducer } from 'redux'

import { IPlayerSimple } from '../types/scored'
import { GAME_PLAYERS__AT, GAME__AT } from '../types/scored-enums'
// import { } from '../../types/player.types'
// import { TURN__AT } from '../../types/round.types'
import { initialPlayers } from '../player/player.initial-state'
import { getItemById } from '../utilities/item-by-id.utils'
import { isPlayerSimple__TG } from '../types/typeguards'



const gamePlayer__R : Reducer = (state = initialPlayers, action) => {
  switch (action.type) {
    // case GAME_PLAYERS__AT.ADD: // invoked by user interaction, only
                                  // contains ID of user to be added
    case GAME__AT.ADD_PLAYER: // contains full (simple) player object
      return {
        ...state,
        playersSeatOrder: [...state.playersSeatOrder, action.payload.player]
      }


    case GAME_PLAYERS__AT.UPDATE_NAME:
      return {
        ...state,
        playersSeatOrder: state.playersSeatOrder.map((_player : IPlayerSimple) : IPlayerSimple => {
          if (_player.id === action.payload.id) {
            return {
              ..._player,
              name: action.payload.name
            }
          } else {
            return _player
          }
        })
      }

    case GAME_PLAYERS__AT.REARRANGE:
      const _players : IPlayerSimple[] = [...state.playersSeatOrder].filter(__player => (__player.id !== action.payload.id))
      console.log('_players:', _players)
      const _movedPlayer = getItemById(action.payload.id, state.playersSeatOrder)
      const _pos = action.payload.position - 1

      if (isPlayerSimple__TG(_movedPlayer)) {
        let newOrder = []
        if (_pos === 0) {
          // put player at the front
          newOrder = [
            _movedPlayer,
            ..._players
          ]
        } else if (_pos === state.playersSeatOrder.length) {
          // put player at the end
          newOrder = [
            ..._players,
            _movedPlayer
          ]
        } else {
          newOrder = [
            ..._players.slice(0, _pos),
            _movedPlayer,
            ..._players.slice(_pos)
          ]
        }

        return {
          ...state,
          playersSeatOrder: newOrder
        }
      }
      break

    case GAME_PLAYERS__AT.DEACTIVATE:
      return {
        ...state,
        playersSeatOrder: state.playersSeatOrder.map((_player : IPlayerSimple) : IPlayerSimple => {
          if (_player.id === action.payload.id) {
            return {
              ..._player,
              active: false
            }
          } else {
            return _player
          }
        })
      }
    case GAME_PLAYERS__AT.UPDATE_SCORE:
      break
  }
  return state
}

export default gamePlayer__R
