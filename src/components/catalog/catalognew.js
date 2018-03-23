import React, { Component } from 'react'
import {
  Row,
  Col,
  Input,
  Button,
  message
} from 'antd'
import axios from 'axios'
import './catalog.css'
class CatalogNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'admin',
      catalog: {
        name: ''
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange (event) {
    this.setState({
      catalog: {
        name: event.target.value
      }
    })
  }
  handleSubmit() {
    axios.post('/api/catalog', this.state.catalog)
      .then(res => {
        if (res.status === 201 && res.data.code === 0) {
          message.success(res.data.msg)
          this.setState({
            catalog: {
              name: ''
            }
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
          <header className="new-catalog-header">
            <h1>创建分类</h1>
          </header>
          <div className="new-catalog-input">
            <Input
              addonBefore="分类名称" 
              size="large"
              placeholder=""
              name="name"
              value={this.state.catalog.name}
              onChange = {this.handleChange}
            />
          </div>
          <div className="new-catalog-input">
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

export default CatalogNew