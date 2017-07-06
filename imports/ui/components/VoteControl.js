import React, { Component, PropTypes } from 'react';
import { Icon } from 'semantic-ui-react'
import { Posts } from '../../api/posts/posts.js'
import { Votes } from '../../api/votes/votes.js'

export default class VoteControl extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.vote = this.vote.bind(this)
  }

  vote() {
    if (!Meteor.user()) {
      // please login before voting
      console.log("pls login")
      return
    }

    console.log('vote()')
    console.log(this.props.votes)

    if (!this.props.votes || this.props.votes.length < 1) {
      console.log("voted post id: " + this.props.post._id)

      // TODO: try to ensure only one is created
      Votes.insert({
        userId: this.props.user._id,
        postId: this.props.post._id,
        createdAt: new Date(),
      })

      Posts.update(this.props.post._id,
                  { $inc: { score: 1 }})
    }
  }

  render() {
    return (
      <div className="voteControl">
        <Icon link name='chevron up' onClick={this.vote} />
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
