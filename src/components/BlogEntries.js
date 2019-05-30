import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPosts } from '../modules/posts'
import BlogPost from './BlogPost'

class BlogEntries extends Component {
  static propTypes = {
    posts: PropTypes.array,
    isLoading: PropTypes.bool,
    getPosts: PropTypes.func
  }

  static defaultPropTypes = {
    posts: []
  }

  componentDidMount() {
    this.props.getPosts()
  }

  render() {
    const { posts, isLoading } = this.props

    return (
      <div className="col-md-8">
        <h1 className="my-4">
          Page Heading <small>Secondary Text</small>
        </h1>

        {isLoading && <div>Loading...</div>}
        {!isLoading &&
          posts.map(({ id, title, body, date, author }) => (
            <BlogPost
              key={id}
              id={id}
              title={title}
              body={body}
              date={date}
              author={author}
            />
          ))}

        <ul className="pagination justify-description-center mb-4">
          <li className="page-item">
            <a className="page-link" href="">
              &larr; Older
            </a>
          </li>
          <li className="page-item disabled">
            <a className="page-link" href="">
              Newer &rarr;
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ posts }) => {
  return {
    posts: posts.items,
    isLoading: posts.isLoading
  }
}

export default connect(
  mapStateToProps,
  { getPosts }
)(BlogEntries)
