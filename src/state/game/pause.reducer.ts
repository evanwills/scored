import { Reducer } from 'redux'

import { GAME__AT, IResumeGameAction } from '../../types/game.types'
import { IPause, IPauseLog, IActionStamped, PAUSE_LOG_TYPE,GAME_STATE } from '../../types/scored'

import { initialPause } from './game.initial-state'


export const pause__R : Reducer = (state = initialPause, action) => {
  switch (action.type) {
    case GAME__AT.PAUSE:
      return {
        ...state,
        start: (action.meta.now as number),
        isPaused: true,
        log: [
          ...state.log,
          {
            mode: PAUSE_LOG_TYPE.PAUSE,
            time: action.meta.now
          }
        ]
      }

    case GAME__AT.RESUME:
      if ((action.payload.pauseDuration as number) > 0) {
        const { pauseDuration } = action.payload
        return {
          start: -1,
          end: -1,
          isPaused: false,
          log: [
            ...state.log,
            {
              mode: PAUSE_LOG_TYPE.RESUME,
              time: action.meta.now
            }
          ],
          pauses: [...state.pauses, pauseDuration],
          totalPauseTime: state.totalPauseTime + pauseDuration
        }
      }

    default:
      return state
  }
}
