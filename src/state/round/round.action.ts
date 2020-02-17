
import { IAction, IPlayerSimple, IPlayersAction } from '../types/scored'
import { PLAY_ORDER, ROUND__AT, ROUND_STATE} from '../types/scored-enums'
// import {} from '../../types/round.types'



export const initialiseRound__AC = (playersSeatOrder : IPlayerSimple[], playOrder: PLAY_ORDER, _id : number = -1 ) : IPlayersAction => {
  console.log('inside initialiseRound__AC()')
  console.log('playersSeatOrder', playersSeatOrder)
  console.log('playOrder', playOrder)
  console.log('_id', _id)
  return {
    type: ROUND__AT.INITIALISE,
    payload: {
      id: _id,
      playOrder: playOrder,
      players: playersSeatOrder,
    },
    error: false,
    meta: {
      now: -1
    }
  }
}


export const finaliseRound__AC = () => {
  return {
    type: ROUND__AT.FINALISE,
    payload: {},
    error: false,
    meta: {
      now: -1
    }
  }
}

export const roundStateMachine__AC = (newState : ROUND_STATE) : IAction => {
  return {
    type: ROUND__AT.UPDATE_STATE,
    payload: {
      stateMachine: newState
    },
    error: false,
    meta: {
      now: -1
    }
  }
}
