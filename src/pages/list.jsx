import React, {Component}from 'react';
import { connect } from 'react-redux'
import { getList } from '@/redux/actions'

const mapStateToProps = (state) => {
  return {
    list: state.list.list
  }
}
@connect(mapStateToProps, { getList })

class List extends Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount() {
    this.props.getList()
  }
  render() {
    return (
      <div id="listContainer">
        {
          this.props.list.map((item,index) => {
            return (
              <div key={index}>
                {item.text}
              </div>
            )
          })
        }
      </div>
    )
  }
}
export default List