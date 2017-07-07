import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { browserHistory } from 'react-router';
import { Posts } from '../../api/posts/posts.js'
import Feed from '../components/Feed.js'
import { Header, Button, Icon, Modal, Image, Form, TextArea, Input } from 'semantic-ui-react'
import AccountsUIWrapper from '../AccountsUIWrapper.js'
import AddPostButton from '../components/AddPostButton.js'

var PubSub = require('pubsub-js')

export default class LoginProfileButton extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false }
    this.show = this.show.bind(this)
    this.close = this.close.bind(this)
    this.logOut = this.logOut.bind(this)
    this.mySubmitFunc = this.mySubmitFunc.bind(this)

    this.mySubscriber = this.mySubscriber.bind(this)
    var token = PubSub.subscribe('login', this.mySubscriber)

  }

  componentWillReceiveProps(props) {
    this.setState({open: this.state.open || props.externalOpenClick})
  }

  show() {
    this.setState({ open: true })
  }

  close() {
    this.setState({ open: false })
    this.props.handleExternalClicks()
  }

  logOut() {
    AccountsTemplates.logout();
  }

  mySubscriber(msg) {
    console.log(msg)
    this.show()
  }

  mySubmitFunc(error, state) {
    if (!error) {
      if (state === "signIn") {
        this.setState({ open: false })
      }
      if (state === "signUp") {
        this.setState({ open: false })
      }
    }
  }

  render() {

    AccountsTemplates._initialized = false;
    AccountsTemplates.configure({
        onSubmitHook: this.mySubmitFunc
    })

    console.log(this.props.clickFromAdd)

    return (
      <span className="loginProfileButton">
        { this.props.user ? <Button color='red' onClick={this.logOut}>Log out</Button> :
                            <Button color='green' onClick={this.show}>Log In</Button> }

        <Modal dimmer='blurring' open={this.state.open} onClose={this.close}>
          <AccountsUIWrapper />
        </Modal>
      </span>
    );
  }
}

LoginProfileButton.propTypes = {
  user: PropTypes.object,
  externalOpenClick: PropTypes.bool,
  handleExternalClicks: PropTypes.func,
};

