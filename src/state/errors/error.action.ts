import { IActionStamped, IErrorType, IErrorAction, ErrorInfo } from '../types/scored'
import { ERROR__AT, E_LOG_TYPE } from '../types/scored-enums'

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

  BAD_NAME: {
    code: 100,
    name: ERROR__AT.BAD_NAME,
    message: '$1\'s name contained invalid characters or was too long (or both). Name has been cleand up before submission. Now using "$2" as name',
    replacements: 2,
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

  DUPLICATE_NAME: {
    name: ERROR__AT.DUPLICATE_NAME,
    message: 'A $1 with the name "$2" (#$3) already exists in the system.',
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
  },
  STATE_TRANSITION_FAILURE: {
    name: ERROR__AT.STATE_TRANSITION_FAILURE,
    message: 'Cannot transition from $1 to $2 state',
    code: 252,
    replacements: 2,
    logType: E_LOG_TYPE.ERROR
  },
  STATE_TRANSITION_FAILURE_SPECIAL: {
    name: ERROR__AT.STATE_TRANSITION_FAILURE_SPECIAL,
    message: 'Cannot transition from $1 to $2 state because $3',
    code: 253,
    replacements: 3,
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

/**
 * Action creator for handling logging errors
 * @param _replacements list of replacement strings to make
 * @param _errorType
 * @param _action
 * @param _state
 */
const error__AC = (
  _replacements: string[],
  _errorType: ERROR__AT,
  _action: IActionStamped
) : IErrorAction => {
  const {name, code, message, replacements, logType} = errorTypes[_errorType] as ErrorInfo

  return {
    type: name,
    payload: {
      action: _action,
      code: code,
      message: printf(
        _replacements,
        message,
        replacements
      ),
      type: _errorType
    },
    error: true,
    meta: {
      ..._action.meta,
      code: code,
      eType: _errorType,
      logType: logType
    }
  }
}

/**
 * Add strings to a message string to give better error
 * reporting information.
 *
 * @param replacements list of replacement strings in order
 * @param message      message whose contents is to be
 *                     updated
 * @param count        number of replacement strings expected
 */
const printf = (replacements: string[], message: string, count: number) : string => {
  if (replacements.length < count) {
    throw new Error(
      'Error action creator expected ' + count +
      ' replacement strings for {type} but only found ' +
      replacements.length
    )
  }

  let output = message

  for (let a : number = 0; a < count; a += 1) {
    const reg = new RegExp('\\$' + (a + 1), 'g')
    message = message.replace(reg, replacements[a])
  }

  return message
}

export default error__AC
