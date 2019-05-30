const COMMENTS_ACTIONS = {
  ADD_COMMENT: 'ADD_COMMENT'
}

export default function comments(state = [], action) {
  switch (action.type) {
    case COMMENTS_ACTIONS.ADD_COMMENT: {
      return [
        ...state,
        {
          id: Date.now(),
          email: 'random@example.com',
          ...action.payload
        }
      ]
    }
    default:
      return state
  }
}

export function addComment(body) {
  return {
    type: COMMENTS_ACTIONS.ADD_COMMENT,
    payload: { body }
  }
}
