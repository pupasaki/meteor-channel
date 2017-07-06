import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Votes } from '/imports/api/votes/votes.js';


import VoteControl from './VoteControl.js';


export default VoteControlContainer = createContainer(({ post, user }) => {
  var votes
  console.log(Meteor.user())
  if (user) {
    console.log("here")
    const votesHandle = Meteor.subscribe('votes', {userId: user._id, postId: post._id})
    votes = Votes.find({postId: post._id, userId: user._id}).fetch()
  }
  return {
    user,
    post,
    votes,
  };
}, VoteControl);

