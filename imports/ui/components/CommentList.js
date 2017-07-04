import React, { Component, PropTypes } from 'react';
import Comment from './Comment.js'

export default class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = { commentWithReply: '' }
    this.replyClick = this.replyClick.bind(this)
    this.structure = {}
    this.commentMap = {}
    this.isCommentRendered = {}
  }

  replyClick(commentId) {
    if (commentId == this.state.commentWithReply)
      this.setState({commentWithReply: ''})
    else
      this.setState({commentWithReply: commentId})
  }

  renderComment(commentId) {
    let comment = this.commentMap[commentId]
    let children = this.structure[commentId]

    var renderedChildren = []

    children.forEach(function (child) {
      renderedChildren.push(this.renderComment(child))
    }.bind(this))

    this.isCommentRendered[commentId] = true

    return <Comment refs={comment._id}
      key={comment._id}
      comment={comment}
      post={this.props.post}
      replyBox={this.state.commentWithReply == comment._id ? true : false}
      replyClick={()=>{this.replyClick(comment._id)}}
      children={renderedChildren} />
  }

  render() {
    var commentObjs = []
    let comments = this.props.comments

    comments.forEach(function (comment) {
      this.structure[comment._id] = []
      if (comment.reply) this.structure[comment.reply].push(comment._id)
      this.commentMap[comment._id] = comment
    }.bind(this))


    comments.forEach(function (comment) {
      if (!this.isCommentRendered[comment._id])
        commentObjs.push(this.renderComment(comment._id))
    }.bind(this))

    this.isCommentRendered = {}

    return (
      <div className="commentList">
          { commentObjs }
      </div>
      )
  }

}

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  post: PropTypes.object.isRequired,
};
