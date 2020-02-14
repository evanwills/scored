

export enum ALL_PLAYERS__AT {
  ADD = 'Add new player',
  UPDATE = 'Update player\'s name',
  DELETE = 'Remove player from list'
}

export enum E_LOG_TYPE {
  LOG = 'LOG',
  INFO = 'INFO',
  NOTICE = 'NOTICE',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

export enum END_MODE {
  CURRENT_PLAYER = 'Current player',
  END_ROUND = 'End of current round',
  MIN_MAX_SCORE = 'Min/Max score'
}

export enum ERROR__AT {
  BAD_NAME = 'BAD_NAME',
  CANT_ADD_INACTIVE_PLAYER = 'CANT_ADD_INACTIVE_PLAYER',
  DUPLICATE_NAME = 'DUPLICATE_NAME',
  NOT_FOUND_BY_ID = 'NOT_FOUND_BY_ID',
  PAUSE_RESUME_FAILURE = 'PAUSE_RESUME_FAILURE',
  PLAYER_ALREADY_ADDED = 'PLAYER_ALREADY_ADDED',
  STATE_TRANSITION_FAILURE = 'STATE_TRANSITION_FAILURE',
  STATE_TRANSITION_FAILURE_SPECIAL = 'STATE_TRANSITION_FAILURE_SPECIAL'
}

export enum FILTER_BY_PROP {
  id = 'id',
  playerID = 'playerID'
}

export enum GAME_PLAYERS__AT {
  ADD = 'Add player to game',
  UPDATE_NAME = 'Update game player\'s name',
  UPDATE_SCORE = 'Update player\'s score and rank',
  REARRANGE = 'Change the seating order of players',
  DEACTIVATE = 'Stop player from having turns',
  REMOVE = 'Remove player who hasn\'t had a turn'
}

/**
 * Action types
 */
export enum GAME__AT {
  CHOOSING = 'CHOOSING_GAME',
  INITIALISE = 'INITIALISE_GAME',
  CONFIG = 'UPDATE_GAME_CONFIG',
  ADD_PLAYERS = 'ADD_PLAYERS',
  MOVE_PLAYER = 'MOVE_PLAYERS',
  REMOVE_PLAYER = 'REMOVE_PLAYER',
  START = 'START_GAME',
  PAUSE = 'PAUSE_GAME',
  RESUME = 'RESUME_GAME',
  END = 'END_GAME',
  STATE_MACHINE = 'UPDATE_STATE_MACHINE'
}

export enum GAME_CONFIG__AT {
  ADD = 'ADD_NEW_GAME_CONGIG',
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
  INITIALISE = 'INITIALISE_ROUND',
  ADD_TURN = 'ADD_TURN_TO_ROUND',
  UPDATE_TURN = 'UPDATE_ROUND_TURN',
  FINALISE = 'FINALISE_ROUND'
}

export enum ROUND_STATES {
  NO_ROUND = 'NO_ROUND',
  ROUND_INITIALISED = 'ROUND_INITIALISED',
  ROUND_PLAYERS_ORDERED = 'ROUND_PLAYERS_ORDERED',
  ROUND_TAKING_TURNS = 'ROUND_TAKING_TURNS',
  ROUND_ENDED = 'ROUND_ENDED',
  ROUND_CALCULATING_RANKING = 'ROUND_CALCULATING_RANKING',
  ROUND_FINALISED = 'ROUND_FINALISED'
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
