import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { currentCirle, Circle } from './canvas'
import './login.css'
import {
  Col,
  Form, 
  Icon, 
  Input, 
  Button
} from 'antd'
import { login } from '../../redux/user.redux'
const FormItem = Form.Item
@connect (
  state => state.user,
  { login }
)
class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.getCanvas = this.getCanvas.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount () {
    this.getCanvas()
  }
  getCanvas() {
    window.requestAnimationFrame = window.requestAnimationFrame 
                                   || window.mozRequestAnimationFrame 
                                   || window.webkitRequestAnimationFrame 
                                   || window.msRequestAnimationFrame

    let canvas = document.getElementById('canvas')
    let ctx = canvas.getContext('2d')
    let w = canvas.width = canvas.offsetWidth
    let h = canvas.height = canvas.offsetHeight
    let circles = []
    let current_circle = new currentCirle(0, 0)

    let draw = function () {
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < circles.length; i++) {
        circles[i].move(w, h)
        circles[i].drawCircle(ctx)
        for (let j = i + 1; j < circles.length; j++) {
          circles[i].drawLine(ctx, circles[j])
        }
      }
      if (current_circle.x) {
        current_circle.drawCircle(ctx);
        for (var k = 1; k < circles.length; k++) {
          current_circle.drawLine(ctx, circles[k])
        }
      }
      requestAnimationFrame(draw)
    }

    let init = function (num) {
      for (var i = 0; i < num; i++) {
        circles.push(new Circle(Math.random() * w, Math.random() * h))
      }
      draw()
    }
    window.addEventListener('load', init(60));
    window.onmousemove = function (e) {
      e = e || window.event;
      current_circle.x = e.clientX
      current_circle.y = e.clientY
    }
    window.onmouseout = function () {
      current_circle.x = null
      current_circle.y = null
    }
  }
  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values)
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login">
        {this.props.redirectTo && this.props.redirectTo !=='/login' ? <Redirect to={this.props.redirectTo} /> : null}
        <canvas id="canvas"></canvas>
        <Col span="6" className="login-form">
          <h3 className="login-title">Login</h3>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              <Button 
                type="primary" 
                htmlType="submit" 
                className="login-form-button"
              >
                Log in
              </Button>
            </FormItem>
          </Form>
        </Col>
      </div>
    )
  }
}

const Login = Form.create()(LoginForm)

export default Login