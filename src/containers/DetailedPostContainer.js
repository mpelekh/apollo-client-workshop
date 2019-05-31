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
    addComment(postId: $postId, comment: $comment) {
      id
      postId
      name
      email
      body
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
          <Mutation
            mutation={ADD_COMMENT}
            update={(cache, { data: { addComment } }) => {
              console.log(cache)
              const { post } = cache.readQuery({
                query: GET_POST,
                variables: { postId: id }
              })
              cache.writeQuery({
                query: GET_POST,
                variables: { postId: id },
                data: {
                  post: { ...post, comments: [...post.comments, addComment] }
                }
              })
            }}>
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
