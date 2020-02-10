import { AllEnums } from './types'


/**
 * Test whether the supplied needle matches any of the needles
 * in the enum
 *
 * @param needle     String to be tested
 * @param haystack Enum to test against
 */
const itemInEnum = (needle: string, haystack: any) : boolean => {
  for (let straw in haystack as any) {
    if (straw === needle) {
      return true
    }
  }
  return false
}


export default itemInEnum
