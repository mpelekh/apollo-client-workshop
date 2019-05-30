# Workshop Steps

## Setup redux

1. `npm install --save redux react-redux`
2. Add `src/store.js`. 
    - https://github.com/reduxjs/redux/blob/master/src/createStore.js#L31
    ```js
    import { createStore } from 'redux'
    import rootReducer from './modules'
    
    const initialState = {}
    
    const store = createStore(
      rootReducer,
      initialState
    )
    
    export default store
    ```
    
3. Create `src/modules` directory and put the root reducer here.
    ```js
    export default (state, action) => {
      return state;
    }
    ```

4. Wrap `App` by `Provider`.
    ```js
    <Provider store={store}>
        <App />
    </Provider>
    ```

## Add Initial State

1. Add initialState in `store.js`
    ```js
    import initialState from './samples/initial-data'
    console.log(store.getState())
    ```
2. Remove provided props from `BlogEntries` and `DetailedPost` component.
3. Obtain these props via redux using `connect()`.

## Simple Action Creators
1. Action Creators - https://redux.js.org/basics/actions#action-creators
2. Reducers - https://redux.js.org/basics/reducers#reducers
3. Update reducers:
    ```js
    const COMMENTS_ACTIONS = {
      ADD_COMMENT: 'ADD_COMMENT'
    }
    
    function comments(state, action) {
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
    
    export default (state, action) => {
      switch (action.type) {
        case COMMENTS_ACTIONS.ADD_COMMENT: {
          return {
            ...state,
            comments: comments(state.comments, action)
          }
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
    ```

4. Add ability to add comments in `DetailedPost` component:
    ```js
      state = {
        comment: ''
      }
    
      onChange = event => {
        event.preventDefault()
    
        this.setState({
          comment: event.target.value
        })
      }
    
      onSubmit = event => {
        event.preventDefault()
    
        this.props.addComment(this.state.comment)
        this.setState({
          comment: ''
        })
      }
    ```

## Middleware

1. https://redux.js.org/advanced/middleware#middleware
2. https://github.com/reduxjs/redux/blob/master/src/createStore.js#L53
3. https://github.com/reduxjs/redux/blob/master/src/applyMiddleware.js#L19
4. Crete Logger middleware (`middleware/logger.js`)
    ```js
    export default ({dispatch, getState}) => next => action => {
      console.groupCollapsed("Action")
    
      console.log("--- previous state: %o", getState());
      console.log("--- action: %o", action);
    
      const result = next(action);
    
      console.log("--- current state: %o", getState());
      console.groupEnd();
    
      return result;
    }
    ```
5. Add `applyMiddleware()` to store:
    ```js
    const store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(logger)
    )
    ```
    
## Combine Reducers

1. Rename `modules/index.js` -> `modules/comments.js`
2. Add `combineReducers()`
    ```js
    import { combineReducers } from 'redux'
    import comments from './comments'
    
    export default combineReducers({
      comments,
      posts: (state = [], action) => state
    })
    ```
3. Refactor `modules/comments.js`
    
## Async Action Creators

1. Add `modules/posts.js`:
    ```js
    const POSTS_ACTIONS = {
      GET_POSTS_LOADING: 'GET_POSTS_LOADING',
      GET_POSTS_SUCCESS: 'GET_POSTS_SUCCESS',
      GET_POSTS_ERROR: 'GET_POSTS_ERROR',
    }
    
    const INITIAL_STATE = {
      isLoading: false,
      error: null,
      items: [],
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
            items: action.payload,
          }
        }
        case POSTS_ACTIONS.GET_POSTS_ERROR: {
          return {
            ...state,
            isLoading: false,
            error: action.payload,
          }
        }
        default:
          return state
      }
    }
    
    export const getPosts = () => {
      dispatch({type: POSTS_ACTIONS.GET_POSTS_LOADING});
    
      fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
        .then(response => response.json())
        .then(posts => dispatch({type: POSTS_ACTIONS.GET_POSTS_SUCCESS, payload: posts}))
        .catch(error => dispatch({type: POSTS_ACTIONS.GET_POSTS_ERROR, payload: error}));
    }
    ```
2. How to obtain dispatch in async action creator?
3. Use `redux-thunk` middleware: https://github.com/reduxjs/redux-thunk/blob/master/src/index.js
4. `npm i redux-thunk`
5. Add `redux-thunk` to store as middleware:
    ```js
    const store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(thunk, logger)
    )
    ```
6. Update posts module (add dispatch to action creator):
    ```js
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
    ```
7. Obtain posts from API using the getPosts() action creator.

## React.Context API

1. https://reactjs.org/docs/context.html
2. https://daveceddia.com/context-api-vs-redux/
3. https://frontarm.com/james-k-nelson/when-context-replaces-redux/
4. Add `Provider`
    ```js
    const signedInUser = { email: 'mpelekh@lohika.com' }
    export const UserContext = React.createContext({
      email: 'guest@lohika.com'
    })
    
    render(
      <Provider store={store}>
        <UserContext.Provider value={signedInUser}>
          <App />
        </UserContext.Provider>
      </Provider>,
      document.getElementById('root')
    )
    ```
5. Add `Consumer`
    ```js
    function SignedInUser() {
      return (
        <UserContext.Consumer>
          {user => <span>{user.email}</span>}
        </UserContext.Consumer>
      )
    }
    ```
