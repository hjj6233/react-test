import React, { Component } from 'react'
import { Table, Button, Modal, Popconfirm, message, Input } from 'antd'
import { getGameInfo, deleteGameRecord, getGameRecordPages } from '@/api/pool'
import '../css/table.less'

// const { TextArea } = Input
// const ws = new WebSocket('ws://10.8.193.126:8001')

export default class Tables extends Component {
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
          title: '奖池',
          dataIndex: 'pool',
          key: 'Pool',
          render: text => <span>{text}</span>,
        },
        {
          title: '灌水资金',
          dataIndex: 'borrow',
          key: 'Borrow',
        },
        {
          title: '本金',
          dataIndex: 'principal',
          key: 'Principal',
        },
        {
          title: '奖金',
          dataIndex: 'bonus',
          key: 'Bonus',
        },
        {
          title: '抽税',
          dataIndex: 'tax',
          key: 'Tax',
        },
        {
          title: '抽税率',
          dataIndex: 'taxRatio',
          key: 'TaxRatio',
        },
        {
          title: '时间',
          dataIndex: 'time',
          key: 'Time',
        },
        {
          title: '总押注',
          dataIndex: 'totalDeposit',
          key: 'TotalDeposit',
        },
        {
          title: '中奖水果',
          dataIndex: 'target',
          key: 'Target',
        },
        {
          title: '出奖明细',
          key: 'Detail',
          render: (text, record) => (
            <span>
              <Button type="primary" onClick={this.showModal.bind(this, record)}>详情</Button>
            </span>
          ),
        },
      ],
      columns1: [
        {
          title: '序号',
          width: 80,
          key: 'index',
          render: (text,record,index) => `${index+1}`
        },
        {
          title: '水果名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '押注',
          dataIndex: 'score',
          key: 'score',
        },
        {
          title: '赔率',
          dataIndex: 'odds',
          key: 'odds',
        },
        {
          title: '期望',
          dataIndex: 'expectation',
          key: 'expectation',
        }
      ],
      data: [],
      data1: [],
      pool: 0,
      tax: 0,
      taxRatio: 0,
      principal: 0,
      borrow: 0,
      id: '',
      visible: false,
      isPop: false,
      selectedRowKeys: [],
      currentTarget: '',
      page: 1,
      total: 0,
      msg: '正在连接...',
      sendVal: '',
      chatList: []
    }
  }
  showModal(data) {
    this.setState({
      visible: true,
      data1: data.bonusDetail,
      currentTarget: data.target,
    })
  }
  handleOk() {
    this.setState({
      visible: false,
    })
  }
  handleCancel() {
    this.setState({
      visible: false,
    })
  }
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys })
  }
  deleteItems() {
    this.setState({isPop: false})
    let ids = this.state.selectedRowKeys.join(',')
    deleteGameRecord({ids}).then(res => {
      if (res.flag) {
        message.info(res.msg)
        getGameRecordPages({page:1, pageSize:5}).then(res => {
          this.setState({
            data: res.data,
            page: 1,
            total: res.total,
            selectedRowKeys: []
          })
        })
      } else {
        message.error(res.msg)
      }
    })
  }
  cancel = () => {
    this.setState({ isPop: false })
  }
  rowColor = (record, index) => {
    if(record.name === this.state.currentTarget) {
      return 'bgc-target'
    }
  }
  handleVisibleChange = isPop => {
    if (!isPop) {
      this.setState({ isPop });
      return;
    }
    if (this.state.selectedRowKeys.length > 0) {
      this.setState({ isPop })
    } else {
      message.warn('请选择删除行！')
    }
  }
  pageChange = (page) => {
    getGameRecordPages({page, pageSize:5}).then(res => {
      this.setState({
        data: res.data,
        page,
        total: res.total,
      })
    })
  }
  componentDidMount() {
    getGameInfo({}).then(res => {
      let data = res[0]
      // Object.keys(data).forEach(key => {
      //   baseData.push({name: key, value: data[key]})
      // })
      this.setState({
        pool: data.pool,
        tax: data.tax,
        taxRatio: data.taxRatio,
        principal: data.principal,
        borrow: data.borrow,
        id: data._id
      })
    })
    getGameRecordPages({page:1,pageSize:5}).then(res => {
      this.setState({
        data: res.data,
        total: res.total
      })
    })
    // ws.onopen = (e) => {
    //   console.log("连接服务器成功")
    //   ws.send("ready")
    // }
    // ws.onclose = (e) => {
    //   console.log("服务器关闭")
    // }
    // ws.onerror = () => {
    //   console.log("连接出错")
    // }
    // ws.onmessage = (e) => {
    //   this.setState({
    //     msg: e.data
    //   })
    // }
  }
  sendMsg = () => {
    // ws.send("game1点击了")
    let chatList = this.state.chatList
    if(this.state.sendVal) chatList.push(this.state.sendVal)
    this.setState({
      chatList,
      sendVal: ''
    })
  }
  msgChange = (e) => {
    this.setState({
      sendVal: e.target.value
    })
  }
  render() {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange,
    }
    const pageProps = {
      current: this.state.page,
      pageSize: 5,
      total: this.state.total,
      onChange: this.pageChange
    }
    return (
      <div id="tableContainer" style={{padding: '10px'}}>
        <div className='space-bottom'>
          <span className="space-right">奖池：{this.state.pool}</span>
          <span className="space-right">灌水资金：{this.state.borrow}</span>
          <span className="space-right">本金：{this.state.principal}</span>
          <span className="space-right">抽税：{this.state.tax}</span>
          <span>抽税率：{this.state.taxRatio}</span>
        </div>
        <div className="space-bottom">
          <Popconfirm
            title="是否批量删除?"
            placement="rightTop"
            onConfirm={this.deleteItems.bind(this)}
            onCancel={this.cancel}
            onVisibleChange={this.handleVisibleChange}
            visible={this.state.isPop}
            okText="确认"
            cancelText="取消"
          >
            <Button type="primary">批量删除</Button>
          </Popconfirm>
        </div>
        <Table rowKey="_id" rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.data} bordered pagination={pageProps} />
        <Modal
          title="中奖期望"
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
          <Table rowKey="id" rowClassName={this.rowColor} columns={this.state.columns1} dataSource={this.state.data1} bordered pagination={false} />
        </Modal>
        {/* <div className='space-bottom'>
          <ul className="chat-dialog">
            {this.state.chatList.map((item,index) => <li key={index}>{item}</li>)}
          </ul>
          <div>
            <TextArea 
              className="text-width"
              rows={4}
              onChange={this.msgChange}
              value={this.state.sendVal}
              defaultValue="请输入..."
              onPressEnter={this.sendMsg}
              allowClear={true}
            />
          </div>
          <div className="send-btn">
            <Button type="primary" onClick={this.sendMsg}>发送</Button>
          </div>
        </div> */}
      </div>
    )
  }
}
