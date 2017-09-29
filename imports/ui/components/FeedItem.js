import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import TagList from './TagList'
import VoteControlContainer from './VoteControlContainer'
import { Label, Button } from 'semantic-ui-react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ReportButton from './ReportButton'

export default class FeedItem extends Component {
  constructor(props) {
    super(props);
    this.state = { deleted: false }
  }

  goToPost(id) {
    browserHistory.push('/post/' + id)
  }


  deleteFunc(postId) {
    Meteor.call('deletePost', {postId}, (err, res) => {
      if (res) {
        this.setState({deleted: true})
      }
    })
  }

  render() {
    let post = this.props.post
    return (
      <div className="feedItem">
        <ReactCSSTransitionGroup
          transitionName="feed"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
      { this.state.deleted ? null :
        <div>
          <VoteControlContainer post={post} user={this.props.user} size='small' />
          <div>
            <li key={post._id}>
              <span onClick={()=>this.goToPost(post._id)}>
                {post.title}
              </span>
              <TagList tags={post.tags} user={this.props.user} />
              <Label>{post.createdAt.toString()}</Label>
              <Label>{post._id}</Label>
              <Label>@{post.username}</Label>
              { (this.props.user && post.userId == this.props.user._id) ? <Button onClick={()=>this.deleteFunc(post._id)}>Delete</Button> : null}
              <ReportButton user={this.props.user} post={this.props.post} />
            </li>
          </div>
        </div>
        }
        </ReactCSSTransitionGroup>
      </div>
      )
  }
}

FeedItem.propTypes = {
  post: PropTypes.object.isRequired,
  user: PropTypes.object,
  deleteFunc: PropTypes.func,
};
