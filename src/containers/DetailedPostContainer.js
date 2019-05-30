import React from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import { DetailedPost } from '../components/DetailedPost'

const graphqlQuery = gql`
  query Post($postId: ID!) {
    post(postId: $postId) {
      id
      title
      body
      comments {
        id
        postId
        name
        email
        body
      }
      author: user {
        email
      }
    }
  }
`

export function DetailedPostContainer({ id }) {
  return (
    <Query query={graphqlQuery} variables={{ postId: id }}>
      {({
        loading,
        error,
        data: { post: { title, body, author, comments } = {} } = {}
      }) => {
        debugger
        return (
          <DetailedPost
            isPostLoading={loading}
            title={title}
            body={body}
            author={author && author.email}
            comments={comments}
            error={error && error.message}
          />
        )
      }}
    </Query>
  )
}
