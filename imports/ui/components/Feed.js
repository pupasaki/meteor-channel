import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import FeedItem from './FeedItem.js'

export default class Feed extends Component {
  goToPost(id) {
    browserHistory.push('/post/' + id)
  }

  render() {
    return (
      <div className="feed">
        {
        this.props.posts.map( post => (
        <FeedItem key={post._id} post={post} user={this.props.user} />
        ))
        }
      </div>
      );
  }
}

Feed.propTypes = {
  posts: PropTypes.array.isRequired,
  user: PropTypes.object,
};
