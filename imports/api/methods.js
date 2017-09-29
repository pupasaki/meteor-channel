import { Comments } from '/imports/api/comments/comments.js'
import { Posts } from '/imports/api/posts/posts.js'
import { Feed } from '/imports/api/feed/feed.js'
import { Votes } from '/imports/api/votes/votes.js'
import { Reports } from '/imports/api/reports/reports.js'
//import { Users } from '/imports/api/users/users.js'

const elasticsearch = require('elasticsearch')
const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
})

const addToES = Meteor.wrapAsync(client.create, client)
const updateES = Meteor.wrapAsync(client.update, client)
const esSearch = Meteor.wrapAsync(client.search, client)



function updateESforPost(postId, type) {
  let post = Posts.find(postId).fetch()[0]
  console.log('update ES FOR POST')
  console.log(post)

  let doc = {}
  if (type == 'score') {
    doc = {score: post.score}
  } else if (type == 'delete') {
    doc = {deleted: post.deleted}
  }
  updateES({
    index: 'posts',
    type: 'post',
    id: postId,
    body: {
      doc
    },
  })
}

Meteor.methods({
  'addReport'({ postId, reason, details }) {
    Reports.insert({ userId: Meteor.user()._id,
                     postId, reason, details })

  },
  'addComment'({ postId, body, replyId, userId, username }) {

    params = { postId: postId,
               body: body,
               reply: replyId,
               userId: userId,
               username: username,
               score: 1,
               createdAt: new Date() }

    if (!Meteor.isServer) {
      Comments.insert(params, (err) => {
        console.log(err)
      })
    } else {

      const commentId = Comments.insert(params)

      const res = addToES({
        index: 'comments',
        type: 'comment',
        id: commentId,
        body: params,
      })
      return res
    }
  },

  'addSubscription'({tag}) {

    user = Meteor.user()
    subs = {}
    if (user.profile && user.profile.subs) {
      subs = user.profile.subs
    }

    subs[tag] = true
    Meteor.users.update({_id: user._id}, { $set: { profile: { subs }}})
    return true
  },

  'removeSubscription'({tag}) {
    user = Meteor.user()
    unsetArg = {}
    unsetArg["profile.subs." + tag] = ""
    if (user.profile && user.profile.subs) {
      Meteor.users.update({_id: user._id}, { $unset: unsetArg })
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
      updateESforPost(postId, 'score')
    }
  },

  'removeVote'({ voteId, postId }) {
    Votes.remove(voteId)
    Posts.update(postId, { $inc: { score: -1 }})
    if (Meteor.isServer) {
      updateESforPost(postId, 'score')
    }
  },

  'deleteComment'({ commentId }) {
    Comments.update(commentId, { $set: { deleted: true }})
  },

  'addPost'({ title, content, tags, userId, username }) {

    var params = { title: title,
                    content: content,
                    tags: tags,
                    userId: userId,
                    username: username,
                    score: 1,
                    createdAt: new Date(), }

    if (!Meteor.isServer) {
      Posts.insert(params, (err) => {
        console.log(err)
      })
    } else {
      const postId = Posts.insert(params)
      const res = addToES({
        index: 'posts',
        type: 'post',
        id: postId,
        body: params,
      })
      return res
    }

  },

  'deletePost'({ postId }) {
    Posts.update(postId, { $set: { deleted: true }})

    if (Meteor.isServer) {
      updateESforPost(postId, 'delete')
    }
    return true
  },

  'getFeed'({ tag, start, limit }) {

    if (!Meteor.isServer) return

    let query =  {
      function_score: {
        functions: [
          {
            linear: {
              createdAt: {
                origin: new Date(),
                scale: '60d',
              }
            }
          },

          {
            field_value_factor: {
              field: "score",
              factor: 1,
            }
          },
        ],
        boost_mode: "sum",
      },
    }

    if (tag) {
      query['function_score']['query'] = { bool: { filter: { match: { tags: tag } } } }
    }

    const esSearch = Meteor.wrapAsync(client.search, client)
    const res = esSearch({
      index: 'posts',
      from: start,
      size: limit,
      body: { query },
    })

    postIds = res.hits.hits.map((hits) => { return hits._id })
    return postIds
  },

  'getFeed2'({ tagList, subs, start, limit }) {

    if (!Meteor.isServer) return

    console.log('tag list')
    console.log(tagList)

    let query =  {
      function_score: {
        functions: [
          {
            linear: {
              createdAt: {
                origin: new Date(),
                scale: '60d',
              }
            }
          },
          {
            field_value_factor: {
              field: "score",
              factor: 1,
            }
          },
        ],
        boost_mode: "sum",
      },
    }

    if (tagList && tagList[0]) {
      query['function_score']['query'] = { bool: { filter: { terms: { "tags.keyword": tagList } } } }
    }

    const esSearch = Meteor.wrapAsync(client.search, client)
    const res = esSearch({
      index: 'posts',
      from: start,
      size: limit,
      body: { query },
    })

    postIds = res.hits.hits.map((hits) => { return hits._id })

    const posts = Posts.find({_id: { $in: postIds }})

    const orderedPosts = []
    const postsMap = {}
    posts.forEach((post) => {
      postsMap[post._id] = post
    })
    postIds.forEach((postId) => {
      orderedPosts.push(postsMap[postId])
    })

    return orderedPosts
  },
})


