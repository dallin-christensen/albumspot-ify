import React, { Component } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { setAccessToken } from '../../actions/user'
import Login from '../Login/Login'
import Dashboard from '../Dashboard/Dashboard'
import { handleInitialData } from '../../actions/shared'


class App extends Component {
  componentDidMount() {
    const parsed = queryString.parse(window.location.search)
    if(parsed.access_token){
      this.props.dispatch(setAccessToken(parsed.access_token))
      this.props.dispatch(handleInitialData())
    }
  }
  render() {
    return (
      <div className="App">
        {!this.props.accessToken
            ?<Login />
            :<Dashboard />
        }
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    accessToken: state.user.accessToken
  }
}

export default connect(mapStateToProps)(App);
