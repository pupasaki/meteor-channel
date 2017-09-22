import { Posts } from '/imports/api/posts/posts.js'
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
//import { Users } from '/imports/api/users/users.js'
import { Fake } from 'meteor/anti:fake'

const elasticsearch = require('elasticsearch')
const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
})

const deleteES = Meteor.wrapAsync(client.indices.delete, client)

const numSeedUsers = 10
let seedUsers = []

//console.log(Users.find().count)
//
if (Meteor.users.find().count() < numSeedUsers) {
  for (var i = Meteor.users.find().count(); i < numSeedUsers; i++) {
    let seedUser = Fake.user({
      fields: ['name', 'username', 'emails.address', 'profile.name'],
    })
    Accounts.createUser({ username: seedUser.username,
      email: seedUser.emails[0].address,
      password: 'password',
    })
  }
}

function getRandomUser() {
  let array = Meteor.users.find().fetch();
  let randomIndex = Math.floor( Math.random() * array.length );
  let element = array[randomIndex];
  return element
}




numPosts = 300
if (Posts.find().count() < numPosts)  {
  deleteES({
    index: 'posts',
  })
  let randomUser = getRandomUser()

  let numTagsSet = 15
  let numPostTags = 5
  let tags = []
  for (var i = 0; i < numTagsSet; i++) {
    tags.push(Fake.word())
  }

  console.log('full tags')
  console.log(tags)


  function getRandomTags() {
    return tags.sort(() => .5 - Math.random()).slice(0,numPostTags)
  }

  for (let i = Posts.find().count(); i < numPosts; i++) {
    Meteor.call('addPost', {
      title: Fake.sentence(10),
      content: Fake.sentence(100),
      tags: getRandomTags(),
      userId: randomUser._id,
      username: randomUser.username,
      createdAt: new Date()
    })
  }
}
