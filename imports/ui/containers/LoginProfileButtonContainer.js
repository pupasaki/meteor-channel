import { connect } from 'react-redux'
import { newPostClicked } from '../actions'
import LoginProfileButton from '../components/LoginProfileButton'

const mapStateToProps = (state) => {
  return {
    externalOpenClick: state.clicks.new_post_clicked
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleExternalClicks: () => {
      dispatch(newPostClicked(false))
    }
  }
}

const LoginProfileButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginProfileButton)

export default LoginProfileButtonContainer
