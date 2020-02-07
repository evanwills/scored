import { IGameActive, END_MODE, PLAY_ORDER, IPause, IConfigGame } from '../utilities/types'
import { initialRound } from '../round/round.initital-states'


export const initialPause : IPause = {
  start: -1,
  isPaused: false,
  pauses: [],
  totalPauseTime: 0,
  log: []
}

export const intialGameConfig : IConfigGame = {
  id: -1,
  allowNegative: false,
  endMode: END_MODE.CURRENT_PLAYER,
  minScore: 0,
  maxScore: 0,
  name: '',
  playOrder: PLAY_ORDER.SEATING_POSTION,
  scoreBonuses: false,
  trackTime: true
}

export const initialGame : IGameActive = {
  id: -1,
  end: -1,
  config: intialGameConfig,
  pause: initialPause,
  players: {
    index: 0,
    all: [],
    playersSeatOrder: [],
    finalResult: []
  },
  round: initialRound,
  scores: [],
  start: -1
}
