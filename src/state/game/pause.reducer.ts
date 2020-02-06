import { Reducer } from 'redux'
import { GAME_AT } from '../game/game.types'
import { IPause, IPauseLog, IPauseFailLog, IActionStamped, PAUSE_LOG_TYPE } from '../utilities/types'
import { ERROR_AT } from '../errors/error.types'

const initialPause : IPause = {
  start: -1,
  end: -1,
  isPaused: false,
  pauses: [],
  totalPauseTime: 0,
  log: []
}

export const pauseReducer : Reducer = (state : IPause = initialPause, action : IActionStamped ) : IPause => {
  switch (action.type) {
    case GAME_AT.PAUSE:
      return {
        start: action.meta.now,
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

    case GAME_AT.RESUME:
      if (action.payload.pauseDuration > 0) {
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

    case ERROR_AT.PAUSE_RESUME_FAILURE:
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
