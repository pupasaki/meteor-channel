import React, { Component, PropTypes } from 'react';
import { Button, Icon, TextArea, Input } from 'semantic-ui-react'
import AddComment from './AddComment.js'
import CommentBody from './CommentBody.js'

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: false }
    this.collapse = this.collapse.bind(this)
  }

  collapse() {
    this.setState({collapsed: !this.state.collapsed})
  }

  render() {
    return (
      <div className="comment">
      <Icon link name={this.state.collapsed ? 'plus' : 'minus'} onClick={this.collapse} />
      @{ this.props.comment.username }
      {!this.state.collapsed ? <CommentBody comment={this.props.comment}
                              post={this.props.post}
                              replyBox={this.props.replyBox}
                              replyClick={this.props.replyClick}
                              children={this.props.children} /> : null }
      </div>
    )
  }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  replyBox: PropTypes.bool.isRequired,
  replyClick: PropTypes.func.isRequired,
  children: PropTypes.array,
};
