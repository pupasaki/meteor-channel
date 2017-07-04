import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Comments } from '../comments.js';

Meteor.publish('comments.forPost', function commentsForPost(params) {

  const { postId } = params;
  console.log('postId: ' + postId)
  let comments = Comments.find({postId: postId});
  return comments
});

//Meteor.publish('posts', function posts() {
//  return Posts.find({});
//});
