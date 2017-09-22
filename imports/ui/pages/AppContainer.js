import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import AppPage from './AppPage.js'
import { Posts } from '../../api/posts/posts.js'
import { ReactiveVar } from 'meteor/reactive-var'
import { Feed } from '/imports/api/feed/feed.js'


export default AppContainer = createContainer(({ params }) => {

  const { tag } = params
  let postIds = []
  let feedLimit = new ReactiveVar(25)


  Meteor.subscribe('getFeed', { tag })

  var id = 'global'
  if (Meteor.user()) {
    id = Meteor.user()._id
  }

  return {
    feed: Feed.find(id).fetch(),
    user: Meteor.user(),
    feedLimit,
  }
}, AppPage);
