import { Reducer } from 'redux'
import { GAME__AT, IResumeGameAction } from '../game/game.types'
import { IPause, IPauseLog, IPauseFailLog, IActionStamped, PAUSE_LOG_TYPE } from '../utilities/types'
import { ERROR__AT } from '../errors/error.types'
import { initialPause } from './game.initial-state'


export const pause__R : Reducer = (state = initialPause, action) => {
  switch (action.type) {
    case GAME__AT.PAUSE:
      const {type, payload, error, meta} = (action as IResumeGameAction)
      return {
        start: (action.meta.now as number),
        end: -1,
        isPaused: true,
        log: [
          ...state.log,
          {
            error: false,
            mode: PAUSE_LOG_TYPE.PAUSE,
            time: action.meta.now
          }
        ],
        pauses: state.pauses,
        totalPauseTime: state.totalPauseTime,
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
              error: false,
              mode: PAUSE_LOG_TYPE.RESUME,
              time: action.meta.now
            }
          ],
          pauses: state.pauses,
          totalPauseTime: state.totalPauseTime + pauseDuration
        }
      } else {
        return {
          start: -1,
          end: -1,
          isPaused: false,
          log: state.log,
          pauses: state.pauses,
          totalPauseTime: state.totalPauseTime
        }
      }

    case ERROR__AT.PAUSE_RESUME_FAILURE:
      return {
        ...state,
        log: [
          ...state.log,
          {
            error: true,
            time: action.meta.now,
            message: action.payload.message,
            mode: (action.payload.isPaused) ? PAUSE_LOG_TYPE.PAUSE : PAUSE_LOG_TYPE.RESUME
          }
        ]
      }
      // if (action.payload.isPaused === true) {
      // } else {
      // }
      // break

    default:
      return state
  }
}
