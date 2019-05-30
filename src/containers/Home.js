import React, { Component } from 'react'
import { BlogEntriesContainer } from './BlogEntriesContainer'
import DetailedPost from '../components/DetailedPost'

class Home extends Component {
  render() {
    const {
      match: { params }
    } = this.props

    return params.id ? (
      <DetailedPost id={params.id} />
    ) : (
      <BlogEntriesContainer />
    )
  }
}

export default Home
