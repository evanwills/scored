import { IGameActive, END_MODE, PLAY_ORDER, IPause, IConfigGame, IFiniteStateMachine, GAME_STATE, AllowableStates, GamePlayers } from '../../types/scored'

import { initialRound } from '../round/round.initital-states'


export const initialPause : IPause = {
  start: -1,
  isPaused: false,
  pauses: [],
  totalPauseTime: 0,
  log: []
}

export const initialGamePlayers : GamePlayers = {
  playersSeatOrder: [],
  finalResult: []
}

export const intialGameConfig : IConfigGame = {
  id: -1,
  active: false,
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
  config: intialGameConfig,
  end: -1,
  pause: initialPause,
  players: initialGamePlayers,
  round: initialRound,
  scores: [],
  start: -1,
  stateMachine: GAME_STATE.NO_GAME
}

/**
 * All of the possible states a game can be in plus their
 * allowable previous and next states
 */
export const gameFiniteStateMachine : IFiniteStateMachine = {
  NO_GAME: {
    previous: [
      GAME_STATE.GAME_STORED
    ],
    next: [
      GAME_STATE.CHOOSING_GAME
    ],
    hasSubState: false
  },
  CHOOSING_GAME: {
    previous: [
      GAME_STATE.NO_GAME,
      GAME_STATE.GAME_STORED
    ],
    next: [
      GAME_STATE.MANAGE_PLAYERS
    ],
    hasSubState: false
  },
  GAME_INITIALISED: {
    previous: [
      GAME_STATE.GAME_STORED,
      GAME_STATE.CHOOSING_GAME
    ],
    next: [
      GAME_STATE.MANAGE_PLAYERS
    ],
    hasSubState: false
  },
  MANAGE_PLAYERS: {
    previous: [
      GAME_STATE.GAME_INITIALISED
    ],
    next: [
      GAME_STATE.PLAYING_GAME
    ],
    hasSubState: true
  },
  PLAYING_GAME: {
    previous: [
      GAME_STATE.MANAGE_PLAYERS,
      GAME_STATE.GAME_PAUSED
    ],
    next: [
      GAME_STATE.GAME_PAUSED,
      GAME_STATE.GAME_ENDED
    ],
    hasSubState: true
  },
  GAME_PAUSED: {
    previous: [
      GAME_STATE.PLAYING_GAME
    ],
    next: [
      GAME_STATE.PLAYING_GAME
    ],
    hasSubState: true
  },
  GAME_ENDED: {
    previous: [
      GAME_STATE.PLAYING_GAME
    ],
    next: [
      GAME_STATE.GAME_FINALISED
    ],
    hasSubState: false
  },
  GAME_FINALISED: {
    previous: [
      GAME_STATE.GAME_ENDED
    ],
    next: [
      GAME_STATE.GAME_STORED
    ],
    hasSubState: false
  },
  GAME_STORED: {
    previous: [
      GAME_STATE.GAME_FINALISED
    ],
    next: [
      GAME_STATE.NO_GAME,
      GAME_STATE.CHOOSING_GAME,
      GAME_STATE.GAME_INITIALISED
    ],
    hasSubState: false
  },
}
