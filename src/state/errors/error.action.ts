import { StateSlice, IActionStamped } from '../utilities/types'
import { ERROR_AT, errorTypes, IErrorAction, ErrorInfo } from './error.types'


export const errorAC = (
  replacements: string[],
  errorType: ERROR_AT,
  action: IActionStamped,
  state: StateSlice = null
) : IErrorAction => {
  const {name, code, message, relacements, logType} = errorTypes[errorType] as ErrorInfo

  return {
    type: name,
    payload: {
      action: action,
      code: code,
      message: printf(
        replacements,
        message,
        relacements
      ),
      state: state,
      type: errorType
    },
    error: true,
    meta: {
      ...action.meta,
      code: code,
      eType: errorType,
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
    const reg = new RegExp('\{\{' + (a + 1) + '\}\}', 'g')
    message = message.replace(reg, replacements[a])
  }

  return message
}
