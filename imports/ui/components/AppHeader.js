import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { browserHistory } from 'react-router';
import { Posts } from '../../api/posts/posts.js'
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

    console.log('appheader')
    console.log(this.props.pageType)

    const feedToggle = <Button.Group>
          <Button  active={this.props.pageType == 'subs' ? false : true }onClick={()=>browserHistory.push('/')}>All</Button>
          <Button active={this.props.pageType == 'subs' ? true : false } onClick={()=>browserHistory.push('/following')}>Following</Button>
        </Button.Group>


    return (
      <div className="header" id="header" style={{width: '500px', overflow: "auto"}}>
        <Header as='h1' onClick={()=>{ browserHistory.push('/')} }>Channel</Header>
        <AddPostButtonContainer user={this.props.user} style={{float: 'right'}} />
        <LoginProfileButtonContainer user={this.props.user} style={{float: 'right'}} />

        <div>
      { this.props.pageType == 'post' ? null : feedToggle }
        </div>
      </div>
    );
  }
}

AppHeader.propTypes = {
  user: PropTypes.object,
  pageType: PropTypes.string,
};
