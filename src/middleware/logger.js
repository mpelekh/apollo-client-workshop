export default ({ dispatch, getState }) => next => action => {
  console.groupCollapsed('Action')

  console.log('--- previous state: %o', getState())
  console.log('--- action: %o', action)

  const result = next(action)

  console.log('--- current state: %o', getState())
  console.groupEnd()

  return result
}
