import { isObjectWithID__TG } from './typegards'
import { IHasName } from './types'

export const itemMatchesID = (id: number, items : IHasName[]) : boolean => {
  for (let a = 0; a < items.length; a += 1) {
    if (isObjectWithID__TG(items[a]) && items[a].id === id) {
      return true
    }
  }
  return false
}

export const getItemById = (id: number, items: IHasName[]) : IHasName => {
  for (let a = 0; a < items.length; a += 1) {
    if (isObjectWithID__TG(items[a]) && items[a].id === id) {
      return items[a]
    }
  }
  return {
    id: -1,
    name: ''
  }
}
