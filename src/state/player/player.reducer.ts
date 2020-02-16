import { Reducer } from 'redux'

import { IPlayerSimple } from '../types/scored'
import { ALL_PLAYERS__AT, GAME_PLAYERS__AT } from '../types/scored-enums'
// import { } from '../../types/player.types'
// import { TURN__AT } from '../../types/round.types'
import { initialPlayers, initialGamePlayers } from './player.initial-state'
import { getItemById } from '../utilities/item-by-id.utils'
import { isPlayerSimple__TG } from '../types/typeguards'



export const gamePlayer__R : Reducer = (state = initialPlayers, action) => {
  switch (action.type) {
    case GAME_PLAYERS__AT.ADD:
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

/**
 * Handle adding/updating/deleting system player entries
 * @param state
 * @param action
 */
export const allPlayer__R : Reducer = (state = initialGamePlayers, action) => {
  switch (action.type) {
    case ALL_PLAYERS__AT.ADD:
      const _index = state.index + 1
      return {
        index: _index,
        players: [
          ...state.players,
          {
            id: _index,
            name: action.payload.name,
            active: true
          }
        ],
        playerGames: state.playerGames
      }

    case ALL_PLAYERS__AT.UPDATE:
      return {
        ...state,
        players: state.players.map((player : IPlayerSimple) => {
          if (player.id === action.payload.id) {
            return {
              ...player,
              name: action.payload.name
            }
          } else {
            return player
          }
        })
      }

    case ALL_PLAYERS__AT.DELETE:
      return {
        ...state,
        players: state.players.map((player : IPlayerSimple) => {
          if (player.id === action.payload.id) {
            return {
              ...player,
              active: false
            }
          } else {
            return player
          }
        })
      }
  }

  return state
}


