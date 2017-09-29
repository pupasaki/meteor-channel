import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import ProfilePage from '../pages/ProfilePage.js'


export default ProfilePageContainer = createContainer(({ params }) => {

  const { username } = params
  console.log(username)
  return {
    username,
    user: Meteor.user(),
  }
}, ProfilePage);
