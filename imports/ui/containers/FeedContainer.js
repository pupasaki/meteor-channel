import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Posts } from '../../api/posts/posts.js'
import FeedComponent from '../components/FeedComponent.js'


const pageSize = 25

function orderPosts(postIds, posts) {
  let orderedPosts = []
  const postsMap = {}
  posts.forEach((post) => {
    postsMap[post._id] = post
  })

  postIds.forEach((postId) => {
    orderedPosts.push(postsMap[postId])
  })
  return orderedPosts
}


function loadMore() {

  Meteor.call('getFeed', {start: this.state.posts.length, limit: pageSize}, (err, postIds) => {

    console.log(postIds)

    Meteor.subscribe('posts.withIds', { postIds },
      { onReady: () => {
        const posts =  Posts.find({_id: { $in: postIds }}).fetch()
        console.log('posts', posts)
        this.receivePosts(orderPosts(postIds, posts))
      }},
    )
  })
}

export default FeedContainer = createContainer(({ feed, user, feedLimit }) => {

//  const postsHandle = Meteor.subscribe('posts.withIds', { postIds: limitedFeed })

  Meteor.subscribe('posts')

  return {
    user: user,
    loadMore,
    pageSize,
  }
}, FeedComponent)
