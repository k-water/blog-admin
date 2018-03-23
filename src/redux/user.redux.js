import axios from 'axios'
import qs from 'qs'
import {
  message
} from 'antd'

/**
 * action
 */
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const LOGOUT = 'LOGOUT'
/**
 * state
 */
const initState = {
  user: '',
  msg: '',
  redirectTo: ''
}

/**
 * reducer
 * @param {*} state 
 * @param {*} action 
 */
export function user(state = initState, action) {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        redirectTo: '/app/index',
        user: action.payload.data,
        msg: action.payload.msg
      }
    case LOGOUT:
      return {
        user: '',
        msg: '',
        redirectTo: ''
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        user: '',
        token: '',
        msg: action.msg
      }
    default:
      return state
  }
}

/**
 * action type
 */
function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  }
}

function loginFailure(msg) {
  return {
    msg,
    type: LOGIN_FAILURE
  }
}

/**
 * dispatch
 */

 export function login({
   username,
   password
 }) {
   return dispatch => {
     axios.post('/api/users/login', qs.stringify({
       username,
       password
     }), {
      withCredentials: true
     })
     .then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(loginSuccess(res.data))
        message.success(res.data.msg)
      } else {
        dispatch(loginFailure(res.data.msg))
        message.error(res.data.msg)
      }
     })
   }
 }

 export function logoutSubmit() {
   return {
     type: LOGOUT
  }
}