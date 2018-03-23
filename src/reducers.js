import { combineReducers } from 'redux'
import { user } from './redux/user.redux'
import { blog } from './redux/blog.redux'
export default combineReducers({
  user,
  blog
})