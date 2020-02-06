import { Middleware } from 'redux'
import { Raven } from 'raven'
/**
 * source: https://redux.js.org/advanced/middleware/#seven-examples
 *
 * Sends crash reports as state is updated and listeners are notified.
 * Note: this is taken directly from the redux documentation
 *       with a little typescript type checking thrown in.
 */
const crashReporter : Middleware = (store) => (next) => (action) => {
  try {
    return next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    })
    throw err
  }
}

export default crashReporter
