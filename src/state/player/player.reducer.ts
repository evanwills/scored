import { Reducer } from 'redux'
import { gamePlayers, IAction, playersAll, IPlayerSimple } from '../utilities/types'
import { ALL_PLAYERS__AT, GAME_PLAYERS__AT } from './player.types'
// import { TURN__AT } from '../round/round.types'



export const gamePlayer__R : Reducer = (state, action) => {
  switch (action.type) {
    case GAME_PLAYERS__AT.ADD:
      const player : IPlayerSimple = action.payload.player
      return {
        ...state,
        all: [
          ...state.all,
          {
            ...player,
            position: state.all.length + 2,
            rank: 0,
            score: 0,
            timePaused: 0,
            timePlayed: 0,
            turns: 0,
          }
        ],
        playersSeatOrder: [...state.playersSeatOrder, action.payload.player]
      }


      case GAME_PLAYERS__AT.UPDATE_NAME:
      case GAME_PLAYERS__AT.REARRANGE:
      case GAME_PLAYERS__AT.DEACTIVATE:
      case GAME_PLAYERS__AT.UPDATE_SCORE:
  }
  return state
}

/**
 * Handle adding/updating/deleting system player entries
 * @param state
 * @param action
 */
export const allPlayer__R : Reducer = (state, action) => {
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


