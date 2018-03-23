import React, { Component } from 'react'
import { connect } from 'react-redux'
import { publish } from '../../redux/blog.redux'
import axios from 'axios'
import {
  Row,
  Col,
  Input,
  Button,
  Select
} from 'antd'
import './publish.css'
const { Option } = Select
@connect(
  state => state.blog,
  { publish }
)
class Publish extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      summary: '',
      content: '',
      tags: '',
      catalog_id: 0,
      catalogData: '',
      user_id: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleContent = this.handleContent.bind(this)
    this.getCatalogList = this.getCatalogList.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }
  componentDidMount() {
    this.getCatalogList()
  }
  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit() {
    this.props.publish(this.state)
    this.setState({
      title: '',
      summary: '',
      content: '',
      tags: ''
    })
  }
  handleContent(obj) {
    this.setState({
      content: obj
    })
  }
  getCatalogList() {
    axios.get('/api/catalog')
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            catalogData: res.data.data.rows,
            catalog_id: res.data.data.rows[0].id
            
          })
        } else {

        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  handleSelect(value) {
    this.setState({
      catalog_id: value
    })
  }
  render() {
    const { TextArea } = Input
    return (
      <div className="publish">
        <header className="publish-header">
          <h1>发表博客</h1>
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
                  defaultValue={this.state.catalogData[0].name}
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
                发布
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Publish