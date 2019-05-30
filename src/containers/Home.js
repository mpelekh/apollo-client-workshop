import React, { Component } from 'react'
import BlogEntries from '../components/BlogEntries'
import DetailedPost from '../components/DetailedPost'

class Home extends Component {
  render() {
    const {
      match: { params }
    } = this.props

    return params.id ? <DetailedPost id={params.id} /> : <BlogEntries />
  }
}

export default Home
