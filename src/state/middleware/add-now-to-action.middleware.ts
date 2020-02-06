import { IAction, IActionStamped } from '../utilities/types'
import { Middleware, Store } from '../../node_modules/redux/index'

/**
 * Redux middleware addNowToMetaMiddleware() appends a
 * "now" property to an Iaction's payload object before
 * passing it to the next middleware.
 *
 * Many "scored" actions want a timestamp to allow for
 * logging playing time.
 *
 * @property {Date} now date object to be used
 */
export const addNowToMetaMiddleware : Middleware = (store : Store) => (next) => (action : IAction | IActionStamped) => {
  if (typeof action.meta.now !== 'number') {
    return next(action)
  } else {
    const _now = Date.now()
    // If the action already has a meta property we'll use
    // that to start with
    const _meta = (typeof action.meta === 'undefined') ? { now: _now } : action.meta

    const _modifiedAction : IActionStamped = {
      ...action,
      // make sure the action has a boolean error property
      error: (typeof action.error !== 'boolean') ? false : action.error,
      // Make sure the _meta object has a now property
      // (but don't replace the existing now property if
      //  there is one)
      meta: (typeof _meta.now === 'undefined') ? { ..._meta, now: _now } : _meta
    }

    store.dispatch(_modifiedAction)
  }
}
