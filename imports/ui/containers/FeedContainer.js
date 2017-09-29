import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Posts } from '../../api/posts/posts.js'
import FeedComponent from '../components/FeedComponent.js'


const pageSize = 25

function loadMore() {
  console.log('loading more - feed container')
  console.log(this.state.posts.length)
  console.log(this.props.data.tag)
  if (this.props.data.pageType == 'subs' && _.isEmpty(this.props.data.tag)) {
    msg = <h2>You are not following anything!</h2>
    this.setState({empty: msg, hasMore: false})
    return
  }

  Meteor.call('getFeed2', {tagList: this.props.data.tag ? Object.keys(this.props.data.tag) : null,
    start: this.state.posts.length,
    limit: pageSize}, (err, postIds) => {
    this.receivePosts(postIds)
  })
}

export default FeedContainer = createContainer(({ pageType, tag, user }) => {

  return {
    user: user,
    loadMore,
    pageSize,
    data: {tag, pageType}
  }
}, FeedComponent)
