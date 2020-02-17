

export enum ALL_PLAYERS__AT {
  ADD = 'ADD_NEW_PLAYER',
  UPDATE = 'UPDATE_PLAYERS_NAME',
  DELETE = 'REMOVE_PLAYER_FROM_LIST'
}

export enum E_LOG_TYPE {
  LOG = 'LOG',
  INFO = 'INFO',
  NOTICE = 'NOTICE',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

export enum END_MODE {
  CURRENT_PLAYER = 'CURRENT_PLAYER',
  END_ROUND = 'END_OF_CURRENT_ROUND',
  MIN_MAX_SCORE = 'MIN_MAX_SCORE'
}

export enum ERROR__AT {
  BAD_NAME = 'BAD_NAME',
  CANT_ADD_INACTIVE_PLAYER = 'CANT_ADD_INACTIVE_PLAYER',
  DUPLICATE_NAME = 'DUPLICATE_NAME',
  NOT_FOUND_BY_ID = 'NOT_FOUND_BY_ID',
  PAUSE_RESUME_FAILURE = 'PAUSE_RESUME_FAILURE',
  PLAYER_ALREADY_ADDED = 'PLAYER_ALREADY_ADDED',
  STATE_TRANSITION_FAILURE = 'STATE_TRANSITION_FAILURE',
  STATE_TRANSITION_FAILURE_SPECIAL = 'STATE_TRANSITION_FAILURE_SPECIAL',
  INVALID_ACTION = 'INVALID_ACTION'
}

export enum FILTER_BY_PROP {
  id = 'id',
  playerID = 'playerID'
}

export enum GAME_PLAYERS__AT {
  ADD = 'ADD_PLAYER_TO_GAME',
  UPDATE_NAME = 'UPDATE_GAME_PLAYERS_NAME',
  UPDATE_SCORE = 'UPDATE_PLAYERS_SCORE_AND_RANK',
  REARRANGE = 'CHANGE_THE_SEATING_ORDER_OF_PLAYERS',
  DEACTIVATE = 'STOP_PLAYER_FROM_HAVING_TURNS',
  REMOVE = 'REMOVE_PLAYER_WHO_HASNT_HAD_A_TURN'
}

/**
 * Action types
 */
export enum GAME__AT {
  CHOOSING = 'CHOOSING_GAME',
  REMATCH = 'GAME_REMATCH_IDENTICAL',
  REMATCH_REORDER = 'GAME_REMATCH_REORDER',
  INITIALISE = 'INITIALISE_GAME',
  CONFIG = 'UPDATE_GAME_CONFIG',
  ADD_PLAYER = 'ADD_PLAYER_TO_GAME',
  MOVE_PLAYER = 'MOVE_PLAYERS_SEAT_ORDER',
  REMOVE_PLAYER = 'REMOVE_PLAYER_FROM_GAME',
  START = 'START_GAME',
  PAUSE = 'PAUSE_GAME',
  RESUME = 'RESUME_GAME',
  END = 'END_GAME',
  STATE_MACHINE = 'UPDATE_GAME_STATE_MACHINE'
}

export enum GAME_CONFIG__AT {
  ADD = 'ADD_NEW_GAME_CONFIG',
  UPDATE = 'UPDATE_GAME_CONFIG',
  REMOVE = 'ARCHIVE_GAME_CONFIG',
  CLONE = 'CLONE_GAME_CONFIG',
}

export enum GAME_STATE {
  NO_GAME = 'NO_GAME',
  CHOOSING_GAME = 'CHOOSING_GAME',
  GAME_INITIALISED = 'GAME_INITIALISED',
  MANAGE_PLAYERS = 'MANAGE_PLAYERS',
  PLAYING_GAME = 'PLAYING_GAME',
  GAME_PAUSED = 'GAME_PAUSED',
  GAME_ENDED = 'GAME_ENDED',
  GAME_FINALISED = 'GAME_FINALISED',
  GAME_STORED = 'GAME_STORED'
}

export enum PAUSE_LOG_TYPE {
  PAUSE = 'PAUSE',
  RESUME = 'RESUME'
}

/**
 * Play order defines who the first player will be at the start of
 * each round
 *
 * @const {object}
 */
export enum PLAY_ORDER {
  SEATING_POSTION = 'SEATING_POSTION',
  ROUND_WINNER = 'ROUND_WINNER',
  TRICK = 'TRICK',
  GAME_LEADER = 'GAME_LEADER',
  NEXT = 'NEXT'
}

export enum ROUND__AT {
  // INITIALISE_FIRST = 'INITIALISE_FIRST_ROUND',
  INITIALISE = 'INITIALISE_ROUND',
  ADD_TURN = 'ADD_TURN_TO_ROUND',
  UPDATE_TURN = 'UPDATE_ROUND_TURN',
  FINALISE = 'FINALISE_ROUND',
  UPDATE_STATE = 'UPDATE_ROUND_STATE'
}

export enum ROUND_STATE {
  NO_ROUND = 'NO_ROUND',
  ROUND_INITIALISED = 'ROUND_INITIALISED',
  ROUND_PLAYERS_ORDERED = 'ROUND_PLAYERS_ORDERED',
  ROUND_TAKING_TURNS = 'ROUND_TAKING_TURNS',
  ROUND_ENDED = 'ROUND_ENDED',
  // ROUND_CALCULATING_RANKING = 'ROUND_CALCULATING_RANKING',
  ROUND_FINALISED = 'ROUND_FINALISED',
  STATE_MACHINE = 'UPDATE_ROUND_STATE_MACHINE'
}

export enum SCORE_SORT_METHOD {
  order = 'order',
  round = 'round',
  total = 'total'
}

export enum TURN_SORT_FIELDS {
  id = 'id',
  end = 'end',
  pauseDuration = 'pauseDuration',
  playerID = 'playerID',
  playOrder = 'playOrder',
  roundIndex = 'roundIndex',
  start = 'start'
}

export enum TURN_STATES {
  NO_TURN = 'NO_TURN',
  TURN_STARTED = 'TURN_STARTED',
  TURN_PAUSED = 'TURN_PAUSED',
  TURN_SCORED = 'TURN_SCORED',
  TURN_ENDED = 'TURN_ENDED',
  TURN_RANKED = 'TURN_RANKED',
  TURN_STORED = 'TURN_STORED'
}

export enum TURN__AT {
  START = 'START_TURN',
  SCORE = 'SCORE_TURN',
  SCORE_END = 'SCORE_TURN_AND_END_AFTER_ROUND',
  SCORE_END_GAME = 'SCORE_TURN_AND_END',
  END = 'END_TURN',
  PAUSE = 'PAUSE_TURN',
  RESUME = 'RESUME_TURN'
}
