import { ITurn, IRound, ROUND_STATES } from '../../types/scored'

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
  playersInOrder: [],
  playOrderIndex: 0,
  stateMachine: ROUND_STATES.ROUND_FINALISED,
  turns: {
    index: 0,
    current: initialTurn,
    played: []
  }
}
