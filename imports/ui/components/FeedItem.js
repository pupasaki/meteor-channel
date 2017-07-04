import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import TagList from './TagList'

export default class FeedItem extends Component {
  goToPost(id) {
    browserHistory.push('/post/' + id)
  }

  render() {
    var post = this.props.post
    return (
      <div className="feedItem">
        <li key={post._id} onClick={()=>this.goToPost(post._id)}>{post.title}
          <TagList tags={post.tags} />
        </li>

      </div>
      );
  }
}

FeedItem.propTypes = {
  post: PropTypes.object.isRequired,
};
