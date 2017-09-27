import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import TagList from './TagList'
import VoteControlContainer from './VoteControlContainer'
import { Label, Button } from 'semantic-ui-react'

export default class FeedItem extends Component {
  goToPost(id) {
    browserHistory.push('/post/' + id)
  }

  deleteFunc(postId) {
    Meteor.call('deletePost', {postId}, (err) => {

    })
  }

  render() {
    let post = this.props.post
    return (
      <div className="feedItem">
        <VoteControlContainer post={post} user={this.props.user} size='small' />
        <div>
          <li key={post._id}>
            <span onClick={()=>this.goToPost(post._id)}>
              {post.title}
            </span>
            <TagList tags={post.tags} />
            <Label>{post.createdAt.toString()}</Label>
            <Label>{post._id}</Label>
            <Label>@{post.username}</Label>
            { post.userId == this.props.user._id ? <Button onClick={()=>this.deleteFunc(post._id)}>Delete</Button> : null}
          </li>
        </div>
      </div>
      );
  }
}

FeedItem.propTypes = {
  post: PropTypes.object.isRequired,
  user: PropTypes.object,
  deleteFunc: PropTypes.func,
};
