import React from 'react'
import ReactDOM from 'react-dom'
import '@/css/common.less'
import Routes from './router'
import * as serviceWorker from './serviceWorker'
import { ConfigProvider } from 'antd'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import moment from 'moment'
import 'moment/locale/zh-cn'
import zhCN from 'antd/es/locale/zh_CN'

moment.locale('zh-cn')



ReactDOM.render(
    // <Spin style={{height:'100%'}} spinning={true}>
      <ConfigProvider locale={zhCN}>
        <Provider store={store}>
          <Routes />
        </Provider>
      </ConfigProvider>,
    // </Spin>,
  document.getElementById('root')
)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
