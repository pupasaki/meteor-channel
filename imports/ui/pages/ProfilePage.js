import React, { Component, PropTypes } from 'react'
import FeedComponent from '../components/FeedComponent.js'
import { ReactiveVar } from 'meteor/reactive-var'

import { Posts } from '/imports/api/posts/posts.js'
import AppHeader from '../components/AppHeader.js'
import _ from 'underscore'


const pageSize = 25
export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
  }

  loadMore() {
    console.log('get data')
    const username = this.props.data.username
    console.log('username', username)
    console.log('skip')
    const skip = this.state.posts.length
    Meteor.subscribe('posts.withUsername',
      { username, skip, limit: pageSize },
      { onReady: () => {
        const posts = Posts.find({username}, {skip, limit: pageSize}).fetch()
        console.log('load More')
        console.log('posts', posts)
        this.receivePosts(posts)
      }},
    )
  }

  componentDidMount() {
    console.log('component did')
    console.log(this.feed)
  }

  render() {
    return (
      <div className="container">
        <AppHeader user={this.props.user} />
        <FeedComponent
          data={{username: this.props.username}}
          user={this.props.user}
          loadMore={this.loadMore}
          pageSize={pageSize}
        />
      </div>
        )
  }
}

ProfilePage.propTypes = {
  username: PropTypes.string,
  user: PropTypes.object,
}
