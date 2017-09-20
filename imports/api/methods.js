import { Comments } from '/imports/api/comments/comments.js'
import { Posts } from '/imports/api/posts/posts.js'
import { Feed } from '/imports/api/feed/feed.js'
import { Votes } from '/imports/api/votes/votes.js'

const elasticsearch = require('elasticsearch')
const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
})

const addToES = Meteor.wrapAsync(client.create, client)
const updateES = Meteor.wrapAsync(client.update, client)
const esSearch = Meteor.wrapAsync(client.search, client)


function updateESforPost(postId) {
  let post = Posts.find(postId).fetch()[0]
  console.log('update ES FOR POST')
  console.log(post)
  updateES({
    index: 'channel',
    type: 'post',
    id: postId,
    body: {
      doc: {
        score: post.score
      },
    },
  })
}

Meteor.methods({

  'addComment'({ postId, body, replyId, userId, username }) {

    params = { postId: postId,
               body: body,
               reply: replyId,
               userId: userId,
               username: username,
               createdAt: new Date() }

    if (!Meteor.isServer) {
      Comments.insert(params, (err) => {
        console.log(err)
      })
    } else {

      const commentId = Comments.insert(params)

      const res = addToES({
        index: 'channel',
        type: 'comment',
        id: commentId,
        body: params,
      })
      return res
    }
  },

  'addVote'({ postId, userId }) {
    Votes.insert({
      userId,
      postId,
      createdAt: new Date(),
    })
    Posts.update(postId, { $inc: { score: 1 }})
    if (Meteor.isServer) {
      updateESforPost(postId)
    }
  },

  'removeVote'({ voteId, postId }) {
    Votes.remove(voteId)
    Posts.update(postId, { $inc: { score: -1 }})
    if (Meteor.isServer) {
      updateESforPost(postId)
    }
  },

  'addPost'({ title, content, tags, userId, username }) {

    var params = { title: title,
                    content: content,
                    tags: tags,
                    userId: userId,
                    username: username,
                    createdAt: new Date(), }

    if (!Meteor.isServer) {
      Posts.insert(params, (err) => {
        console.log(err)
      })
    } else {
      const postId = Posts.insert(params)
      const res = addToES({
        index: 'channel',
        type: 'post',
        id: postId,
        body: params,
      })
      return res
    }

  },
})

