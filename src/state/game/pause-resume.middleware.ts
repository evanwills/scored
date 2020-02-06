import { GAME_AT } from '../game/game.types'
import { resumeGameAC } from '../game/game.action'
import { errorAC } from '../errors/error.action'
import { ERROR_AT } from '../errors/error.types'
import { TURN_AT } from '../round/round.types'
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
  const game : IGameActive = currentStore.currentGame

  switch (action.type) {
    case GAME_AT.RESUME:
      if (game.pause.start !== null && game.pause.isPaused === true) {
        // dispatch an additional action to trigger unpausing of the
        // current turn
        return next(
          resumeGameAC(
            action,
            (action.meta.now - game.pause.start)
          )
        )

      } else {
        // That's weird we're being asked to resume but are not paused
        return next(
          errorAC(
            ['Resume failed because game was not paused'],
            ERROR_AT.PAUSE_RESUME_FAILURE,
            action,
            game.pause
          )
        )
      }

    case GAME_AT.PAUSE:
      // Test if the action is valid and trigger a log event if not.
      if (game.pause.isPaused === true || game.pause.start !== null || game.pause.end !== null) {
        // no need to trigger an aditional action because
        // GAME.PAUSE actions already have all the info
        // they need for the TURN reducer to process them
        return next(
          errorAC(
            ['Pause failed because game was already paused'],
            ERROR_AT.PAUSE_RESUME_FAILURE,
            action,
            game.pause
          )
        )
      }
  }
  return next(action)
}
