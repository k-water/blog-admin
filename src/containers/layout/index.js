import React, { Component } from 'react'
import { Layout } from 'antd'
import {
  Route
} from 'react-router-dom'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import SiderCustom from '../../components/sider/siderCustom'
import HeaderCustom from '../../components/header/headerCustom'
import { routes } from '../../constants/routes'
import { logoutSubmit } from '../../redux/user.redux'
import './index.css'
const { Content, Footer } = Layout
@connect (
  state => state.user,
  { logoutSubmit }
)
class Index extends Component {
  constructor (props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.logout = this.logout.bind(this)
  }
  state = {
    collapsed: false
  }
  logout () {
    Cookies.remove('token')
    Cookies.remove('user_id')
    Cookies.remove('username')
    this.props.logoutSubmit()
    this.props.history.push('/login')
  }
  toggle () {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  render() {
    return (
      <div className="container">
        <Layout >
          <SiderCustom
            collapsed={this.state.collapsed}
          >
          </SiderCustom>
          <Layout>
            <HeaderCustom
              collapsed={this.state.collapsed}
              toggle={this.toggle}
              logout={this.logout}
            >
            </HeaderCustom>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', overflow: 'initial'}}>
            { Cookies.get('token') ?
                routes.map(({ path, key, component, ...props }) => (
                  <Route key={key}
                    exact
                    path={path}
                    component={component}
                    {...props}
                  />
                ))
              : null }
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Copyright © Water 2018
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default Index