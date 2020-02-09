import { StateSlice, IActionStamped } from '../utilities/types'
import { ERROR__AT, errorTypes, IErrorType, IErrorAction, ErrorInfo } from './error.types'

/**
 * Action creator for handling logging errors
 * @param _replacements list of replacement strings to make
 * @param _errorType
 * @param _action
 * @param _state
 */
export const error__AC = (
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
