import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import Home from './Home'
import About from './About'
import SignIn from './SignIn'
import SignUp from './SignUp'

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Navigation />

          <div className="container">
            <div className="row">
              <Route path="/" component={Home} exact />
              <Route path="/home" component={Home} exact />
              <Route path="/posts" component={Home} exact />
              <Route path="/posts/:id" component={Home} />
              <Route path="/about" component={About} exact />
              <Route path="/sign-in" component={SignIn} exact />
              <Route path="/sign-up" component={SignUp} exact />
            </div>
          </div>

          <Footer />
        </Fragment>
      </Router>
    )
  }
}

export default App
