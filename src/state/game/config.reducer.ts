import { IConfigDefault, IConfigGame, IAction } from '../utilities/types'
import { Reducer } from '../../node_modules/redux/index'

export const gameConfigReducer : Reducer = (state : IConfigGame , action: IAction) : IConfigGame => {
  return state
}
export const DefaultConfigReducer : Reducer = (state : IConfigDefault , action: IAction) : IConfigDefault => {
  return state
}
