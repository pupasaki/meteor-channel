import React, { Component, PropTypes } from 'react';
import AddComment from '../components/AddComment.js'
import CommentList from '../components/CommentList.js'
import VoteControlContainer from '../components/VoteControlContainer.js'

export default class PostPage extends Component {
  render() {
    let output
    if (this.props.postReady && this.props.commentsReady) {
      let post = this.props.post[0]
      output = (
        <div className="postPage">
          <VoteControlContainer post={post} user={this.props.user} size='large' />
          <h1>{post.title}</h1>
          <h2>@{post.username}</h2>
          <p>{post.content}</p>
          <AddComment post={post}/>
          <CommentList comments={this.props.comments}
                       post={post}/>
        </div>
        )
    } else {
      output = <h1>Loading...</h1>
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
  user: PropTypes.object,
};
