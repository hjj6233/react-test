import React, { Component } from 'react'
import { Tabs } from 'antd'
import LoginItem from './loginItem'
import RegisterItem from './registerItem'
import '@/css/login.less'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const { TabPane } = Tabs
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

@connect(mapStateToProps)
 class Login extends Component {
  render() {
    return (
      this.props.user.isLogin
      ?
      <Redirect to="/admin"/>
      :
      (
        <div id="tabsboxContainer">
          <div className="login-box">
            <Tabs defaultActiveKey="1">
              <TabPane tab="登录" key="1">
                <LoginItem/>
              </TabPane>
              <TabPane tab="注册" key="2">
                <RegisterItem/>
              </TabPane>
            </Tabs>
          </div>
        </div>
      )
    )
  }
}

export default Login