import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import FeedItem from './FeedItem.js'

import InfiniteScroll from 'react-infinite-scroller'

export default class FeedComponent extends Component {
  constructor(props) {
    super(props);
    this.getMore = this.getMore.bind(this)
    this.checkIfFeedHasMore = this.checkIfFeedHasMore.bind(this)
    this.getOrderedPosts = this.getOrderedPosts.bind(this)
    this.hasMore = true
    this.increment = 10
  }


  goToPost(id) {
    browserHistory.push('/post/' + id)
  }

  getMore() {
    console.log('getting more')
    this.props.feedLimit.set(this.newFeedLimit)
  }

  checkIfFeedHasMore() {
    const newFeedLimit = this.props.feedLimit.get() + this.increment
    if (newFeedLimit >= this.props.feedPageSize)
      this.hasMore = false
    else
      this.newFeedLimit = newFeedLimit
  }

  getOrderedPosts() {
    const orderedPosts = []
    const postsMap = {}
    this.props.posts.forEach((post) => {
      postsMap[post._id] = post
    })

    this.props.feed.forEach((feedItem) => {
      orderedPosts.push(postsMap[feedItem])
    })
    return orderedPosts
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { postsReady } = nextProps;
    return postsReady
  }

  render() {
    let orderedPosts = []
    if (this.props.postsReady) {
      this.checkIfFeedHasMore()
      orderedPosts = this.getOrderedPosts()
    }

    console.log('render')
    console.log(this.hasMore)
    return (
      <div>
      <InfiniteScroll
        pageStart={0}
        loadMore={this.getMore}
        initialLoad={false}
        hasMore={this.hasMore}
        loader={<div className="loader">Loading ...</div>}
      >
        <div className="feed">
          {
          orderedPosts.map( post => (
          <FeedItem key={post._id} post={post} user={this.props.user} />
          ))
          }
        </div>
      </InfiniteScroll>
</div>
      );
  }
}

FeedComponent.propTypes = {
  posts: PropTypes.array,
  feed: PropTypes.array,
  user: PropTypes.object,
  postsReady: PropTypes.bool,
  feedLimit: PropTypes.object,
};
