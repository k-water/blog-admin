import React, { Component } from 'react'
import {
  Row,
  Col,
  Button,
  Input,
  message
} from 'antd'
import axios from 'axios'
class StarList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      date: '',
      link: '',
      id: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.getCollectDesc = this.getCollectDesc.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    const collectId = this.props.match.params.id
    this.getCollectDesc(collectId)
  }
  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  getCollectDesc(id) {
    axios.get(`/api/collect/${id}`)
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            title: res.data.data.title,
            author: res.data.data.author,
            date: res.data.data.date,
            link: res.data.data.link,
            id: res.data.data.id
          })
        } else {
          message.error(res.data.msg)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  handleSubmit() {
    axios.put(`/api/collect/${this.state.id}`, this.state)
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          message.success(res.data.msg)
          this.setState({
            title: '',
            author: '',
            date: '',
            link: '',
            id: ''
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
              更新
            </Button>
          </div>
        </Col>
      </Row>
    )
  }
}

export default StarList