import React, { Component, PropTypes } from 'react';
import { Button, Icon, TextArea, Input } from 'semantic-ui-react'
import AddComment from './AddComment.js'

export default class CommentBody extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="commentBody">
        { this.props.comment.body }
        <Button onClick={this.props.replyClick}>reply</Button>
        { this.props.replyBox ? <AddComment comment={this.props.comment}
                                            post={this.props.post} /> : null }
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
  replyBox: PropTypes.bool.isRequired,
  replyClick: PropTypes.func.isRequired,
  children: PropTypes.array,
};
