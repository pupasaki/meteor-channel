import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

import { Label, Button } from 'semantic-ui-react'
export default class TagList extends Component {

  goToTag(tag) {
    browserHistory.push('/channel/' + tag)
  }

  subscribe(tag) {
    Meteor.call('addSubscription', {userId: this.props.user._id, tag}, (err, res) => {

    })
  }

  unsubscribe(tag) {
    Meteor.call('removeSubscription', {userId: this.props.user._id, tag}, (err, res) => {

    })
  }

  render() {
    var post = this.props.post
    var user = this.props.user

    return (
      <div className="tagList">
        {
          this.props.tags.map( tag => (
          <div key={tag}>
            <Label onClick={()=>this.goToTag(tag)} key={tag}>{tag}</Label>
            { (user && user.profile && user.profile.subs[tag]) ?  <Button onClick={()=>this.unsubscribe(tag)}>unsubscribe</Button> : <Button icon='add circle' onClick={()=>this.subscribe(tag)}></Button> }
          </div>
          ))
        }
      </div>
    )
  }

}

TagList.propTypes = {
  tags: PropTypes.array.isRequired,
  user: PropTypes.object,
};
