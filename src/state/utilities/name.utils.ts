import { IAction, IWholeScored, IHasName, IPlayerSimple } from '../utilities/types'

/**
 * Check whether a given name is already in use
 * @param newName
 * @param items
 */
export const isDuplicateName = (newName: string, items: IHasName[]) : boolean => {
  // Q: Why use a for loop instead of Array.reduce()?
  // A: Mostly for readability and because I can terminate
  //    the loop as soon as I have a match.
  //    I could also use filter but again you have to
  //    process the whole array.

  for (let a = 0; a < items.length; a += 1) {
    if (newName === items[a].name) {
      return true;
    }
  }
  return false
}

/**
 * Ensure a name is valid and no longer than 32 characters
 *
 * @param _name name of user or game
 */
export const sanitiseName = (_name: string) : string => {
  // strip invalid characters
  let _output = _name.replace(/[^\w\d&',.\- ]+/ig, ' ')

  // strip duplicate punctuation/space characters
  _output = _output.replace(/([ &,.\-'])$1+/g, '$1')

  // remove punctuation from start and end of string
  _output = _output.replace(/(?:^[0-9&,.\-']+|[&,\-']+$)/g, '')

  if (_output.length > 32) {
    // make sure the name is no longer than 32 characters
    _output = _output.substring(0, 31)
  }

  return _output
}

/**
 * Get the object for the specified player
 *
 * @param _id        ID of player to be retrieved
 * @param allPlayers list of players in the system
 */
export const getPlayerByID = (_id : number, allPlayers: IPlayerSimple[]) : IPlayerSimple | null => {
  for (let a = 0; a < allPlayers.length; a += 1) {
    if (allPlayers[a].id === _id) {
      return allPlayers[0]
    }
  }
  return null
}
