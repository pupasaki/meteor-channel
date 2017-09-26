import React, { Component, PropTypes } from 'react'
import { Icon } from 'semantic-ui-react'
import { Posts } from '../../api/posts/posts.js'
import { Votes } from '../../api/votes/votes.js'
var PubSub = require('pubsub-js')

export default class VoteControl extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.vote = this.vote.bind(this)
    this.unvote = this.unvote.bind(this)
  }

  vote() {
    if (!this.props.user) {
      PubSub.publish('login', 'vote');
      return
    }

    if (!this.props.votes || this.props.votes.length < 1) {

      // TODO: update this to an atomic counter
      Meteor.call('addVote', {
        postId: this.props.post[0]._id,
        userId: this.props.user._id,
      })
      this.props.voteChanged.set(true)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.post.length == 0) {
      return false
    }
    return true
  }

  unvote() {
      // TODO: update this to an atomic counter
      Meteor.call('removeVote', {
        voteId: this.props.votes[0]._id,
        postId: this.props.post[0]._id,
      })
      this.props.voteChanged.set(true)
  }

  render() {
    const voted = this.props.votes && this.props.votes.length > 0
    const size = this.props.size
    let voteCount
    if (size == 'large') {
      voteCount = <h3>{this.props.post[0].score}</h3>
    } else {
      voteCount = <h5>{this.props.post[0].score}</h5>
    }

    return (
      <div className="voteControl">
        <Icon link name='chevron up' size={size == 'large' ? 'large' : 'small'}
          color={voted ? 'orange' : 'black'} onClick={voted ? this.unvote : this.vote} />
        { voteCount }
      </div>
    )
  }
}

VoteControl.propTypes = {
  user: PropTypes.object,
  post: PropTypes.array,
  votes: PropTypes.array,
  size: PropTypes.string.isRequired,
  voteChanged: PropTypes.object,
};
