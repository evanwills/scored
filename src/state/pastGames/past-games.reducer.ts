import { Reducer } from 'redux'
import { IGame, IAction, PastGames } from "../types/scored"

export const pastGamesInitialState : PastGames = {
  index: 0,
  games: [],
  playerGames: []
}

export const pastGame__R : Reducer = (state = pastGamesInitialState, action) => {
  return state
}
