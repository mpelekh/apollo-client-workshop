import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../modules/comments'
import { getPosts } from '../modules/posts'

class DetailedPost extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
    date: PropTypes.string,
    author: PropTypes.string,
    comments: PropTypes.array,
    isPostsLoading: PropTypes.bool,
    addComment: PropTypes.func,
    getPosts: PropTypes.func
  }

  state = {
    comment: ''
  }

  onChange = event => {
    event.preventDefault()

    this.setState({
      comment: event.target.value
    })
  }

  onSubmit = event => {
    event.preventDefault()

    this.props.addComment(this.state.comment)
    this.setState({
      comment: ''
    })
  }

  componentDidMount() {
    this.props.getPosts()
  }

  render() {
    const { title, body, date, author, comments, isPostsLoading } = this.props

    if (isPostsLoading) {
      return <div>Loading...</div>
    }

    return (
      <div className="col-lg-8">
        {/* Title */}
        <h1 className="mt-4">{title}</h1>

        {/* Author */}
        <p className="lead">
          by <a href="">{author}</a>
        </p>

        <hr />

        {/* Date/Time */}
        <p>Posted on {date}</p>

        <hr />

        {/* Preview Image */}
        <img
          className="img-fluid rounded"
          src="http://placehold.it/900x300"
          alt=""
        />

        <hr />

        {/* Post Content */}
        {body}

        <hr />

        {/* Comments Form */}
        <div className="card my-4">
          <h5 className="card-header">Leave a Comment:</h5>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <textarea
                  className="form-control"
                  rows="3"
                  value={this.state.comment}
                  onChange={this.onChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>

        {comments.map(({ email, body, id }) => (
          <div className="media mb-4" key={id}>
            <img
              className="d-flex mr-3 rounded-circle"
              src="http://placehold.it/50x50"
              alt=""
            />
            <div className="media-body">
              <h5 className="mt-0">{email}</h5>
              {body}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = ({ posts, comments }, { id }) => ({
  comments,
  isPostsLoading: posts.isLoading,
  ...posts.items.find(({ id: postId }) => postId === Number(id))
})

export default connect(
  mapStateToProps,
  { addComment, getPosts }
)(DetailedPost)
