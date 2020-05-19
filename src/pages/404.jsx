import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class NotFound extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.history.push("/")
    },3000)
  }
  render() {
    return (
      <div>
        <img style={{width: "100%"}} src={require("@/assets/images/NotFound.gif")} alt="img is broken"/>
      </div>
    )
  }
}

export default withRouter(NotFound)