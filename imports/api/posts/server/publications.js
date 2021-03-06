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
const addToES = Meteor.wrapAsync(client.create, client)
const esSearch = Meteor.wrapAsync(client.search, client)

Meteor.publish('post.withId', function postWithId(params) {
  const { _id } = params
  return Posts.find({_id: _id})
})

Meteor.publish('posts.withIds', function postWithIds(params) {
  const { postIds } = params
  console.log('publish with ids')
  console.log(postIds)
  return Posts.find({_id: { $in: postIds }})
})

Meteor.publish('posts.withUsername', (params) => {
  const { username, skip, limit } = params
    console.log('skip', skip)
  return Posts.find({username}, {skip, limit})
})

Meteor.publish('posts.withUsernameCount', (params) => {
  const { username } = params
})

Meteor.publish('posts.withTag', (params) => {
  const { tag } = params;

  const esSearch = Meteor.wrapAsync(client.search, client)
  const res = esSearch({
    index: 'channel',
    q: 'tags:"' + tag + '"',
  })

  postIds = res.hits.hits.map((hits) => { return hits._id })
  Feed.insert({postsIds: postIds})
  return Posts.find({_id: { $in: postIds }})
})

Meteor.publish('posts', function posts() {
  return Posts.find({});
})
