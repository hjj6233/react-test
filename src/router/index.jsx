import React, { Component }from 'react'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { mainRouter } from './router.js'
import { Admin } from '@/pages'
import { connect } from 'react-redux'
import { getUser } from '@/redux/actions'

const history = createBrowserHistory()
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

@connect(mapStateToProps, { getUser })
class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route 
            path="/admin" 
            render={(props) => {
              return this.props.user.isLogin ? <Admin {...props}/> : <Redirect to="/login"/>
            }}
          />
          {mainRouter.map((item, index) => (
            <Route
              key={index}
              path={item.path}
              exact={item.exact}
              render={(props) => {
                return <item.component {...props}/>
              }}
            />
          ))}
          <Redirect to="/admin" from="/" exact/>
          <Redirect to="/404"/>
        </Switch>
      </Router>
    )
  }
}
export default Routes
