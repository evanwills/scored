import { Reducer } from 'redux'
// import { } from '../types/scored'


const errorLog__R : Reducer = (state = [], action) => {
  // We only get errors when some validation has failed so
  // we can assume that the payload is an IErrorPayload
  //
  // For the moment if the action's error property is TRUE
  // just log the payload
  //
  // NOTE: currently I haven't implemented using E_LOG_TYPE
  //       I may or may not do so in the future

  if (action.error === true) {
    return [
      ...state,
      action.payload
    ]
  }

  return state
}


export default errorLog__R
