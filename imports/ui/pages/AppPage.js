import React, { Component, PropTypes } from 'react'
import Feed from '../components/Feed.js'
import AppHeader from '../components/AppHeader.js'


// App component - represents the whole app
export default class AppPage extends Component {

  render() {

    return (
      <div className="container">
        <AppHeader user={this.props.user} />
        <Feed posts={this.props.posts} user={this.props.user} />
      </div>
    );
  }
}

AppPage.propTypes = {
  posts: PropTypes.array.isRequired,
  user: PropTypes.object,
};
