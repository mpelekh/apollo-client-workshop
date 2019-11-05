import React from 'react'
import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { DetailedPost } from '../components/DetailedPost'

const GET_POST = gql`
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

const ADD_COMMENT = gql`
  mutation AddTodo($postId: ID!, $comment: InputComment!) {
    addCommentToPost(postId: $postId, comment: $comment) {
      id
      comments {
        id
        postId
        name
        email
        body
      }
    }
  }
`

export function DetailedPostContainer({ id }) {
  return (
    <Query query={GET_POST} variables={{ postId: id }}>
      {({
        loading,
        error,
        data: { post: { title, body, author, comments } = {} } = {}
      }) => {
        return (
          <Mutation mutation={ADD_COMMENT}>
            {addComment => {
              return (
                <DetailedPost
                  postId={id}
                  isPostLoading={loading}
                  title={title}
                  body={body}
                  author={author && author.email}
                  comments={comments}
                  error={error && error.message}
                  addComment={addComment}
                />
              )
            }}
          </Mutation>
        )
      }}
    </Query>
  )
}
