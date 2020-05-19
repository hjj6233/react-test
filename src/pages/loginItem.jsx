import React, { Component } from 'react'
import '@/css/loginItem.less'
import { Form, Input, Button, message } from 'antd'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser } from '@/redux/actions'

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

@connect(mapStateToProps, { getUser })
class LoginItem extends Component {
  formRef = React.createRef()
  handleSubmit = e => {
    e.preventDefault()
    this.formRef.current.validateFields()
    .then(values => {
      this.props.getUser(values)
    })
    .catch(errorInfo => {
     message.info(errorInfo.errorFields.errors)
    })
  }
  onFinish = values => {
  }
  onFinishFailed = values => {
  }
  render() {
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }
    const tailLayout = {
      wrapperCol: { offset: 4, span: 20 },
    }
    return (
      <div id="loginContainer">
        <h3 className="text-center">系统登录master</h3>
        <Form
          {...layout}
          ref={this.formRef}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            label="用户"
            name="username"
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" onClick={this.handleSubmit}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default withRouter(LoginItem)