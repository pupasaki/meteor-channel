import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import AppPage from './AppPage.js'
import { Posts } from '../../api/posts/posts.js'


export default AppContainer = createContainer(() => {
  const postsHandle = Meteor.subscribe('posts');
  return {
    posts: Posts.find().fetch(),
    user: Meteor.user(),
  };
}, AppPage);
