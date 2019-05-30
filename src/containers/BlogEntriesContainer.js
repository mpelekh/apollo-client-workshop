import React from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import { BlogEntries } from '../components/BlogEntries'

const graphqlQuery = gql`
  {
    posts(limit: 20) {
      id
      title
      body
      author: user {
        email
      }
    }
  }
`

export function BlogEntriesContainer() {
  return (
    <Query query={graphqlQuery}>
      {({ loading, error, data: { posts = [] } = {} }) => {
        return (
          <BlogEntries
            isLoading={loading}
            posts={posts.map(post => ({ ...post, author: post.author.email }))}
            error={error && error.message}
          />
        )
      }}
    </Query>
  )
}
