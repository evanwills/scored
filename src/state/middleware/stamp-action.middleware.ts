import { IActionStamped, IMetaStamped } from '../types/scored'
import { Middleware } from 'redux'
// import { GAME_STATE, ROUND_STATE } from '../types/scored-enums'

/**
 * Redux middleware stampAction__MW() appends a
 * "now" property to an Iaction's payload object before
 * passing it to the next middleware.
 *
 * Many "scored" actions want a timestamp to allow for
 * logging playing time.
 *
 * @property {Date} now date object to be used
 */
const stampAction__MW : Middleware = (store) => (next) => (action) => {
  console.log('inside stampAction__MW()')

  if (action.meta.now > 0) {
    console.log('old action')
    if (action.meta.z > 10) {
      throw new Error('We\'ve seen this action way too many times.')
    }
    console.log('sending action onto next middleware')
    return next({
      ...action,
      meta: {
        ...action.meta,
        z: action.meta.z + 1
      }
    })
  } else {
    // const { currentGame } = store.getState()
    const _now = Date.now()
    // If the action already has a meta property we'll use
    // that to start with
    const _meta = (typeof action.meta === 'undefined') ? { now: _now } : action.meta
    const _nowState = store.getState()
    console.log('action.meta:', action.meta)
    console.log('_meta:', _meta)

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
        gameState: _nowState.currentGame.stateMachine,
        // roundState: currentGame.round.stateMachine
        roundState: _nowState.currentGame.round.stateMachine,
        z: 1
      } : {
        ..._meta,
        z: _meta.z + 1
      }
    }
    return next(_modifiedAction)
  }
}

export default stampAction__MW
