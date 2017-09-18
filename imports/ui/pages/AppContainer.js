import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import AppPage from './AppPage.js'
import { Posts } from '../../api/posts/posts.js'
import { ReactiveVar } from 'meteor/reactive-var'
import { Feed } from '/imports/api/feed/feed.js'


export default AppContainer = createContainer(({ params }) => {

  const { tag } = params
  let postsHandle

  Meteor.call('getFeed', { tag: tag }, (err, res) => {
    Feed.upsert({_id: 'posts'}, {posts: res})
    const feedTest = Feed.find({_id: 'posts'}).fetch()
  })

  return {
    feed: Feed.find({_id: 'posts'}).fetch(),
    user: Meteor.user(),
  }
}, AppPage);
