import React, { Component } from 'react'
import {
  List,
  Button,
  message,
  Modal
} from 'antd'
import axios from 'axios'
const confirm = Modal.confirm
class CatalogList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: ''
    }
    this.getCatalogList = this.getCatalogList.bind(this)
    this.deleteCatalog = this.deleteCatalog.bind(this)
  }
  componentDidMount() {
    this.getCatalogList()
  }
  getCatalogList() {
    axios.get('/api/catalog')
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            data: res.data.data.rows
          })
        } else {
          message.success(res.data.msg)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  deleteCatalog(id) {
    axios.delete(`/api/catalog/${id}`)
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          message.success(res.data.msg)
          this.getCatalogList()
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
        that.deleteCatalog(id)
      },
      onCancel() {}
    })
  }
  render() {
    return (
      <List
        itemLayout="vertical"
        header={<div style={{fontSize: 18, color: '#000'}}>分类列表</div>}
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
                key={item.name}
                onClick={() => this.props.history.push(`/app/catalog/edit/${item.id}`)}
              >
                编辑
              </Button>,
              <Button 
                ghost 
                type="danger" 
                key={item.user}
                onClick={() => this.handleDelete(item.id)}
              >
                删除
              </Button>
            ]}
          >
            {item.name}
          </List.Item>
        )}
      />
    )
  }
}

export default CatalogList