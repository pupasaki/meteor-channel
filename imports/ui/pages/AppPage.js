import React, { Component, PropTypes } from 'react'
import Feed from '../components/Feed.js'
import AppHeader from '../components/AppHeader.js'


// App component - represents the whole app
export default class AppPage extends Component {

  render() {
    console.log('the feed:')
    console.log(this.props.feed)

    let posts = []
    if (this.props.feed[0])
      posts = this.props.feed[0].posts

    console.log('the posts:')
    console.log(posts)
    return (
      <div className="container">
        <AppHeader user={this.props.user} />
        <Feed posts={posts} user={this.props.user} />
      </div>
    );
  }
}

AppPage.propTypes = {
  feed: PropTypes.array,
  user: PropTypes.object,
};
