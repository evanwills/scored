import { Reducer } from 'redux'

import { IPlayerSimple } from '../types/scored'
import { ALL_PLAYERS__AT, GAME_PLAYERS__AT } from '../types/scored-enums'
// import { } from '../../types/player.types'
// import { TURN__AT } from '../../types/round.types'
import { initialGamePlayers } from './player.initial-state'
// import { getItemById } from '../utilities/item-by-id.utils'
// import { isPlayerSimple__TG } from '../types/typeguards'



/**
 * Handle adding/updating/deleting system player entries
 * @param state
 * @param action
 */
const allPlayer__R : Reducer = (state = initialGamePlayers, action) => {
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


export default allPlayer__R
