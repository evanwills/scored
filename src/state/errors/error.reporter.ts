import { Store } from 'redux'
// import { IErrorPayload } from '../types/scored'

const errorReporter = (store: Store) => () => {
  const { errorLog } = store.getState()

  const l = errorLog.length

  if (l > 0) {
    console.group("There have been " + l + " errors")

    for (let a = 0; a < l; a += 1) {
      const {action, code, message, type, line, file} = errorLog[a]
      console.group('ERROR: ' + type + ' (#' + code + ')')
      console.error('file:    ' + file +  ' (line: ' + line + ')')
      console.error('message: ', message)
      console.error('action:  ', action)
      console.groupEnd()
    }

    console.groupEnd()
  }
}

export default errorReporter
