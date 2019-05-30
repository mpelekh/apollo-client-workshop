import React, { Component } from 'react'
import { BlogEntriesContainer } from './BlogEntriesContainer'
import { DetailedPostContainer } from './DetailedPostContainer'

class Home extends Component {
  render() {
    const {
      match: { params }
    } = this.props

    return params.id ? (
      <DetailedPostContainer id={params.id} />
    ) : (
      <BlogEntriesContainer />
    )
  }
}

export default Home
