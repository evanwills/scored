import { Reducer } from 'redux'
import { PastGames, IGameFinished, IGameFinishedPayload, ITurnComplete, playerGameJoin } from "../types/scored"
import { PAST_GAME__AT } from './past-game.actions'

export const pastGamesInitialState : PastGames = {
  index: 0,
  games: [],
  playerGames: []
}

export const pastGame__R : Reducer = (state : PastGames = pastGamesInitialState, action) => {
  console.log('inside gamePlayer__R()')
  switch (action.type) {
    case PAST_GAME__AT.ADD:
      const game : IGameFinished = (action.payload as IGameFinishedPayload).endedGame
      const joins : playerGameJoin[] = game.players.finalResult.map((finalTurn : ITurnComplete, index: number) : playerGameJoin => {
        return {
          playerID: finalTurn.playerID,
          gameID: game.id,
          score: finalTurn.score.total,
          playOrder: index + 1,
          rank: finalTurn.rank.overall
        }
      })
      return {
        index: state.index,
        games: [
          ...state.games,
          game,
        ],
        playerGames: {
          ...state.playerGames,
          ...joins
        }
      }

    case PAST_GAME__AT.INCREMENT_INDEX:
      return {
          ...state,
          index: state.index + 1
      }

    default:
      return state
  }
}
