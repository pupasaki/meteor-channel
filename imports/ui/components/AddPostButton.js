import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { browserHistory } from 'react-router';
import { Posts } from '../../api/posts/posts.js'
import Feed from '../components/Feed.js'
import { Header, Button, Icon, Modal, Image, Form, TextArea, Input } from 'semantic-ui-react'

export default class AddPostButton extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, title: '', post: '', channels: '' }
    this.close = this.close.bind(this)
    this.show = this.show.bind(this)
    this.post = this.post.bind(this)
    this.handleChangePost = this.handleChangePost.bind(this)
    this.handleChangeChannels = this.handleChangeChannels.bind(this)
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
  }

  handleChangePost(event) {
    this.setState({post: event.target.value});
  }

  handleChangeTitle(event) {
    this.setState({title: event.target.value});
  }

  handleChangeChannels(event) {
    console.log(event.key)
    const re = /^\#[a-zA-Z0-9]* ?( \#[a-zA-Z0-9]* ?)*$/g
    if (re.test(event.target.value)) {
      this.setState({channels: event.target.value});
    }
  }

  show() {
    // show new post dialog only if user is logged in
    if (this.props.user) {
      this.setState({ open: true })
    } else {
      this.props.onAddPostClick()
    }
  }

  close() {
    this.setState({ open: false })
  }

  post() {
    console.log(this.state.channels + " " +  this.state.post)
    Posts.insert({
      title: this.state.title,
      content: this.state.post,
      tags: this.state.channels.trim().split(" "),
      userId: this.props.user._id,
      username: this.props.user.username,
      createdAt: new Date()
    })
    this.close()
  }

  render() {
    return (
      <span className="AddPostButton">
        <Button icon='add square' onClick={this.show} />
        <Modal dimmer='blurring' open={this.state.open} onClose={this.close}>
          <Modal.Header>Add a New Post</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>New Post</Header>
              <Form>
                <Form.Field>
                  <Input value={this.state.title}
                        onChange={this.handleChangeTitle}
                        placeholder='Title' />
                </Form.Field>
                <TextArea value={this.state.post} onChange={this.handleChangePost} rows='4' />
                <Form.Field>
                  <label>Channels</label>
                  <Input value={this.state.channels}
                        onChange={this.handleChangeChannels}
                        placeholder='Enter #channels' />
                </Form.Field>
              </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
            <Button color='black' onClick={this.close}>
              Nope
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content="Post" onClick={this.post} />
          </Modal.Actions>
        </Modal>
      </span>
    );
  }
}


AddPostButton.propTypes = {
  user: PropTypes.object,
  onAddPostClick: PropTypes.func.isRequired,
};

