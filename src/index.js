import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './containers/App'
import * as serviceWorker from './serviceWorker'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const signedInUser = { email: 'mpelekh@lohika.com' }
export const UserContext = React.createContext({
  email: 'guest@lohika.com'
})

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <UserContext.Provider value={signedInUser}>
        <App />
      </UserContext.Provider>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
