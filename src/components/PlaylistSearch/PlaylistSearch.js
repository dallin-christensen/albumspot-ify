import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchPlaylists } from '../../actions'

class PlaylistSearch extends Component {
  constructor (props) {
    super(props)

    this.state = {
      searchKey: ''
    }
  }
  updateSearchKey = (e) => {
    e.preventDefault()
    const value = e.target.value

    this.setState({
      searchKey: value
    }, () => {
       this.search(this.state.searchKey)
    })
  }
  search = (value) => {
    this.props.dispatch(searchPlaylists(value))
  }
  render () {
    return (
      <div>
        <input type='text' value={this.state.searchKey}  onChange={this.updateSearchKey}/>
      </div>
    )
  }
}

export default connect()(PlaylistSearch)
