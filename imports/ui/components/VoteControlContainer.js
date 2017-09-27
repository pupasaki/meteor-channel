import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Posts } from '../../api/posts/posts.js'
import { Votes } from '/imports/api/votes/votes.js';
import { ReactiveVar } from 'meteor/reactive-var'
import VoteControl from './VoteControl.js';

const voteChanged = new ReactiveVar(false)

export default VoteControlContainer = createContainer(({ post, user, size }) => {
  var votes
  if (user) {
    const votesHandle = Meteor.subscribe('votes', {userId: user._id, postId: post._id})
    votes = Votes.find({postId: post._id, userId: user._id}).fetch()
  }

  if (voteChanged) {
    postHandle = Meteor.subscribe('post.withId', { _id: post._id })
    post = Posts.find({_id: post._id}).fetch()
  } else {
    post = [post]
  }
  return {
    user,
    post,
    votes,
    size,
    voteChanged,
  };
}, VoteControl);

