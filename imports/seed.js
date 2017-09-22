import { Posts } from '/imports/api/posts/posts.js'
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
//import { Users } from '/imports/api/users/users.js'
import { Fake } from 'meteor/anti:fake'
import { faker } from 'meteor/practicalmeteor:faker'

const elasticsearch = require('elasticsearch')
const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
})

const deleteES = Meteor.wrapAsync(client.indices.delete, client)

const numSeedUsers = 10
let seedUsers = []

if (Meteor.users.find().count() < numSeedUsers) {
  try {
    for (var i = Meteor.users.find().count(); i < numSeedUsers; i++) {
      Accounts.createUser({ username: faker.internet.userName(),
        email: faker.internet.email(),
        password: 'password',
      })
    }
  } catch (err) {
    console.log(err)
  }

  //test account
  Accounts.createUser({ username: 'coder-cat',
    email: 'coder-cat@meow.org',
    password: 'password',
  })
}


function getRandomUser() {
  let array = Meteor.users.find().fetch();
  let randomIndex = Math.floor( Math.random() * array.length );
  let element = array[randomIndex];
  return element
}

numPosts = 500
if (Posts.find().count() < numPosts)  {
  deleteES({
    index: 'posts',
  })

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
    let randomUser = getRandomUser()
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
