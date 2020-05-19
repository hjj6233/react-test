import React, { Component } from 'react'
import '@/css/loginItem.less'
import { Form, Input, Button } from 'antd'
import { getLogin } from '@/api/pool'

class RegisterItem extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        getLogin({}).then(res => {
        })
      }
    })
  }
  onFinish = values => {
  }
  onFinishFailed = values => {
  }
  render() {
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    const tailLayout = {
      wrapperCol: { offset: 6, span: 18 },
    };
    return (
      <div id="loginContainer">
        <h3 className="text-center">系统注册</h3>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username2"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password2"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" onClick={this.handleSubmit}>
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default RegisterItem