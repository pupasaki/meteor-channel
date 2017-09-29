import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import FeedItem from './FeedItem.js'

import InfiniteScroll from 'react-infinite-scroller'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class FeedComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], ready: false, hasMore: true, empty: false }
    this.loadMore = this.props.loadMore.bind(this)
    this.deleteFeedItem = this.deleteFeedItem.bind(this)
    this.receivePosts = this.receivePosts.bind(this)
    this.postsArrayIndex = {}
  }

  receivePosts(posts) {
    this.setState({
      posts: _.uniq(_.union(this.state.posts, posts), false, (item, key, _id) => { return item._id }),
      ready: true,
      hasMore: posts.length >= this.props.pageSize })
  }

  deleteFeedItem(id) {
    console.log(id)
  }


  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.data, this.props.data)) {
      console.log('resetting')
      console.log(nextProps.data)
      console.log(this.props.data)
      this.setState({ posts: [], ready: false, hasMore: true, empty: false})
    }
  }

  render() {
    return (
      <div>
      { this.state.empty ?  this.state.empty :
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMore}
          initialLoad={true}
          hasMore={this.state.hasMore}
          loader={<div className="loader">Loading ...</div>}
        >
          <div className="feed">
            {
            this.state.posts.map( post => (
            <FeedItem key={post._id} post={post} user={this.props.user} deleteFunc={this.deleteFeedItem} />
            ))
            }
          </div>
        </InfiniteScroll>
        }
      </div>

      )
  }
}

FeedComponent.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
  loadMore: PropTypes.func,
  pageSize: PropTypes.number,
};
