import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

import { Label } from 'semantic-ui-react'
export default class TagList extends Component {

  render() {
    var post = this.props.post
    return (
      <div className="tagList">
        {
          this.props.tags.map( tag => (
          <Label key={tag}>{tag}</Label>
          ))
        }
      </div>
      );
  }
}

TagList.propTypes = {
  tags: PropTypes.array.isRequired,
};
