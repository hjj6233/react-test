import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Dropdown, Row, Col, Avatar,Skeleton } from 'antd'
import { Switch, Redirect, Route, Link } from 'react-router-dom'
// import { adminRouter } from '@/router//router.js'
import '@/css/admin.css'
import { connect } from 'react-redux'
import { getUser } from '@/redux/actions'
// import { UserOutlined } from '@ant-design/icons'

const { Header, Content, Sider } = Layout
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

@connect(mapStateToProps, { getUser })
class Admin extends Component {
  constructor() {
    super()
    this.state = {
      menuKey: '1'
    }
  }
  logout = () => {
    this.props.getUser()
  }
  changeMenu = ({key,keyPath}) => {
    sessionStorage.setItem('menuKey',JSON.stringify(key))
  }
  componentDidMount() {
    let menuKey = JSON.parse(sessionStorage.getItem('menuKey'))
    this.setState({
      menuKey: menuKey ? menuKey : '1'
    })
  }
  render() {
    console.log(this.props.user)
    const menu = (
      <Menu>
        <Menu.Item>
          <a onClick={e => e.preventDefault()}>
            用户：{this.props.user.displayName}
          </a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={this.logout}>
            退出登录
          </a>
        </Menu.Item>
      </Menu>
    )
    return (
      <div id="mainContainer">
        <Layout style={{heigh: '100%'}}>
          <Header className="header">
          <Row>
            <Col span={1}><div className="logo" /></Col>
            <Col span={3}>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
              </Menu>
            </Col>
            <Col span={2}  offset={18}  style={{textAlign: 'right'}}>
              <Dropdown overlay={menu} placement="bottomRight">
                {/* <a className="ant-dropdown-link" onClick={e => e.preventDefault()}></a> */}
                  <Avatar size="large" src={require("@/assets/images/"+this.props.user.avatar)} />
                </Dropdown>
            </Col>
          </Row>
          </Header>
          <Layout style={{heigh: '100%'}}>
            <Sider width={200} style={{ background: '#fff' }}>
              {
                this.props.user.isLogin  ?
                (<Menu
                  mode="inline"
                  defaultSelectedKeys={[this.state.menuKey]}
                  style={{ height: '100%', borderRight: 0 }}
                  onClick={this.changeMenu}
                >
                  {this.props.user.menus.map((item, index) => (
                    <Menu.Item key={index + 1}>
                      <Link to={item.path}>{item.name}</Link>
                    </Menu.Item>
                  ))}
                </Menu>) :
                <Skeleton active />
              }
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
              <Content
                style={{
                  background: '#fff',
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}
              >
              {
                this.props.user.isLogin ?
                (<Switch>
                  {this.props.user.menus.map((item, index) => (
                  <Route
                      key={index}
                      path={item.path}
                      exact={item.exact}
                      render={(props) => {
                        return item.componentItem ? <item.componentItem {...props}/> : null
                      }}
                    />
                  ))}
                  <Redirect to="/admin/tables" from="/admin" exact/>
                  <Redirect to="/404"/>
                </Switch>) :
                <Skeleton active />
              }
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default Admin