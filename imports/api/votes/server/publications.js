import { Votes } from '../votes.js';

Meteor.publish('votes', function votes(params) {
  const { userId, postId  } = params;
  return Votes.find({userId: userId, postId: postId});
});
