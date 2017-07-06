import React, { Component, PropTypes } from 'react';
import { Icon } from 'semantic-ui-react'
import { Posts } from '../../api/posts/posts.js'
import { Votes } from '../../api/votes/votes.js'

export default class VoteControl extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.vote = this.vote.bind(this)
    this.unvote = this.unvote.bind(this)
  }

  vote() {
    if (!Meteor.user()) {
      // please login before voting
      console.log("please login")
      return
    }

    if (!this.props.votes || this.props.votes.length < 1) {

      // TODO: update this to an atomic counter
      Votes.insert({
        userId: this.props.user._id,
        postId: this.props.post._id,
        createdAt: new Date(),
      }, () => { Posts.update(this.props.post._id, { $inc: { score: 1 }}) })


    } else if (this.props.votes.length > 0) {
      // clicking should remove vote

    }
  }

  unvote() {
      // TODO: update this to an atomic counter
      Votes.remove({ _id: this.props.votes[0]._id },
                   () => { Posts.update(this.props.post._id, { $inc: { score: -1 }}) })

  }

  render() {
    const voted = (this.props.votes.length > 0)

    return (
      <div className="voteControl">
        <Icon link name='chevron up' color={voted ? 'orange' : 'black'} onClick={voted ? this.unvote : this.vote} />
        { this.props.post.score }
      </div>
    )
  }
}

VoteControl.propTypes = {
  user: PropTypes.object,
  post: PropTypes.object.isRequired,
  votes: PropTypes.array,
};
