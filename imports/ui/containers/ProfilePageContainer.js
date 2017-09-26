import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import ProfilePage from '../pages/ProfilePage.js'
import { Posts } from '../../api/posts/posts.js'

const profilePageSize = 25
let feedLimit = new ReactiveVar(profilePageSize)

export default ProfilePageContainer = createContainer(({ params }) => {

  const { username } = params
//  const postsHandle = Meteor.subscribe('posts.withUsername', { username, limit: feedLimit.get() })

//  console.log('profile container')
//  console.log(postsHandle.ready())
//  console.log(Posts.find({username}).fetch())

  console.log(username)
  return {
//    posts: Posts.find({username}).fetch(),
    username
  }
}, ProfilePage);
