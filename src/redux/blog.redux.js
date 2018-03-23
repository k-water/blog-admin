import axios from 'axios'
import {
  message
} from 'antd'
/**
 * action
 */

const LIST_SUCCESS = 'LIST_SUCCESS'
const DELETE_SUCCESS = 'DELETE_SUCCESS'
const PUBLISH_SUCCESS = 'PUBLISH_SUCCESS'
const ERROR = 'ERROR'
/**
 * state
 */
const initState = {
  msg: '',
  totalElements: 0,
  content: ''
}

/**
 * reducer
 * @param {*} state 
 * @param {*} action 
 */
export function blog(state = initState, action) {
  switch(action.type) {
    case PUBLISH_SUCCESS:
      return {
        ...state,
        msg: action.payload
      }
    case LIST_SUCCESS:
      return {
        ...state,
        msg: action.payload.msg,
        content: action.payload.data.rows,
        totalElements: action.payload.data.count
      }
    case DELETE_SUCCESS:
      return {
        ...state,
        content: state.content.filter(v => v.id !== action.payload)
      }
    case ERROR:
      return {
        ...state,
        msg: action.payload
      }
    default:
      return state
  }
}

/**
 * action type
 */
function publishSuccess(data) {
  return {
    type: PUBLISH_SUCCESS,
    payload: data
  }
}

function listSuccess(data) {
  return {
    type: LIST_SUCCESS,
    payload: data
  }
}

function deteleSuccess(id) {
  return {
    type: DELETE_SUCCESS,
    payload: id
  }
}


function errorMsg(data) {
  return {
    type: ERROR,
    payload: data
  }
}

/**
 * dispatch
 */

 export function publish({
   title,
   summary,
   content,
   tags,
   catalog_id,
   user_id
 }) {
  return dispatch => {
    axios.post('/api/blog', {
      title,
      summary,
      content,
      tags,
      catalog_id,
      user_id
    })
    .then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(publishSuccess(res.data.msg))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function getBlogList(params) {
   return dispatch => {
    axios.get('/api/blog', {
      params: params
    })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(listSuccess(res.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
}

export function deleteBlog(id) {
  return dispatch => {
    axios.delete(`/api/users/1/blog/${id}`)
    .then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(deteleSuccess(id))
        message.success(res.data.msg, 1)
      } else {
        dispatch(errorMsg(res.data.msg))
        message.error(res.data.msg, 1)
      }
    })
  }
}
