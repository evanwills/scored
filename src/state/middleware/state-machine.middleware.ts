import { Middleware } from 'redux'
// import { gameFiniteStateMachine } from '../game/game.initial-state'
import { GAME__AT, GAME_STATE, ROUND__AT, ROUND_STATE } from '../types/scored-enums'
import { gameMachineState__AC } from '../game/game.action'
import { roundStateMachine__AC } from '../round/round.action'
import { IWholeScored } from '../types/scored'
import { PAST_GAME__AT } from '../past-games/past-game.actions'

/**
 * stateMachine__MW() ensures that game & round stateMachines are
 * updated appropriately after each action
 *
 * NOTE: stateMachine__MW() assumes that any bad actions will have
 *       been intercepted and blocked by this point
 *
 * @param store Redux store
 */
const stateMachine__MW : Middleware = (store) => (next) => (action) => {
  console.log('inside stateMachine__MW()')
  const { currentGame } : IWholeScored = store.getState()

  switch (action.type) {
    case GAME__AT.START:
      console.log('inside stateMachine__MW() > GAME__AT.START ("' + GAME__AT.START + '")')
      console.log('action')
      next(action)
      return next(gameMachineState__AC(GAME_STATE.PLAYING_GAME))

    // case GAME__AT.START:
    //   next(action)
    //   return next(gameMachineState__AC(GAME_STATE.PLAYING_GAME))

    case GAME__AT.ADD_PLAYER:
      if (currentGame.stateMachine === GAME_STATE.GAME_INITIALISED) {
        next(action)
        return next(gameMachineState__AC(GAME_STATE.MANAGE_PLAYERS))
      }
      break;

    case GAME__AT.END:
      next(action)
      return next(gameMachineState__AC(GAME_STATE.GAME_ENDED))

    case PAST_GAME__AT.ADD:
      next(action)
      return next(gameMachineState__AC(GAME_STATE.GAME_FINALISED))

    case ROUND__AT.INITIALISE:
      next(action)
      return next(roundStateMachine__AC(ROUND_STATE.ROUND_INITIALISED))

    case ROUND__AT.ADD_TURN:
      if (currentGame.round.stateMachine === ROUND_STATE.ROUND_INITIALISED) {
        next(action)
        return next(roundStateMachine__AC(ROUND_STATE.ROUND_TAKING_TURNS))
      }
      break;

    case ROUND__AT.FINALISE:
      next(action)
      return next(roundStateMachine__AC(ROUND_STATE.ROUND_FINALISED))
  }

  console.log('At the end of stateMachine__MW')
  console.log('action:', action)
  return next(action)
}

export default stateMachine__MW
