import { IHasId } from '../types/scored'


/**
 * returns a function that can be passed as a callback to
 * Array.findIndex() (and Array.find)
 *
 * @param _id the ID of the item being sought
 */
const findFunc = (_id: number) => (item : IHasId) : boolean => ((item as IHasId).id === _id)

/**
 * Check whether an item matching the specified ID exists within
 * the list of supplied items
 *
 * @param id    (needle) ID for desired item
 * @param items (haystack) list of items to be searched
 */
export const itemMatchesID = (id: number, items : Array<IHasId>) : boolean => {
  return (items.findIndex(findFunc(id)) > -1)
}

/**
 * Find the item matching the specified ID
 *
 * @param id    (needle) ID for desired item
 * @param items (haystack) list of items to be searched
 */
export const getItemById = <T extends IHasId>(id: number, items: Array<T>) : T|IHasId => {
  const index = items.findIndex(findFunc(id))

  return (index > -1) ? items[index] : { id: -1 }
}


/**
 * Find the index of the item matching the specified ID
 *
 * @param id    (needle) ID for desired item
 * @param items (haystack) list of items to be searched
 */
export const getItemIndexByID = (id: number, items: Array<IHasId>) : number => items.findIndex(findFunc(id))
