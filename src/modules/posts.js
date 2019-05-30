const POSTS_ACTIONS = {
  GET_POSTS_LOADING: 'GET_POSTS_LOADING',
  GET_POSTS_SUCCESS: 'GET_POSTS_SUCCESS',
  GET_POSTS_ERROR: 'GET_POSTS_ERROR'
}

const INITIAL_STATE = {
  isLoading: false,
  error: null,
  items: []
}

export default function posts(state = INITIAL_STATE, action) {
  switch (action.type) {
    case POSTS_ACTIONS.GET_POSTS_LOADING: {
      return {
        ...state,
        isLoading: true
      }
    }
    case POSTS_ACTIONS.GET_POSTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        items: action.payload
      }
    }
    case POSTS_ACTIONS.GET_POSTS_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    default:
      return state
  }
}

export const getPosts = () => dispatch => {
  dispatch({ type: POSTS_ACTIONS.GET_POSTS_LOADING })

  fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
    .then(response => response.json())
    .then(posts =>
      dispatch({ type: POSTS_ACTIONS.GET_POSTS_SUCCESS, payload: posts })
    )
    .catch(error =>
      dispatch({ type: POSTS_ACTIONS.GET_POSTS_ERROR, payload: error })
    )
}
