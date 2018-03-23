import React, { Component } from 'react'
import img from '../../assets/img/404.png'
import './notfound.css'
class NotFound extends Component {
  render() {
    return (
      <div className="center" style={{height: '100%', background: '#ececec', overflow: 'hidden'}}>
         <img src={img} alt="404" />
      </div>
    )
  }
}

export default NotFound