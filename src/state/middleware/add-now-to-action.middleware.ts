import { IActionStamped } from '../types/scored'
import { Middleware } from 'redux'
import { GAME_STATE, ROUND_STATES } from '../types/scored-enums'

/**
 * Redux middleware addMetaToAction__MW() appends a
 * "now" property to an Iaction's payload object before
 * passing it to the next middleware.
 *
 * Many "scored" actions want a timestamp to allow for
 * logging playing time.
 *
 * @property {Date} now date object to be used
 */
const addMetaToAction__MW : Middleware = (store) => (next) => (action) => {
  if (action.meta.now > 0) {
    return next(action)
  } else {
    // const { currentGame } = store.getState()
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
      meta: (_meta.now === -1) ? {
         ..._meta,
        now: _now,
        // gameState: currentGame.stateMachine,
        // roundState: currentGame.round.stateMachine
        gameState: GAME_STATE.NO_GAME,
        roundState: ROUND_STATES.NO_ROUND
     } : _meta
    }
    return next(_modifiedAction)
  }
}

export default addMetaToAction__MW
