import { GAME__AT } from '../game/game.types'
import { resumeGame__AC } from '../game/game.action'
import { error__AC } from '../errors/error.action'
import { ERROR__AT } from '../errors/error.types'
import { TURN__AT } from '../round/round.types'
import { IActionStamped, IWholeScored, IGameActive } from '../utilities/types'
import { Middleware, Store } from 'redux'

/**
 * pauseResume() handles adding the paused time (in seconds) to
 * appropriate actions. It also intercepts bad pause/resume actions
 * and kills them. Instead it creates a log only action for logging
 * the problem.
 *
 * pauseResume() must be run after addNowToAction() middleware
 * because it relies on the Date object added by that middleware.
 *
 * @param {Store} store Redux store
 */
export const pauseResumeMiddleware : Middleware = (store) => (next) => (action) => {

  const currentStore : IWholeScored = store.getState()
  const { pause } : IGameActive = currentStore.currentGame

  switch (action.type) {
    case GAME__AT.RESUME:
      if (pause.start > 0 && pause.isPaused === true) {
        // dispatch an additional action to trigger unpausing of the
        // current turn
        return next(
          resumeGame__AC(
            action,
            (action.meta.now - pause.start)
          )
        )

      } else {
        // That's weird we're being asked to resume but are not paused
        return next(
          error__AC(
            ['Resume failed because game was not paused'],
            ERROR__AT.PAUSE_RESUME_FAILURE,
            action
          )
        )
      }

    case GAME__AT.PAUSE:
      // Test if the action is valid and trigger a log event if not.
      if (pause.isPaused === true || pause.start > 0) {
        // no need to trigger an aditional action because
        // GAME.PAUSE actions already have all the info
        // they need for the TURN reducer to process them
        return next(
          error__AC(
            ['Pause failed because game was already paused'],
            ERROR__AT.PAUSE_RESUME_FAILURE,
            action
          )
        )
      }
  }
  return next(action)
}
