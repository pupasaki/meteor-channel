import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import AppPage from './AppPage.js'
import { Posts } from '../../api/posts/posts.js'
import { ReactiveVar } from 'meteor/reactive-var'
import { Feed } from '/imports/api/feed/feed.js'


export default AppContainer = createContainer(({ pageType, tagList, params }) => {

  const { tag } = params
  if (_.isString(tag)) {
    tagList = {}
    tagList[tag] = true
  }

  return {
    user: Meteor.user(),
    tag: tagList,
    pageType,
  }
}, AppPage);
