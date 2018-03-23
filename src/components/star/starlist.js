import React, { Component } from 'react'
import {
  List,
  Button,
  message,
  Modal,
  Tag
} from 'antd'
import axios from 'axios'
const confirm = Modal.confirm
class StarList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: '',
      totalElements: 0,
      currentPage: 1
    }
    this.getCollectList = this.getCollectList.bind(this)
    this.deleteCollect = this.deleteCollect.bind(this)
  }
  componentDidMount() {
    let params = {
      offset: 0,
      limit: 10,
      order: 'DESC',
    }
    this.getCollectList(params)
  }
  getCollectList(params) {
    axios.get('/api/collect', {
      params: params
    })
    .then(res => {
      if (res.status === 200 && res.data.code === 0) {
        this.setState({
          data: res.data.data.rows,
          totalElements: res.data.data.count
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
  deleteCollect(id) {
    let params = {
      offset: 0,
      limit: 10,
      order: 'DESC',
    }
    axios.delete(`/api/collect/${id}`)
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          message.success(res.data.msg)
          this.getCollectList(params)
        } else {
          message.error(res.data.msg)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  handleDelete(id) {
    const that = this
    confirm({
      title: '删除提示',
      content: '此操作不可逆，你是否确认删除？',
      onOk() {
        that.deleteCollect(id)
      },
      onCancel() {}
    })
  }
  render() {
    const pagination = {
      pageSize: 10,
      current: this.state.currentPage,
      total: this.state.totalElements,
      size: 'small',
      onChange: ((page, pageSize) => {
        this.setState({
          currentPage: page
        })
        let params = {
          offset: pageSize * (page - 1),
          limit: 10,
          order: 'DESC'
        }
        this.getCollectList(params)
      })
    }
    return (
      <List 
        itemLayout="vertical"
        pagination={pagination}
        dataSource={this.state.data}
        renderItem={item => (
          <List.Item
            style={{paddingBottom: 0}}
            key={item.id}
            actions={[]}
            extra={[
              <Button
                style={{marginRight: 20}}
                ghost 
                type="primary" 
                key={item.title}
                onClick={() => this.props.history.push(`/app/collect/edit/${item.id}`)}
              >
                编辑
              </Button>,
              <Button 
                ghost 
                type="danger" 
                key={item.id}
                onClick={() => this.handleDelete(item.id)}
              >
                删除
              </Button>
            ]}
          >
            <List.Item.Meta 
              description={[<a key={item.link} href={item.link}>{item.title}</a>, 
                <Tag
                  key={item.id}
                  color="red"
                  style={{marginLeft: 10}}
                >
                  {item.author}
                </Tag>
              ]}
            />
          </List.Item>
        )}
      />
    )
  }
}

export default StarList