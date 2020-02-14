import { IConfigGameDefault, IConfigGame, IAction } from '../types/scored'
import { Reducer } from 'redux'

export const gameConfig__R : Reducer = (state = [], action) => {
  console.log('inside gameConfig__R()')
  return state
}
export const defaultConfig__R : Reducer = (state, action) => {
  console.log('inside defaultConfig__R()')
  return state
}
