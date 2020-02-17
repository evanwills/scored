import { ITurn, IRound } from '../types/scored'
import { ROUND_STATE } from '../types/scored-enums'

export const initialTurn : ITurn = {
  id: -1,
  end: -1,
  isBonusRound: false,
  pauseDuration: 0,
  playerID: -1,
  playOrder: -1,
  score: {
    round: 0,
    total: 0,
  },
  start: -1
}

export const initialRound : IRound = {
  firstPlayerID: -1,
  index: 0,
  leaderID: -1,
  playersInOrder: [],
  playOrderIndex: 0,
  stateMachine: ROUND_STATE.NO_ROUND,
  turns: {
    index: 0,
    current: initialTurn,
    played: []
  },
  winnerID: -1
}
