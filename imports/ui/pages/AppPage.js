import React, { Component, PropTypes } from 'react'
import FeedContainer from '../containers/FeedContainer.js'
import AppHeader from '../components/AppHeader.js'
import { Button } from 'semantic-ui-react'
import { browserHistory } from 'react-router';


// App component - represents the whole app
export default class AppPage extends Component {

  render() {
    console.log('app page')
    console.log(this.props.location)
    return (
      <div className="container">
        <AppHeader user={this.props.user} pageType={this.props.pageType} />
        <div className="body">
        <FeedContainer
          user={this.props.user} tag={this.props.tag} pageType={this.props.pageType} />
        </div>
      </div>
    );
  }
}

AppPage.propTypes = {
  user: PropTypes.object,
  tag: PropTypes.object,
  pageType: PropTypes.string,
};
