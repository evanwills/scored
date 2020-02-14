import {
  IConfigGameDefault, IConfigGame, IGame, IPause, GamePlayers,
  IRound, IRoundTurns, ITurnComplete, ITurnRank, ITurnScore,
  IHasId, IHasName, IGameActive, IIdPayload, IIdNamePayload,
  IPlayerResult, PlayersAll, IPlayerSimple, IScorePayload,  ITurn
} from './scored'
import {
  END_MODE, PLAY_ORDER, PAUSE_ACTION, SCORE_SORT_METHOD,
  FILTER_BY_PROP, PAUSE_LOG_TYPE, TURN_SORT_FIELDS, GAME_STATE,
  ROUND_STATES, TURN_STATES,
  // GAME__AT, ERROR__AT, GAME_PLAYERS__AT, ALL_PLAYERS__AT,
  // ROUND__AT, TURN__AT, E_LOG_TYPE
} from './scored-enums'


/**
 *
 */
export type StateSlice = IConfigGameDefault | IConfigGame | IGame |
                         IGame[] | IPause | GamePlayers | PlayersAll |
                         IRound | IRoundTurns | ITurnComplete[] |
                         ITurnRank | ITurnScore | number

/**
 * HasId is a union of all the types that include an ID property
 */
export type HasId = IHasId | IHasName | IGameActive | IIdPayload |
                    IIdNamePayload | IPlayerResult | PlayersAll |
                    IPlayerSimple | IScorePayload | ITurn |
                    ITurnComplete | IConfigGame

/**
 * HasName is a union of all the types that include a name property
 * (and an ID)
 */
export type HasName = IHasName | IIdNamePayload | IPlayerResult |
                      IConfigGame | IPlayerSimple


export type AllowableStates = GAME_STATE | ROUND_STATES | TURN_STATES

export type AllEnums = END_MODE | PLAY_ORDER | PAUSE_ACTION | SCORE_SORT_METHOD | FILTER_BY_PROP | PAUSE_LOG_TYPE | TURN_SORT_FIELDS | GAME_STATE | ROUND_STATES | TURN_STATES

export interface StateTransitions {
  next: Array<GAME_STATE | ROUND_STATES|TURN_STATES>,
  previous: Array<GAME_STATE | ROUND_STATES | TURN_STATES>,
  hasSubState: boolean
}
