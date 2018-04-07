import React, { Component } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { setAccessToken } from '../../actions/user'
import Login from '../Login/Login'
import Dashboard from '../Dashboard/Dashboard'
import Loading from '../Loading/Loading'
import { handleInitialData } from '../../actions/shared'
import './style.css'


class App extends Component {
  componentDidMount() {
    const parsed = queryString.parse(window.location.search)
    if(parsed.access_token){
      this.props.dispatch(setAccessToken(parsed.access_token))
      this.props.dispatch(handleInitialData())
    }
  }
  render() {
    const { loading, accessToken, userID } = this.props
    return (
      <div className="App">
        {
          loading
            ? <Loading />
            : accessToken && userID
                ?<Dashboard />
                :<Login />
        }
      </div>
    );
  }
}

function mapStateToProps ({ user }) {
  const { accessToken, loading, userID } = user
  return {
    accessToken,
    loading,
    userID,
  }
}

export default connect(mapStateToProps)(App);
