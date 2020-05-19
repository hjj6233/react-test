import React, { Component } from 'react'
import { Table, Button, Modal, Form, Input, Popconfirm, message, Row } from 'antd'
import { getRolePages, addRole, updateRole, deleteRole } from '@/api/pool'
import '../css/table.less'

export default class Setting extends Component {
  constructor() {
    super()
    this.state = {
      columns: [
        {
          title: '序号',
          width: 80,
          key: 'Index',
          render: (text,record,index) => `${index+1}`
        },
        {
          title: '名称',
          dataIndex: 'name',
          key: 'Name',
        },
        {
          title: '权限',
          dataIndex: 'desc',
          key: 'Desc',
        },
        {
          title: '菜单',
          key: 'Detail',
          render: (text, record) => (
            <span>
              <Button className="btn-space" type="primary" onClick={this.openTable.bind(this, record)}>查看</Button>
            </span>
          )
        },
        {
          title: '操作',
          key: 'Detail',
          render: (text, record) => (
            <span>
              <Button className="btn-space" type="primary" onClick={this.editTable.bind(this, record)}>编辑</Button>
              <Popconfirm
                title="是否删除?"
                placement="top"
                onConfirm={this.deleteItems.bind(this,record)}
                onCancel={this.cancel}
                okText="确认"
                cancelText="取消"
              >
                <Button type="danger">删除</Button>
              </Popconfirm>
            </span>
          ),
        }
      ],
      columns1: [
        {
          title: '序号',
          width: 80,
          key: 'Index',
          render: (text,record,index) => `${index+1}`
        },
        {
          title: '名称',
          dataIndex: 'name',
          key: 'Name'
        },
        {
          title: '路径',
          dataIndex: 'path',
          key: 'Path'
        },
        {
          title: '组件',
          dataIndex: 'component',
          key: 'Component'
        }
      ],
      data: [],
      data1: [],
      total: 0,
      page: 1,
      visible: false,
      modalTitle: '',
      formRef: React.createRef(),
      renderName: 'form'
    }
  }
  openTable = (record) => {
    this.setState({
      renderName: 'table',
      visible: true,
      modalTitle: '菜单',
      data1: record.menus
    })
  }
  editTable = (record) => {
    this.setState({
      renderName: 'form',
      visible: true,
      modalTitle: '编辑'
    },() => {
      this.state.formRef.current.setFieldsValue({
        _id: record._id,
        name: record.name,
        desc: record.desc
      })
    })
  }
  addTable = () => {
    this.setState({
      renderName: 'form',
      visible: true,
      modalTitle: '新增'
    },() => {
      this.state.formRef.current.setFieldsValue({
        _id: '',
        name: '',
        desc: ''
      })
    })
  }
  pageChange = (page) => {
    getRolePages({page, pageSize:10}).then(res => {
      this.setState({
        data: res.data,
        page,
        total: res.total,
      })
    })
  }
  handleOk = () => {
    if(this.state.modalTitle === '新增') {
      this.state.formRef.current.validateFields()
      .then(values => {
        delete values._id
        addRole(values).then(res => {
          message.info('添加成功！')
          getRolePages({pageSize: 10}).then(res => {
            this.setState({
              visible: false,
              data: res.data,
              total: res.total
            })
          })
        })
      })
      .catch(errorInfo => {
        message.info(errorInfo.errorFields.errors)
      })
    } else if(this.state.modalTitle === '编辑') {
      this.state.formRef.current.validateFields()
      .then(values => {
        updateRole(values).then(res => {
          if (res.flag) {
            getRolePages({pageSize: 10}).then(res => {
              this.setState({
                visible: false,
                data: res.data,
                total: res.total
              })
            })
          }
          message.info(res.msg)
        })
      })
      .catch(errorInfo => {
        message.info(errorInfo.errorFields.errors)
      })
    } else if(this.state.modalTitle === '菜单') {
      this.setState({
        visible: false
      })
    }
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }
  onFinish = () => {
  }
  onFinishFailed = () => {
  }
  deleteItems = (record) => {
    deleteRole({_ids: record._id}).then(res => {
      if (res.flag) {
        getRolePages({pageSize: 10}).then(res => {
          this.setState({
            visible: false,
            data: res.data,
            total: res.total
          })
        })
      }
      message.info(res.msg)
    })
  }
  cancel = () => {
  }
  componentDidMount() {
    getRolePages({pageSize: 10}).then(res => {
      this.setState({
        data: res.data,
        total: res.total
      })
    })
  }
  render() {
    const pageProps = {
      current: this.state.page,
      pageSize: 10,
      total: this.state.total,
      onChange: this.pageChange
    }
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }
    return (
      <div id="settingContainer">
        <Row className="row-space">
          <Button type="primary" className="btn-space" onClick={this.addTable}>
            新增
          </Button>
        </Row>
        <Table rowKey="_id" columns={this.state.columns} dataSource={this.state.data} bordered pagination={pageProps} />
        <Modal
          title={this.state.modalTitle}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          forceRender
        >
          {
            this.state.renderName === 'form' ?
            (<Form
              {...layout}
              name="basic"
              ref={this.state.formRef}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item
                label="id"
                name="_id"
              >
                <Input disabled/>
              </Form.Item>
              <Form.Item
                label="名称"
                name="name"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="权限"
                name="desc"
              >
                <Input />
              </Form.Item>
            </Form>) : 
            <Table rowKey="name" columns={this.state.columns1} dataSource={this.state.data1} bordered pagination={false} />
          }
        </Modal>
      </div>
    )
  }
}