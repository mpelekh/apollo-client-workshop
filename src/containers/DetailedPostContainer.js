import React from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
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

const COMMENTS_SUBSCRIPTION = gql`
  subscription commentAdded($postId: ID!) {
    commentAdded(postId: $postId) {
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
        data: { post: { title, body, author, comments } = {} } = {},
        subscribeToMore
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
                  subscribeToNewComments={() =>
                    subscribeToMore({
                      document: COMMENTS_SUBSCRIPTION,
                      variables: { postId: id },
                      updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData.data) return prev
                        const newComment = subscriptionData.data.commentAdded

                        return Object.assign({}, prev, {
                          post: {
                            ...prev.post,
                            comments: [...prev.post.comments, newComment]
                          }
                        })
                      }
                    })
                  }
                />
              )
            }}
          </Mutation>
        )
      }}
    </Query>
  )
}
