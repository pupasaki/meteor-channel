import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Posts } from '../../api/posts/posts.js'
import AppPage from '../pages/AppPage.js'

export default SubsContainer = createContainer(() => {
  return {
    tagList: Meteor.user() ? Meteor.user().profile.subs : null,
    pageType: 'subs',
  }
}, AppContainer)
