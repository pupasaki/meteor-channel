import React, { Component, PropTypes } from 'react';
import { Button, Icon, Form, TextArea, Input } from 'semantic-ui-react'
import { Comments } from '../../api/comments/comments.js'
var PubSub = require('pubsub-js')

export default class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = { comment: '' }
    this.handleChange = this.handleChange.bind(this)
    this.postComment = this.postComment.bind(this)
  }


  handleChange(event) {
    this.setState({comment: event.target.value});
  }

  postComment() {
    if (!this.props.user) {
      PubSub.publish('login', 'add comment');
    } else {
      replyId = this.props.comment ? this.props.comment._id : null
      Comments.insert({
        postId: this.props.post._id,
        body: this.state.comment,
        reply: replyId,
        userId: Meteor.user().id,
        username: Meteor.user().username,
        createdAt: new Date()
      })
      this.state.comment = ''
    }
  }

  render() {
    return (
      <div className="addComment">
        <Form>
            <TextArea value={this.state.comment} onChange={this.handleChange} rows='4' />
          </Form>
        <Button onClick={this.postComment}>Post</Button>
      </div>
    )
  }
}

AddComment.propTypes = {
  post: PropTypes.object.isRequired,
  comment: PropTypes.object,
  user: PropTypes.object,
};
