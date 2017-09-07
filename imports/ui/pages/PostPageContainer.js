import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Posts } from '/imports/api/posts/posts.js';
import { Comments } from '/imports/api/comments/comments.js';


import PostPage from './PostPage.js';


export default PostPageContainer = createContainer(({ params }) => {
    const { id } = params
    const postHandle = Meteor.subscribe('post.withId', { _id: id })
    const commentsHandle = Meteor.subscribe('comments.forPost', { postId: id })
    const postReady = postHandle.ready()
    const commentsReady = commentsHandle.ready()
    const post = Posts.find({_id: id}).fetch()
    const comments = Comments.find({postId: id}).fetch()
    const user = Meteor.user()
  return {
    postReady,
    commentsReady,
    post,
    comments,
    user,
  };
}, PostPage);
