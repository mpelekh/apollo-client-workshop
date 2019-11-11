import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { BlogEntries } from '../components/BlogEntries'

export const POST_FRAGMENT = gql`
  fragment PostFragment on Post {
    id
    title
    body
    author: user {
      email
    }
  }
`

const GET_POSTS = gql`
  {
    posts(limit: 20) {
      ...PostFragment
    }
  }
  ${POST_FRAGMENT}
`

export function BlogEntriesContainer() {
  return (
    <Query query={GET_POSTS}>
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
