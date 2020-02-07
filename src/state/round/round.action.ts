
import { IPlayerSimple, PLAY_ORDER} from '../utilities/types'
import { IPlayerAction, ROUND__AT} from './round.types'



export const initialiseRound__AC = (playersSeatOrder : IPlayerSimple[], playOrder: PLAY_ORDER ) : IPlayerAction => {
  return {
    type: ROUND__AT.INITIALISE,
    payload: {
      playOrder: playOrder,
      players: playersSeatOrder
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
