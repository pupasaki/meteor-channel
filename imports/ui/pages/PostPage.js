import React, { Component, PropTypes } from 'react';
import AddComment from '../components/AddComment.js'
import CommentList from '../components/CommentList.js'

export default class PostPage extends Component {
  render() {
    let output
    if (this.props.postReady && this.props.commentsReady) {
      let post = this.props.post[0]
        console.log(post.user)
      output = (
        <div className="postPage">
          <h1>{post.title}</h1>
          <h2>@{post.username}</h2>
          <p>{post.content}</p>
          <AddComment post={post}/>
          <CommentList comments={this.props.comments}
                       post={post}/>
        </div>
        )
    } else {
      output = <h1>loading</h1>
    }

    return (
      <div className="container">
        { output }
      </div>
      );
  }
}

PostPage.propTypes = {
  postReady: PropTypes.bool.isRequired,
  commentsReady: PropTypes.bool.isRequired,
  post: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
};
