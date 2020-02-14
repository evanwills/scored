import { playerGameJoin, IWholeScored } from './types/scored'
import { END_MODE, PLAY_ORDER } from './types/scored-enums'
import { initialGame } from './game/game.initial-state'
import { initialPlayers } from './player/player.initial-state'

const initialState : IWholeScored = {
  allPlayers: initialPlayers,
  currentGame: initialGame,
  gameConfigs: [
    // {
    //   id: 1,
    //   active: true,
    //   allowNegative: false,
    //   endMode: END_MODE.CURRENT_PLAYER,
    //   minScore: 0,
    //   maxScore: 0,
    //   name: 'Quirkle',
    //   playOrder: PLAY_ORDER.SEATING_POSTION,
    //   scoreBonuses: false,
    //   trackTime: true
    // },
    // {
    //   id: 2,
    //   active: true,
    //   allowNegative: false,
    //   endMode: END_MODE.CURRENT_PLAYER,
    //   minScore: 0,
    //   maxScore: 0,
    //   name: 'Scrabble',
    //   playOrder: PLAY_ORDER.SEATING_POSTION,
    //   scoreBonuses: false,
    //   trackTime: true
    // }
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

export default initialState
