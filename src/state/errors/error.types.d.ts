import { IMeta, StateSlice, IPayload, IActionStamped } from '../utilities/types'


export enum ERROR__AT {
  BAD_PLAYER_NAME = 'BAD_PLAYER_NAME',
  PLAYER_ALREADY_ADDED = 'PLAYER_ALREADY_ADDED',
  CANT_ADD_INACTIVE_PLAYER = 'CANT_ADD_INACTIVE_PLAYER',
  DUPLICATE_PLAYER_NAME = 'DUPLICATE_PLAYER_NAME',
  PLAYER_NOT_FOUND = 'PLAYER_NOT_FOUND',
  PAUSE_RESUME_FAILURE = 'PAUSE_RESUME_FAILURE'
}

export enum E_LOG_TYPE {
  LOG,
  INFO,
  NOTICE,
  WARN,
  ERROR
}

export interface IErrorMeta extends IMeta {
  now: number,
  logType: E_LOG_TYPE,
  code: number,
  eType: ERROR__AT
}

/**
 * @property code         Machine readable identifier for error
 * @property message      Human readable explanation of the error
 * @property name         Human readable identifier for the error
 * @property replacements The number of replacement strings
 *                        expected for this error
 * @property logType      The type of console output for this error
 */
export type ErrorInfo = {
  code: number,
  message: string,
  name: string,
  replacements: number,
  logType: E_LOG_TYPE
}

export interface IErrorPayload extends IPayload {
  action: IActionStamped,
  code: number,
  message: string,
  type: ERROR__AT
}

/**
 * These objects requre the error property to present
 * (and true)
 *
 * @property type the type of action (used by middleware
 *                and reducers) to work out what to do
 * @property payload information used by reducers to do
 *                   their job
 * @property error   [required] whether or not this action
 * @property meta    extra metadat useful for the action
 *                   (mostly used by middleware to not
 *                    apply duplicate data and functionality
 *                    to actions that have already been
 *                    passed throught the middle ware)
 */
export interface IErrorAction extends IActionStamped {
  type: string,
  payload: IErrorPayload,
  error: boolean,
  meta: IErrorMeta
}


export interface IErrorType {
  [propName: string] : ErrorInfo
}

/**
 * This represents a definitive list of errors the *scored*
 * app knows about and can handle
 *
 * 100 - 149 errors are user input errors that *scored* can
 *                  work around
 * 150 - 199 errors are user input errors that *scored*
 *                  cannot fix
 * 200 - 249 errors are application errors where the
 *                  developer has made a mistake but
 *                  *scored* can recover
 * 250 - 299 errors are application errors where something
 *                  has gone wrong and *scored* cannot
 *                  revover
 * 300 - 599 errors are reserved for standard HTTP response
 *                  error codes
 */
export const errorTypes : IErrorType = {
  // ============================================
  // START: recoverable errors

  // --------------------------------------------
  // START: Recoverable user input errors

  BAD_PLAYER_NAME: {
    code: 100,
    name: ERROR__AT.BAD_PLAYER_NAME,
    message: 'Player\'s name contained invalid characters or was too long (or both). Name has been cleand up before submission. Using: "$1"',
    replacements: 1,
    logType: E_LOG_TYPE.WARN
  },

  //  END:  Recoverable user input errors
  // --------------------------------------------
  // START: Recoverable system errors

  PLAYER_ALREADY_ADDED: {
    name: ERROR__AT.PLAYER_ALREADY_ADDED,
    message: 'Player "$1" (#$2) has already been added to the game.',
    code: 150,
    replacements: 2,
    logType: E_LOG_TYPE.WARN
  },
  CANT_ADD_INACTIVE_PLAYER: {
    name: ERROR__AT.CANT_ADD_INACTIVE_PLAYER,
    message: 'Cannot add an inactive player "$1" (#$2 to the game',
    code: 151,
    replacements: 2,
    logType: E_LOG_TYPE.WARN
  },

  //  END:  Recoverable system errors
  // --------------------------------------------


  //  END:  recoverable errors
  // ============================================
  // START: unrecoverable errors


  // --------------------------------------------
  // START: Unrecoverable user input errors

  DUPLICATE_PLAYER_NAME: {
    name: ERROR__AT.DUPLICATE_PLAYER_NAME,
    message: 'A player with the name "$1" (#$2) already exists in the system.',
    code: 200,
    replacements: 2,
    logType: E_LOG_TYPE.ERROR
  },

  //  END: Unrecoverable user input errors
  // --------------------------------------------
  // START: Unrecoverable system errors

  PLAYER_NOT_FOUND: {
    name: ERROR__AT.PLAYER_NOT_FOUND,
    message: 'Could not find player matching the specified ID: $1',
    code: 250,
    replacements: 1,
    logType: E_LOG_TYPE.ERROR
  },
  PAUSE_RESUME_FAILURE: {
    name: ERROR__AT.PAUSE_RESUME_FAILURE,
    message: '$1',
    code: 251,
    replacements: 0,
    logType: E_LOG_TYPE.ERROR
  }

  //  END:  Unrecoverable system errors
  // --------------------------------------------


  // --------------------------------------------
  // START: HTTP errors

  //  END:  HTTP errors
  // --------------------------------------------

  //  END:  unrecoverable errors
  // ============================================
}
