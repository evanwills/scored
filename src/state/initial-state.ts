import { playerGameJoin, IWholeScored, END_MODE, PLAY_ORDER } from './utilities/types'
import { initialGame } from './game/game.initial-state'
import { initialPlayers } from './player/player.initial-state'

export const initialState : IWholeScored = {
  allPlayers: initialPlayers,
  currentGame: initialGame,
  gameConfigs: [
    {
      //
      allowNegative: false,
      endMode: END_MODE.CURRENT_PLAYER,
      minScore: 0,
      maxScore: 0,
      name: 'Quirkle',
      playOrder: PLAY_ORDER.SEATING_POSTION,
      scoreBonuses: false,
      trackTime: true
    },
    {
      //
      allowNegative: false,
      endMode: END_MODE.CURRENT_PLAYER,
      minScore: 0,
      maxScore: 0,
      name: 'Scrabble',
      playOrder: PLAY_ORDER.SEATING_POSTION,
      scoreBonuses: false,
      trackTime: true
    }
  ],
  pastGames: {
    index: 0,
    games: [],
    playerGames: []
  },
  uiState: {
    route: '/',
    inPlayGameID: -1
  },
  errorLog: []
}
