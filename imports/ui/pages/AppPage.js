import React, { Component, PropTypes } from 'react'
import FeedContainer from '../containers/FeedContainer.js'
import AppHeader from '../components/AppHeader.js'


// App component - represents the whole app
export default class AppPage extends Component {

  render() {
    console.log('app page')
    let postIds = []
    if (this.props.feed == undefined || this.props.feed.length != 0 ) {
      console.log(this.props.feed[0].postIds)
      postIds = this.props.feed[0].postIds
    }

    return (
      <div className="container">
        <AppHeader user={this.props.user} />
        <FeedContainer feed={postIds} user={this.props.user} />
      </div>
    );
  }
}

AppPage.propTypes = {
  feed: PropTypes.array,
  user: PropTypes.object,
};
