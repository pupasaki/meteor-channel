import { connect } from 'react-redux'
import { newPostClicked } from '../actions'
import AddPostButton from '../components/AddPostButton'


//const mapStateToProps = (state) => {
//  return {
//    new_post_clicked: state.clicks.new_post_clicked
//  }
//}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPostClick: () => {
      dispatch(newPostClicked(true))
    }
  }
}

const AddPostButtonContainer = connect(null,
  mapDispatchToProps
)(AddPostButton)

export default AddPostButtonContainer
