import { Reducer } from 'redux'
import { GAME_CONFIG__AT } from './gameConfig.action'
import { IConfigGame } from '../../types/scored'

const gameConfigs__R : Reducer = (state, action) => {
  // assume that all validation is done by
  // gameConfigMiddleware()

  // NOTE: adding, removing and updating game configuration
  //       can be done at any time as it doesn't affect the
  //       game state

  switch (action.type) {
    case GAME_CONFIG__AT.ADD:
      return [
        ...state,
        {
          ...action.payload.gameConfig,
          id: state.length + 1
        }
      ]

    case GAME_CONFIG__AT.UPDATE:
      return state.map(
        (config : IConfigGame) : IConfigGame => {
          if (config.id === action.payload.gameConfig.id) {
            return action.payload.gameConfig
          } else {
            return config
          }
        }
      )

    case GAME_CONFIG__AT.REMOVE:
      return state.map(
        (config : IConfigGame) : IConfigGame => {
          if (config.id === action.payload.gameConfig.id) {
            return {
              ...config,
              active: false
            }
          } else {
            return config
          }
        }
      )

    case GAME_CONFIG__AT.CLONE:
      const toClone = state.filter(
        (config : IConfigGame) : boolean => {
          return (config.id === action.payload.gameConfig.id)
        }
      )
      if (toClone.length === 1) {
        return [
          ...state,
          {
            ...toClone[0],
            id: state.length + 1,
            name: action.payload.name
          }
        ]
      } else {
        throw new Error('Could not find game config to clone')
      }

    default:
      return state
  }
}

export default gameConfig__R
