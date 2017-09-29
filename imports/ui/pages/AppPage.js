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
        <AppHeader user={this.props.user} />
        <Button.Group>
          <Button  active={this.props.pageType == 'subs' ? false : true }onClick={()=>browserHistory.push('/')}>All</Button>
          <Button active={this.props.pageType == 'subs' ? true : false } onClick={()=>browserHistory.push('/following')}>Following</Button>
        </Button.Group>

        <FeedContainer
          user={this.props.user} tag={this.props.tag} pageType={this.props.pageType} />
      </div>
    );
  }
}

AppPage.propTypes = {
  user: PropTypes.object,
  tag: PropTypes.object,
  pageType: PropTypes.string,
};
