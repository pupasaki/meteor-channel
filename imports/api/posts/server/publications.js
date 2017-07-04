import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Posts } from '../posts.js';

Meteor.publish('post.withId', function postWithId(params) {

  const { _id } = params;
  let posts = Posts.find({_id: _id});
  return posts
});

Meteor.publish('posts', function posts() {
  return Posts.find({});
});
