
import { ERROR__AT, E_LOG_TYPE, IErrorPayload } from "../errors/error.types";
import { AnyAction } from 'redux'
// ========================================================
// START: interface declarations


// ----------------------------------------------
// START: action interfaces

/**
 * These objects are used as Redux actions and follow the
 * [Flux Standard Action](https://www.npmjs.com/package/flux-standard-action)
 * (FSA) recommendations. They are used in favour of the
 * Redux specified Action interface as this IAction
 * interface is more rigidly typed
 *
 * @property type the type of action (used by middleware
 *                and reducers) to work out what to do
 * @property payload information used by reducers to do
 *                   their job
 * @property error   [optional] whether or not this action
 * @property meta    extra metadat useful for the action
 *                   (mostly used by middleware to not
 *                    apply duplicate data and functionality
 *                    to actions that have already been
 *                    passed throught the middle ware)
 */
export interface IAction extends AnyAction {
  type: string,
  payload: IPayload,
  error?: boolean,
  meta: IMeta
}

/**
 * These objects force the IMeta object to be requred by
 * the action object
 *
 * @property type the type of action (used by middleware
 *                and reducers) to work out what to do
 * @property payload information used by reducers to do
 *                   their job
 * @property error   [optional] whether or not this action
 * @property meta    extra metadat useful for the action
 *                   (mostly used by middleware to not
 *                    apply duplicate data and functionality
 *                    to actions that have already been
 *                    passed throught the middle ware)
 */
export interface IActionStamped extends IAction {
  type: string,
  payload: IPayload,
  error?: boolean,
  meta: IMeta
}

//  END:  action interfaces
// ----------------------------------------------
// START: config (Redux) slice interface

/**
 * These objects provide settings that modify certain parts
 * of the apps behavior during a game
 *
 * @property allowNegative whether or not scores can have a
 *                         negative value
 * @property endMode       What happens at the end of a game
 * @property minScore      Some games (like Five Hundred)
 *                         end when a player reaches 500 or
 *                         -500 this stores the minimum end
 *                         score so if any player reaches
 *                         the minimum score specified here,
 *                         game is automatically ended
 * @property maxScore      As with minScore this stores the
 *                         maximum end score so if any
 *                         player reaches the maximum score
 *                         specified here, game is
 *                         automatically ended
 * @property playOrder     the order in which players take
 *                         their turn for each round of the
 *                         game
 * @property scoreBonuses  When game finishes add additional
 *                         bonus scores as a final round
 * @property trackTime     Whether or not to show the "Pause"
 *                         button while the game is active
 *                         and show statistics about the
 *                         time each player took for their
 *                         turns
 */
export interface IConfigDefault {
  allowNegative: boolean,
  endMode: END_MODE,
  minScore?: number,
  maxScore?: number,
  playOrder: PLAY_ORDER,
  scoreBonuses: boolean,
  trackTime: boolean
}

/**
 * This object stores default settings for the app to make
 * configuring a new game much quicker
 *
 * @property allowNegative whether or not scores can have a
 *                         negative value
 * @property endMode       What happens at the end of a game
 * @property minScore      Some games (like Five Hundred)
 *                         end when a player reaches 500 or
 *                         -500 this stores the minimum end
 *                         score so if any player reaches
 *                         the minimum score specified here,
 *                         game is automatically ended
 * @property maxScore      As with minScore this stores the
 *                         maximum end score so if any
 *                         player reaches the maximum score
 *                         specified here, game is
 *                         automatically ended
 * @property name The      name of the game
 * @property playOrder     the order in which players take
 *                         their turn for each round of the
 *                         game
 * @property scoreBonuses  When game finishes add additional
 *                         bonus scores as a final round
 * @property trackTime     Whether or not to show the "Pause"
 *                         button while the game is active
 *                         and show statistics about the
 *                         time each player took for their
 *                         turns
 */
export interface IConfigGame  extends IConfigDefault, IHasName {
  id: number,
  allowNegative: boolean,
  endMode: END_MODE,
  minScore?: number,
  maxScore?: number,
  name: string,
  playOrder: PLAY_ORDER,
  scoreBonuses: boolean,
  trackTime: boolean
}

//  END:  config (Redux) slice interfaces
// ----------------------------------------------
// START: game (Redux) slice intefaces

/**
 * record of a game
 *
 * @property end     Timestamp for when the game ended
 * @property config  configuration information for the game
 * @property pause   information about the "pause" state of
 *                   the game
 * @property players information about the players playing
 *                   the current game
 * @property results final status of the game.
 * @property round   information about the current round of
 *                   turns being played
 * @property scores  list of all the Turns taken so far in
 *                   the game in order of play
 * @property start   Timestamp for when the game started
 */
export interface IGame {
  end: number,
  config: IConfigGame,
  pause: IPause,
  players: GamePlayers,
  results?: IPlayerResult[],
  round?: IRound,
  scores: ITurnComplete[],
  start: number
}

/**
 * Games have rounds so an active game requires an IRound
 * property to store info about the round currently being
 * played
 *
 * @property end     Timestamp for when the game ended
 * @property config  configuration information for the game
 * @property pause   information about the "pause" state of
 *                   the game
 * @property players information about the players playing
 *                   the current game
 * @property round   all the info needed to manage the
 *                   current round of play
 * @property scores  list of all the Turns taken so far in
 *                   the game in order of play
 * @property start   Timestamp for when the game started
 */
export interface IGameActive extends IGame {
  id: number,
  end: number,
  config: IConfigGame,
  pause: IPause,
  players: GamePlayers,
  round: IRound,
  scores: ITurnComplete[],
  start: number,
  stateMachine: GAME_STATE
}

/**
 * A finished games doesn't have rounds but it does have a
 * results where statistics about the game can be stored
 *
 * @property end     Timestamp for when the game ended
 * @property config  Configuration information for the game
 * @property pause   Information about the "pause" state of
 *                   the game
 * @property players Information about the players playing
 *                   the current game
 * @property results All the info needed to record the
 *                   outcome of the game
 * @property round   Information about the current round of
 *                   turns being played
 * @property scores  List of all the Turns taken so far in
 *                   the game in order of play
 * @property start   Timestamp for when the game started
 */
export interface IGameFinished extends IGame {
  end: number,
  config: IConfigGame,
  pause: IPause,
  players: GamePlayers,
  results: IPlayerResult[],
  scores: ITurnComplete[],
  start: number
}


//  END:  game (Redux) slice intefaces
// ----------------------------------------------
// START: hasName interface

export interface IHasName {
  id: number,
  name: string
}

//  END:  hasName interface
// ----------------------------------------------
// START: meta inteface

/**
 * Meta object are used by IAction objects to store the
 * timestamp of when the action first hits the Redux store
 *
 * @property dispatched whether or not this action has
 *                      already passed through some
 *                      middleware
 * @property now        The timestamp for when the action
 *                      first hit Redux store
 */
export interface IMeta {
  code?: number,
  dispatched?: boolean,
  now: number // Timestamp
}


//  END:  meta intefaces
// ----------------------------------------------
// START: PastGames intefaces

export type PastGames = {
  index: 0,
  games: IGameFinished[],
  playerGames: playerGameJoin[]
}

//  END:  PastGames intefaces
// ----------------------------------------------
// START: pause intefaces


/**
 * Pause slice of game interface
 *
 * @property start          When the current pause period
 *                          started
 * @property end            when the current pause period
 *                          ended
 * @property isPaused       Whether or not the game is
 *                          currently paused
 * @property totalPauseTime the total amount of time the
 *                          game has been paused so far
 * @property log            list of all pause events so far
 */
export type IPause = {
  start: number,
  isPaused: boolean,
  pauses: number[],
  totalPauseTime: number,
  log: Array<IPauseLog|IPauseFailLog>
}

/**
 * Log entry generated each time the game is paused or
 * resumed
 *
 * @property message [optional] infomation about why the
 *                   game was paused or resumed
 * @property time    timestamp for when the game was paused
 *                   or resumed
 * @property type    either 'Pause' or 'Resume'
 */
export interface IPauseLog {
  message?: string,
  time: number,
  mode: PAUSE_LOG_TYPE
  error: boolean,
}

/**
 * Log entry generated each time the game is paused or
 * resumed
 *
 * @property message [optional] infomation about why the
 *                   game was paused or resumed
 * @property time    timestamp for when the game was paused
 *                   or resumed
 * @property type    either 'Pause' or 'Resume'
 */
export interface IPauseFailLog extends IPauseLog {
  message: string,
  time: number,
  mode: PAUSE_LOG_TYPE
  error: boolean
}

//  END:  pause interfaces
// ----------------------------------------------
// START: payload intefaces

/**
 * Generic payload objec contains all the possible properties
 * that might be required for every action
 *
 */
export interface IPayload {
  id?: number,
  isPaused?: boolean
  message?: string,
  name?: string,
  pauseDuration?: number,
  player?: IPlayerSimple,
  players?: IPlayerSimple[],
  playOrder?: PLAY_ORDER,
  position?: number,
  score?: number,
  state?: StateSlice,
  totalScore?: number,
  turn?: ITurnComplete,
  turns?: ITurnComplete[],
}

export interface IIdPayload extends IPayload {
  id: number
}
export interface INamePayload extends IPayload {
  name: string
}
export interface IIdNamePayload extends IIdPayload {
  id: number,
  name: string
}
export interface IMessagePayload extends IPayload {
  message: string
}
export interface IResumePayload extends IPayload {
  pauseDuration: number
}
export interface IPlayerPayload extends IPayload {
  player: IPlayerSimple
}
export interface IPlayersPayload extends IPayload {
  players: IPlayerSimple[]
}
export interface IPlayOrderPayload extends IPayload {
  playOrder: PLAY_ORDER
}
export interface IPositionPayload extends IIdPayload {
  id: number,
  position: number
}
export interface IScorePayload extends IIdPayload {
  id: number,
  score: number
}
export interface ITotalScorePayload extends IScorePayload {
  id: number,
  score: number,
  totalScore: number
}
export interface ITurnCompletePayload extends IPayload {
  turn: ITurnComplete
}
export interface ITurnsCompletePayload extends IPayload {
  turns: ITurnComplete[],
}

//  END:  payload interfaces
// ----------------------------------------------
// START: player(s) intefaces


/**
 * IPlayer object are used for tracking statistical
 * information about a player in the current game
 *
 * @property position   Seating positing at the start of
 *                      the game
 * @property rank       Overall rank in the game
 * @property score      Total score (accumulation of score
 *                      from all turns played so far)
 * @property timePaused Total number of seconds the player
 *                      has been paused for during the game
 * @property timePlayed Total number of seconds the player
 *                      has taken for all their turns
 *                      combined (includes paused time)
 * @property turns      The number of turns the play has
 *                      played so far
 */
export interface IPlayer extends IPlayerSimple {
  id: number,
  name: string,
  position: number,
  rank: number,
  score: number,
  timePaused: number,
  timePlayed: number,
  turns: number,
}

/**
 *
 */
export interface IPlayerSimple extends IHasName {
  id: number,
  name: string,
  active: boolean
}

export type playerGameJoin = {
  playerID: number,
  gameID: number,
  seatingOrder: number,
  rank: number
}

export interface IPlayerResult extends IPlayerSimple {
  id: number,
  name: string,
  score: number,
  rank: number
}

export type GamePlayers = {
  playersSeatOrder: IPlayerSimple[]
  finalResult?: ITurnComplete[]
}

export type playersAll = {
  index: number,
  players: IPlayerSimple[]
  playerGames: playerGameJoin[]
}

//  END:  player(s) interfaces
// ----------------------------------------------


/**
 * @property index          the UID for the next round to
 *                          be played
 * @property turns          object containing the turns
 *                          played for this round in the
 *                          game
 * @property playersInOrder list of players yet to have
 *                          their turns
 * @property winnerID       UID of the winner of the round
 * @property leaderID       UID overall game leader
 */
export type IRound = {
  firstPlayerID: number,
  index: number,
  leaderID?: number
  playersInOrder: IPlayerSimple[],
  playOrderIndex: number,
  turns: IRoundTurns,
  winnerID?: number,
  stateMachine: ROUND_STATES
}

/**
 * @property index   UID (for this game) for the next turn
 *                   to be created
 * @property current Turn object for the current player
 * @property played  Array of completed turns
 */
export type IRoundTurns = {
  index: number,
  current: ITurn,
  played: ITurnComplete[]
}

// ----------------------------------------------
// START: turn interfaces

export interface ITurn {
  id: number,
  end: number,
  isBonusRound: boolean,
  pauseDuration: number
  playerID: number,
  playOrder: number,
  score: ITurnScore,
  start: number
}

/**
 * ITurnComplete represents a finalised turn that has been ranked and stored
 * in the scores array it should be immutable
 */
export interface ITurnComplete extends ITurn {
  id: number,
  end: number,
  pauseDuration: number,
  playerID: number,
  playOrder: number,
  rank: ITurnRank,
  roundIndex: number,
  score: ITurnScore,
  start: number
}

export type ITurnScore = {
  round: number,
  total: number
}

export type ITurnRank = {
  round: number,
  overall: number
}

//  END:  turn interfaces
// ----------------------------------------------
// STATE  ui state

export type UIstate = {
  route: string,
  inPlayGameID: number
}

//  END:  ui state
// ----------------------------------------------


export type IWholeScored = {
  allPlayers: playersAll,
  gameConfigs: IGameConfig[],
  currentGame: IGameActive,
  pastGames: PastGames,
  uiState: UIstate,
  errorLog: IErrorPayload[]
}


//  END:  interface declarations
// ========================================================
// START: unions declarations

export type StateSlice = IConfigDefault | IConfigGame | IGame |
                         IGame[] | IPause | GamePlayers | playersAll |
                         IRound | IRoundTurns | ITurnComplete[] |
                         ITurnRank | ITurnScore | number

//  END:  unions declarations
// ========================================================
// START: function interfaces


export interface ICompare {
  (a : any, b: any) : number
}

export interface IGetTurns {
  (
    allScores: ITurnComplete[],
    id: number,
    sortedBy : SCORE_SORT_METHOD
  ) : ITurnComplete[]
}

export interface IReducer {
  (state : StateSlice, action : IAction) : StateSlice
}


//  END:  function interfaces
// ========================================================
// START: enum declarations


export enum END_MODE {
  CURRENT_PLAYER = 'Current player',
  END_ROUND = 'End of current round',
  MIN_MAX_SCORE = 'Min/Max score'
}

/**
 * Play order defines who the first player will be at the start of
 * each round
 *
 * @const {object}
 */
export enum PLAY_ORDER {
  SEATING_POSTION,
  ROUND_WINNER,
  TRICK,
  GAME_LEADER,
  NEXT
}

export enum PAUSE_ACTION {
  start,
  end
}

export enum SCORE_SORT_METHOD {
  order,
  round,
  total
}

export enum FILTER_BY_PROP {
  id = 'id',
  playerID = 'playerID'
}

export enum PAUSE_LOG_TYPE {
  PAUSE,
  RESUME
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

export enum ROUND_STATES {
  NO_ROUND = 'NO_ROUND',
  ROUND_INITIALISED = 'ROUND_INITIALISED',
  ROUND_PLAYERS_ORDERED = 'ROUND_PLAYERS_ORDERED',
  ROUND_TAKING_TURNS = 'ROUND_TAKING_TURNS',
  ROUND_ENDED = 'ROUND_ENDED',
  ROUND_CALCULATING_RANKING = 'ROUND_CALCULATING_RANKING',
  ROUND_FINALISED = 'ROUND_FINALISED'
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


export type AllowableStates = GAME_STATE | ROUND_STATES | TURN_STATES
export type AllEnums = END_MODE | PLAY_ORDER | PAUSE_ACTION | SCORE_SORT_METHOD | FILTER_BY_PROP | PAUSE_LOG_TYPE | TURN_SORT_FIELDS | GAME_STATE | ROUND_STATES | TURN_STATES

export interface StateTransitions {
  next: Array<GAME_STATE, ROUND_STATES, TURN_STATES>,
  previous: Array<GAME_STATE, ROUND_STATES, TURN_STATES>,
  hasSubState: boolean
}

export interface IFiniteStateMachine {
  [propName: string] : StateTransitions
}


//  END:   enum declarations
// ========================================================
