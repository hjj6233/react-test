import React, { Component } from 'react'
import '../css/home.css'
// import store from '@/redux/store'
import { connect } from 'react-redux'
import { IN, DE, DEAsync } from '@/redux/actions'

const mapStateToProps = (state) => {
  return {
    cartList: state.cart
  }
}
@connect(mapStateToProps, { IN, DE, DEAsync })

class Home extends Component {
  constructor() {
    super()
    this.state = {
      cartList: []
    }
  }
  // getState = () => {
  //   this.setState({
  //     cartList: store.getState().cart
  //   }, () => { console.log(this.state.cartList) })
  // }
  // componentDidMount() {
  //   this.getState()
  //   store.subscribe(this.getState)
  // }
  render() {
    return (
      <div id="homeContainer">
        <table border="1" width="500">
          <thead>
            <tr>
              <td>id</td>
              <td>名称</td>
              <td>价格</td>
              <td>数量</td>
            </tr>
          </thead>
          <tbody>
            {
              this.props.cartList.map(item => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>
                      <button onClick={this.props.DEAsync.bind(this,item.id)}>-</button>
                      <button onClick={this.props.DE.bind(this,item.id)}>-</button>
                      {item.count}
                      <button onClick={this.props.IN.bind(this,item.id)}>+</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     cartList: state.cart
//   }
// }
// const mapDispatchToprops = dispatch => {
//   return {
//     add: (id) => dispatch(DE(id)),
//     reduce:  (id) => dispatch(IN(id))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToprops)(Home)
// export default connect(mapStateToProps, { IN, DE, DEAsync })(Home)
export default Home