import { Middleware } from 'redux'
import { gameFiniteStateMachine } from '../game/game.initial-state'

/**
 *
 */
const stateMachineMiddleware : Middleware = (store) => (next) => (action) => {
  const {statMachine} = store.getState()
  switch (action.type) {

  }
}
