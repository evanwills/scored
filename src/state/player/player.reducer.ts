import { Reducer } from '../../node_modules/redux/index'
import { gamePlayers, IAction, playersAll, IPlayerSimple } from '../utilities/types'
import { ALL_PLAYERS, GAME_PLAYER } from '../actions/player.action'
import { TURN } from '../actions/turns.action'



export const gamePlayerReducer : Reducer = (state : gamePlayers , action: IAction) : gamePlayers => {
  switch (action.type) {
    case GAME_PLAYER.ADD:
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


      case GAME_PLAYER.UPDATE_NAME:
      case GAME_PLAYER.REARRANGE:
      case GAME_PLAYER.DEACTIVATE:
      case GAME_PLAYER.UPDATE_SCORE:
  }
  return state
}

/**
 * Handle adding/updating/deleting system player entries
 * @param state
 * @param action
 */
export const allPlayerReducer : Reducer = (state : playersAll , action: IAction) : playersAll => {
  switch (action.type) {
    case ALL_PLAYERS.ADD:
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

    case ALL_PLAYERS.UPDATE:
      return {
        ...state,
        players: state.players.map(player => {
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

    case ALL_PLAYERS.DELETE:
      return {
        ...state,
        players: state.players.map(player => {
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


