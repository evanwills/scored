import { AllEnums } from "../types/scored-unions"

// import { AllEnums } from '../types/scored-unions'


/**
 * Test whether the supplied needle matches any of the needles
 * in the enum
 *
 * @param needle     String to be tested
 * @param haystack Enum to test against
 */
const itemInEnum = <T extends AllEnums>(needle: string, haystack: T) : boolean => {
  for (let straw in haystack as T) {
    if ((straw as string) === needle) {
      return true
    }
  }
  return false
}


export default itemInEnum
