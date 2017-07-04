import { combineReducers } from 'redux'
import { NEW_POST_CLICKED } from '../actions'

export const clicks = (state = {}, action) => {
  switch (action.type) {
    case 'NEW_POST_CLICKED':
      console.log('wooof')
      return {
        new_post_clicked: action.clicked,
      }

    default:
      return state
  }
}

export const reducers = {
  clicks
}

export default reducers
