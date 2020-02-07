import { Middleware } from 'redux'

/**
 * source: https://redux.js.org/advanced/middleware/#seven-examples
 *
 * Logs all actions and states after they are dispatched.
 * Note: this is taken directly from the redux documentation
 *       with a little typescript type checking thrown in.
 */
const loggerMiddleware : Middleware = (store) => (next) => (action) => {
  console.group(action.type)
  let func = 'info'
  if (action.error === true) {
    if (action.meta.code > 200) {
      console.error('dispatching', action)
    } else {
      console.warn('dispatching', action)
    }
  } else {
    console.info('dispatching', action)
  }

  let result = next(action)

  console.log('next state', store.getState())
  console.groupEnd()

  return result
}

export default loggerMiddleware
