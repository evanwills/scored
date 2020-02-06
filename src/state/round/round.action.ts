
import { IPlayerSimple, PLAY_ORDER} from '../utilities/types'
import { IPlayerAction, ROUND} from './round.types'



export const initialiseRoundAC = (playersSeatOrder : IPlayerSimple[], playOrder: PLAY_ORDER ) : IPlayerAction => {
  return {
    type: ROUND.INITIALISE,
    payload: {
      playOrder: playOrder,
      players: playersSeatOrder
    }
  }
}


export const finaliseRoundAC = () => {
  return {
    type: ROUND.FINALISE,
    payload: {}
  }
}
