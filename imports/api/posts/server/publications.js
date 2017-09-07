import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { Posts } from '../posts.js'
import { Feed } from '/imports/api/feed/feed.js'
const util = require('util')

const elasticsearch = require('elasticsearch')
const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
})

Meteor.publish('post.withId', function postWithId(params) {
  const { _id } = params;
  return Posts.find({_id: _id});
})

Meteor.publish('posts.withTag', (params) => {
  const { tag } = params;

  const esSearch = Meteor.wrapAsync(client.search, client)
  const res = esSearch({
    index: 'channel',
    q: 'tags:"' + tag + '"',
  })

  postIds = res.hits.hits.map((hits) => { return hits._id })
  console.log('POST IDS')
  console.log(postIds)
//  Feed.remove({})
  Feed.insert({postsIds: postIds})
  return Posts.find({_id: { $in: postIds }})
})

Meteor.publish('posts', function posts() {
  return Posts.find({});
})
