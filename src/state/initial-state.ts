// import { playerGameJoin, IWholeScored } from './types/scored'
import { IWholeScored } from './types/scored'
// import { END_MODE, PLAY_ORDER } from './types/scored-enums'
import { initialGame } from './game/game.initial-state'
import { initialPlayers } from './player/player.initial-state'
import { gameConfigs } from './game/game.mocs'

const initialState : IWholeScored = {
  allPlayers: initialPlayers,
  appSettings: {
    speak: {
      playerName: false,
      playerScore: false,
      roundResults: false,
      pauseResume: false
    }
  },
  currentGame: initialGame,
  errorLog: [],
  gameConfigs: gameConfigs,
  pastGames: {
    index: 0,
    games: [],
    playerGames: []
  },
  uiState: {
    route: '/',
    inPlayGameID: -1
  }
}

export default initialState
