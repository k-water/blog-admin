import React, { Component } from 'react'
import { 
  Layout,
  Icon,
  Dropdown,
  Menu,
  Avatar
} from 'antd'
import Cookies from 'js-cookie'
import './header.css'
const { Header } = Layout
class HeaderCustom extends Component {
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <span 
            className="user-logout"
            onClick={this.props.logout}
          >
            退出登录
          </span>
        </Menu.Item>
      </Menu>
    );
    return (
      <Header style={{background: '#fff', padding: 0}}>
        <Icon
          className="trigger"
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.props.toggle}
        >
        </Icon>
        <div className="user-info">
          {
            Cookies.get('token') ?
            <Dropdown
              placement="bottomCenter"
              overlay={menu}
            >
              <Avatar
                className="user-avatar"
                shape="square"
                size="large" 
                icon="user"
                style={{backgroundColor: '#87d068'}}
              />
            </Dropdown>
            : null
          }
        </div>
      </Header>
    )
  }
}

export default HeaderCustom