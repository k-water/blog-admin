import React, { Component } from 'react'
import {
  Row,
  Col,
  Input,
  Button,
  message
} from 'antd'
import './star.css'
import axios from 'axios'
class StarNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      date: '',
      link: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {

  }
  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit() {
    axios.post('/api/collect', this.state)
      .then(res => {
        if (res.status === 201   && res.data.code === 0) {
          message.success(res.data.msg)
          this.setState({
            title: '',
            author: '',
            date: '',
            link: ''
          })
        } else {
          message.error(res.data.msg)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    return (
      <Row type="flex" justify="center">
        <Col span={14}>
          <header className="new-collect-header">
            <h1>添加收藏</h1>
          </header>
          <div className="new-collect-input">
            <Input
              addonBefore="标题" 
              size="large"
              placeholder=""
              name="title"
              value={this.state.title}
              onChange = {this.handleChange}
            />
          </div>
          <div className="new-collect-input">
            <Input
              addonBefore="作者" 
              size="large"
              placeholder=""
              name="author"
              value={this.state.author}
              onChange = {this.handleChange}
            />
          </div>
          <div className="new-collect-input">
            <Input
              addonBefore="链接" 
              size="large"
              placeholder=""
              name="link"
              value={this.state.link}
              onChange = {this.handleChange}
            />
          </div>
          <div className="new-collect-input">
            <Input
              addonBefore="时间" 
              size="large"
              placeholder=""
              name="date"
              value={this.state.date}
              onChange = {this.handleChange}
            />
          </div>
          <div className="new-collect-input">
            <Button
              type="primary"
              size="large"
              icon="check-circle-o"
              style={{float: 'right'}}
              onClick={this.handleSubmit}
            >
              发布
            </Button>
          </div>
        </Col>
      </Row>
    )
  }
}

export default StarNew