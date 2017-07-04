import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { users } from '../users.js';

Meteor.publish('user.withId', function userWithId(params) {

  const { _id } = params;
  let users = users.find({_id: _id});
  return users
});

