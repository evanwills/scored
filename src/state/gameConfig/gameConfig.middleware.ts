import { Middleware } from 'redux'

// import { IConfigGame } from '../types/scored'
import { ERROR__AT, GAME_CONFIG__AT } from '../types/scored-enums'

import { itemMatchesID } from '../utilities/item-by-id.utils'
import { isDuplicateName, sanitiseName } from '../utilities/name.utils'

import error__AC from '../errors/error.action'
// import gameMiddleWare from '../game/game.middleware'

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
const gameConfigMiddleware : Middleware = (store) => (next) => (action) => {
  const { gameConfigs } = store.getState()
  let sanitised : string = ''
  let payload = action.payload

  switch (action.type) {
    case GAME_CONFIG__AT.ADD:
    case GAME_CONFIG__AT.UPDATE:
      const duplicateID = isDuplicateName(payload.gameConfig.name, gameConfigs)
      if (duplicateID > 0) {
        return next(
          error__AC(
            ['game', payload.name, duplicateID],
            ERROR__AT.DUPLICATE_NAME,
            action
          )
        )
      } else {
        sanitised = sanitiseName(payload.gameConfig.name)
        if (sanitised !== payload.gameConfig.name) {
          store.dispatch(
            error__AC(
              ['game', payload.name],
              ERROR__AT.BAD_NAME,
              action
            )
          )
          return next({
            ...action,
            payload: {
              ...payload,
              gameConfig: {
                ...payload.gameConfig,
                name: sanitised
              }
            }
          })
        } else {
          return next(action)
        }
      }

    case GAME_CONFIG__AT.CLONE:
      if (itemMatchesID(payload.id, gameConfigs)) {
        sanitised = sanitiseName(payload.name)
        if (sanitised !== payload.name) {
          store.dispatch(
            error__AC(
              ['game', payload.name],
              ERROR__AT.BAD_NAME,
              action
            )
          )
          return next({
            ...action,
            payload: {
              ...payload,
              name: sanitised
            }
          })
        } else {
          return next(action)
        }
      } else {
        return next(
          error__AC(
            ['game config', payload.id],
            ERROR__AT.NOT_FOUND_BY_ID,
            action
          )
        )
      }

    default:
      return next(action)
  }
}


export default gameConfigMiddleware
