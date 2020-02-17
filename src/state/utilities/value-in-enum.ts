import { ALL_PLAYERS__AT, E_LOG_TYPE, END_MODE, ERROR__AT, GAME__AT, GAME_CONFIG__AT,  GAME_PLAYERS__AT, GAME_STATE, FILTER_BY_PROP, PLAY_ORDER, ROUND__AT, ROUND_STATE, SCORE_SORT_METHOD, TURN__AT, TURN_SORT_FIELDS, TURN_STATES } from '../types/scored-enums'


// import { AllEnums } from '../types/scored-unions'


/**
 * Test whether the supplied needle matches any of the needles
 * in the enum
 *
 * @param needle   String to be tested
 * @param haystack Enum to test against
 */
const itemInEnum = <T extends ALL_PLAYERS__AT | E_LOG_TYPE | END_MODE | ERROR__AT | FILTER_BY_PROP | GAME__AT | GAME_CONFIG__AT | GAME_PLAYERS__AT | GAME_STATE | PLAY_ORDER | SCORE_SORT_METHOD | TURN_SORT_FIELDS | ROUND_STATE | TURN_STATES | ROUND__AT | TURN__AT>(needle: string, haystack: T) : boolean => {
  for (let straw in haystack as T) {
    if ((straw as string) === needle) {
      return true
    }
  }
  return false
}


export default itemInEnum
