import React, { Component, PropTypes } from 'react';

import AccountsUIWrapper from '../AccountsUIWrapper.js';
import { Button, Icon } from 'semantic-ui-react'

export default class LoginPage extends Component {
  render() {
    return (
      <div className="container">
        <AccountsUIWrapper />
      </div>
    );
  }
}

LoginPage.propTypes = {
};
