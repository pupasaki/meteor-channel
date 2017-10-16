import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import TagList from './TagList'
import VoteControlContainer from './VoteControlContainer'
import { Icon, Label, Button, Dropdown, Menu } from 'semantic-ui-react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import PostMenuButton from './PostMenuButton'
import javascriptTimeAgo from 'javascript-time-ago'
javascriptTimeAgo.locale(require('javascript-time-ago/locales/en'))
require('javascript-time-ago/intl-messageformat-global')
require('intl-messageformat/dist/locale-data/en')
const timeAgoEnglish = new javascriptTimeAgo('en-US')


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
        <div className='feedItemContainer'>
          <div className='feedItemBody'>
            <VoteControlContainer post={post} user={this.props.user} size='small' />
            <div>
              <div className='feedItemHeader'>
                <div className='feedItemTitle' onClick={()=>this.goToPost(post._id)}>
                  <h3>{post.title}</h3>
                </div>
                <PostMenuButton user={this.props.user} post={this.props.post} deleteFunc={()=>this.deleteFunc(post._id)} />
              </div>
              <TagList tags={post.tags} user={this.props.user} />
              <div className='feedItemInfo'>
              </div>
              <div className='feedItemFooter'>
                <Label>#ThisTopic</Label>
                <div className='feedPostUsername'>@{post.username}</div>
                <Icon size='mini' name='circle' />
                <div className='itemCreatedAt'>{timeAgoEnglish.format(post.createdAt)}</div>
              </div>
            </div>
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
