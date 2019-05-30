import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

class SignIn extends PureComponent {
  render() {
    return (
      <div className="col-md-8">
        <article>
          <h1>Sign In</h1>
          <p>
            Need an account? <Link to="/sign-up">Sign up</Link> free. Your
            opinions and comments would be greatly appreciated.
          </p>
          <hr />
          <div className="well">
            <form autoComplete="off">
              <div className="form-group has-feedback">
                <input
                  placeholder="Username"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="form-group has-feedback">
                <input
                  placeholder="Password"
                  type="password"
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Sign In
              </button>
            </form>
          </div>

          <div>
            <hr />
            <p className="small">
              This is a private system. Unauthorized access to or use of this
              system is strictly prohibited and tracked. By continuing, you
              acknowledge your awareness of and concurrence with the acceptable
              use policy.
            </p>
            <p className="small">
              As you finish, you should sign out to protect yourself.
            </p>
          </div>
        </article>
      </div>
    )
  }
}

export default SignIn
