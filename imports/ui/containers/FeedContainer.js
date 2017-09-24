import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Posts } from '../../api/posts/posts.js'
import FeedComponent from '../components/FeedComponent.js'


export default FeedContainer = createContainer(({ feed, user, feedLimit }) => {

  const limitedFeed = feed.slice(0, feedLimit.get())
  const postsHandle = Meteor.subscribe('posts.withIds', { postIds: limitedFeed })

  console.log('feed container')
  console.log(feedLimit)

  return {
    feed: limitedFeed,
    posts: Posts.find({_id: { $in: limitedFeed }}).fetch(),
    user: user,
    postsReady: postsHandle.ready(),
    feedLimit,
    feedPageSize: feed.length,
  }
}, FeedComponent)
