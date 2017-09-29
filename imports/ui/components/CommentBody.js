import React, { Component, PropTypes } from 'react';
import { Button, Icon, TextArea, Input } from 'semantic-ui-react'
import AddComment from './AddComment.js'

export default class CommentBody extends Component {
  constructor(props) {
    super(props);
  }

  deleteComment(commentId) {
    Meteor.call('deleteComment', {commentId}, (err, res) => {

    })
  }

  render() {
    comment = this.props.comment
    return (
      <div className="commentBody">
        { comment.deleted ? '[deleted]' : comment.body }
        <Button onClick={this.props.replyClick}>reply</Button>
        { this.props.replyBox ? <AddComment comment={comment}
                                            post={this.props.post}
                                            user={this.props.user} /> : null }
        { comment.userId == this.props.user._id ?
        <Button onClick={()=>this.deleteComment(comment._id)}>Delete</Button>
        : null }
        <div className="child">
          { this.props.children }
        </div>
      </div>
    )
  }
}

CommentBody.propTypes = {
  comment: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  user: PropTypes.object,
  replyBox: PropTypes.bool.isRequired,
  replyClick: PropTypes.func.isRequired,
  children: PropTypes.array,
};
