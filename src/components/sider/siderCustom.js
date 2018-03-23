import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Layout } from 'antd'
import './sider.css'
import SiderMenu from './siderMenu'
import { menus } from '../../constants/menus'
const { Sider } = Layout

@withRouter
class SiderCustom extends Component {
  state = {
    collapsed: false,
    mode: 'inline',
    openKey: '',
    selectedKey: ''
  }
  render() {
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
        breakpoint="md"
        collapsedWidth="0"
        className="sider-contaniner"
      >
        <div className="logo"></div>
        <SiderMenu
          menus={menus}
          onClick={this.menuClick}
          theme="dark"
          mode="inline"
        />
      </Sider>
    )
  }
}

export default SiderCustom