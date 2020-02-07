import { playerGameJoin, IWholeScored, END_MODE, PLAY_ORDER } from './utilities/types'

export const initialState : IWholeScored = {
  allPlayers: {
    index: 0,
    players: [],
    playerGames: []
  },
  currentGame: {
    id: -1,
    end: -1,
    config: {
      id: -1,
      allowNegative: false,
      endMode: END_MODE.CURRENT_PLAYER,
      minScore: 0,
      maxScore: 0,
      name: '',
      playOrder: PLAY_ORDER.SEATING_POSTION,
      scoreBonuses: false,
      trackTime: true
    },
    pause: {
      start: -1,
      end: -1,
      isPaused: false,
      pauses: [],
      totalPauseTime: 0,
      log: []
    },
    players: {
      index: 0,
      all: [],
      playersSeatOrder: [],
      finalResult: []
    },
    round: {
      firstPlayerID: -1,
      index: 0,
      leaderID: -1,
      playOrderIndex: 0,
      playersInOrder: [],
      turns: {
        index: 0,
        current: {
          id: -1,
          end: -1,
          pauseDuration: 0,
          playOrder: -1,
          playerID: -1,
          score: {
            round: -1,
            total: -1
          },
          start: -1
        },
        played: []
      },
      winnerID: -1,
    },
    scores: [],
    start: -1
  },
  defaultConfig: {
    allowNegative: false,
    endMode: END_MODE.CURRENT_PLAYER,
    minScore: 0,
    maxScore: 0,
    playOrder: PLAY_ORDER.SEATING_POSTION,
    scoreBonuses: false,
    trackTime: true
  },
  PastGames: {
    index: 0,
    games: [],
    playerGames: []
  }
}
