import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { clearError } from '../../actions/user'
import { IoAndroidClose } from 'react-icons/lib/io'
import './style.css'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    borderRadius          : '5px',
    maxWidth              : '350px',
    border                : 'none',
  }
};

class SpotArtifyModal extends Component {
  closeModal = () => {
    this.props.dispatch(clearError())
  }
  render() {
    const { msg, header } = this.props
    return (
      <Modal
        isOpen={!!msg}
        style={customStyles}
      >
        <div className='modal_titleBar'>
          <div>
            {header}
          </div>
          <div onClick={this.closeModal}>
            <IoAndroidClose />
          </div>
        </div>
        <div className='modal_content'>
          {msg}
        </div>
      </Modal>
    )
  }
}

function mapStateToProps({user}){
  const { msg, header } = user.error
  return {
    msg,
    header,
  }
}

export default connect(mapStateToProps)(SpotArtifyModal)
