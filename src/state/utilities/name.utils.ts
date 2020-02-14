import { IHasName, IPlayerSimple } from '../types/scored'


/**
 * Check whether a given name is already in use
 * @param newName
 * @param items
 */
export const isDuplicateName = (newName: string, items: IHasName[]) : number => {
  const findFunc = (item : IHasName) : boolean => (item.name === newName)
  const index = items.findIndex(findFunc)

  return (index > -1 ) ? items[index].id : -1
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
export const getPlayerByID = (_id : number, allPlayers: IPlayerSimple[]) : IPlayerSimple => {
  for (let a = 0; a < allPlayers.length; a += 1) {
    if (allPlayers[a].id === _id) {
      return allPlayers[0]
    }
  }

  return {
    id: -1,
    name: '',
    active: false
  }
}
