import React, { Component, PropTypes } from 'react';
import { Header, Label, Modal, Form, Dropdown, Button, TextArea } from 'semantic-ui-react'
import { Posts } from '/imports/api/posts/posts.js'

reportReasons = [{text: 'Spam', value: 'spam'},
                {text: 'Inappropriate/Illegal Content', value: 'illegal'},
                {text: "Other", value: 'other'},]

export default class PostMenuButton extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, reason: '', details: '' }
    this.handleDetailsChange = this.handleDetailsChange.bind(this)
    this.handleReasonChange = this.handleReasonChange.bind(this)
    this.close = this.close.bind(this)
    this.show = this.show.bind(this)
    this.report = this.report.bind(this)
  }

  show() {
    if (this.props.user) {
      this.setState({ open: true })
    } else {
      console.log('please login to report items')
    }
  }

  handleDetailsChange(event) {
    this.setState({details: event.target.value});
  }

  handleReasonChange(event, data) {
    this.setState({reason: data.value});
  }

  close() {
    this.setState({ open: false })
  }

  report() {
    //TODO: error checking
    Meteor.call('addReport', {postId: this.props.post._id, reason: this.state.reason, details: this.state.details})
    this.close()
  }


  render() {
    return (
      <div className='postMenuButton'>
        <Dropdown icon='chevron down' >
          <Dropdown.Menu>
            { (this.props.user && this.props.post.userId == this.props.user._id) ?  <Dropdown.Item onClick={this.props.deleteFunc} icon='close' text='Delete' /> : null}
            <Dropdown.Item onClick={this.show} icon='attention' text='Report' />
          </Dropdown.Menu>
        </Dropdown>
        <Modal dimmer='blurring' open={this.state.open} onClose={this.close}>
          <Modal.Header>Report Post</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form>
                <Form.Field>
                  <Label>Report Reason</Label>
 <Dropdown placeholder='Select Report Reason' fluid selection options={reportReasons} onChange={this.handleReasonChange} />
                </Form.Field>
                <Form.Field>
                  <Label>Additional Information (optional)</Label>
                <TextArea value={this.state.post} onChange={this.handleDetailsChange} rows='4' />
                </Form.Field>
              </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
            <Button color='black' onClick={this.close}>
              Cancel
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content="Report" onClick={this.report} />
          </Modal.Actions>
        </Modal>
      </div>

    )
  }
}

PostMenuButton.propTypes = {
  user: PropTypes.object,
  post: PropTypes.object.isRequired,
  deleteFunc: PropTypes.func,
};
