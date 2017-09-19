import { Comments } from '/imports/api/comments/comments.js'
import { Posts } from '/imports/api/posts/posts.js'
import { Feed } from '/imports/api/feed/feed.js'
const elasticsearch = require('elasticsearch')
const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
})
const addToES = Meteor.wrapAsync(client.create, client)
const esSearch = Meteor.wrapAsync(client.search, client)

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

  'getFeed'({ tag }) {


    if (Meteor.isServer) {

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
            ],
            boost_mode: "sum",
        },
      }

      if (tag) {
        query['function_score']['query'] = { bool: { filter: { match: { tags: tag } } } }
      }

      const esSearch = Meteor.wrapAsync(client.search, client)
      const res = esSearch({
        index: 'channel',
        body: { query },
      })

      postIds = res.hits.hits.map((hits) => { return hits._id })
      return postIds

//      const posts = Posts.find({_id: { $in: postIds }}).fetch()
//      const postsMap = {}
//      posts.forEach((post) => {
//        postsMap[post._id] = post
//      })
//      const orderedPosts = []
//      postIds.forEach((postId) => {
//        orderedPosts.push(postsMap[postId])
//      })
//      return orderedPosts
    }

  },

})


