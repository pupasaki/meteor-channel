import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { browserHistory } from 'react-router';
import { Posts } from '../../api/posts/posts.js'
import Feed from '../components/Feed.js'
import { Header, Button, Icon, Modal, Image, Form, TextArea, Input } from 'semantic-ui-react'
import AccountsUIWrapper from '../AccountsUIWrapper.js'
import AddPostButton from '../components/AddPostButton.js'
import AddPostButtonContainer from '../containers/AddPostButtonContainer.js'
import LoginProfileButtonContainer from '../containers/LoginProfileButtonContainer.js'


export default class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { loginOpen: false }
    this.loginShow = this.loginShow.bind(this)
    this.loginClose = this.loginClose.bind(this)
    this.logOut = this.logOut.bind(this)
    this.mySubmitFunc = this.mySubmitFunc.bind(this)
  }

  loginShow() {
    this.setState({ loginOpen: true })
  }

  loginClose() {
    this.setState({ loginOpen: false })
  }

  logOut() {
    AccountsTemplates.logout();
  }

  mySubmitFunc(error, state) {
    if (!error) {
      if (state === "signIn") {
        this.setState({ loginOpen: false })
      }
      if (state === "signUp") {
        this.setState({ loginOpen: false })
      }
    }
  }

  render() {
    AccountsTemplates._initialized = false;
    AccountsTemplates.configure({
        onSubmitHook: this.mySubmitFunc
    })


    return (
      <div className="header">
        <Header as='h1' onClick={()=>{ browserHistory.push('/')} }>Channel</Header>
        <LoginProfileButtonContainer user={this.props.user} />
        <AddPostButtonContainer user={this.props.user} />
      </div>
    );
  }
}

AppHeader.propTypes = {
  user: PropTypes.object,
};
