import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {
  Input,
  Row,
  Col,
  Button,
  Icon,
  Select,
  message
} from 'antd'
const { Option } = Select
@connect(
  state => state.blog
)
class Edit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      summary: '',
      content: '',
      tags: '',
      catalogData: '',
      catalog_id: 0,
      id: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getBlogDesc = this.getBlogDesc.bind(this)
    this.updateBlog = this.updateBlog.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.getCatalog = this.getCatalog.bind(this)
  }
  componentDidMount() {
    const blogId = this.props.match.params.id
    this.getBlogDesc(blogId)
    this.getCatalog()
  }
  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSelect(value) {
    this.setState({
      catalog_id: value
    })
  }
  handleSubmit() {
    this.updateBlog(this.state)
    this.setState({
      title: '',
      summary: '',
      content: '',
      tags: '',
      catalog: ''
    })
  }
  getCatalog() {
    axios.get('/api/catalog')
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            catalogData: res.data.data.rows
          })
        }
      })
  }
  getBlogDesc(id) {
    axios.get(`/api/blog/${id}`)
    .then(res => {
      if (res.status === 200 && res.data.code === 0) {
        this.setState({
          title: res.data.data.title,
          summary: res.data.data.summary,
          content: res.data.data.content,
          tags: res.data.data.tags,
          currentCatalog: res.data.data.catalog,
          id: res.data.data.id
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
  updateBlog({
    id,
    title,
    summary,
    content,
    tags,
    catalog_id
  }) {
    axios.put(`/api/users/1/blog/${id}`, {
      title,
      summary,
      content,
      tags,
      catalog_id
    })
    .then(res => {
      if (res.status === 200 && res.data.code === 0) {
        message.success(res.data.msg, 1)
      } else {
        message.error(res.data.msg, 1)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
  render() {
    const { TextArea } = Input
    return (
      <div className="publish">
        <Icon 
          type="caret-left" 
          style={{ fontSize: 16, color: '#08c', cursor: 'pointer' }}
          onClick={() => this.props.history.goBack()}
        />
        <header className="publish-header">
          <h1>编辑博客</h1>
        </header>
        <Row type="flex" justify="center">
          <Col xs={20} sm={16} md={16} lg={16} xl={16}>
            <div className="publish-input">
              <Input
                addonBefore="标题"
                size="large" 
                placeholder="文章标题"
                name="title"
                value={this.state.title}
                onChange = {this.handleChange}
              />
            </div>
            <div className="publish-input">
              <TextArea 
                rows={6} 
                autosize={{ minRows: 5}}
                placeholder="文章摘要" 
                name="summary"
                value={this.state.summary}
                onChange = {this.handleChange}
              />
            </div>
            <div className="publish-input">
              <TextArea 
                rows={6} 
                autosize={{ minRows: 15}}
                placeholder="文章内容 markdown格式" 
                name="content"
                value={this.state.content}
                onChange = {this.handleChange}
              />
            </div>
            <div className="publish-input">
              <Input
                addonBefore="标签"
                size="large" 
                placeholder="文章标签"
                name="tags"
                value={this.state.tags}
                onChange = {this.handleChange}
              />
            </div>
            <div className="publish-input">
              <span>分类：</span>
              {this.state.catalogData ?
               <Select
                  defaultValue={this.state.currentCatalog.name}
                  onChange={this.handleSelect}
                >
                  {
                    this.state.catalogData.map(v => (
                      <Option value={v.id} key={v.id}>
                        {v.name}
                      </Option>
                    ))
                  }
                </Select> 
              : null}
            </div>
            <div className="publish-input">
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
      </div>
    )
  }
}

export default Edit