import React, { PureComponent } from 'react'

class Footer extends PureComponent {
  render() {
    return (
      <footer className="py-5 bg-dark mt-auto">
        <div className="container">
          <p className="m-0 text-center text-white">
            Copyright &copy; Your Website 2019
          </p>
        </div>
      </footer>
    )
  }
}

export default Footer
