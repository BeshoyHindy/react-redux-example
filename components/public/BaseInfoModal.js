import React from 'react'
import Radium from 'radium'
import Modal from "react-modal"

@Radium
export default class BaseInfoModal extends React.Component {
    static propTypes = {
        title: React.PropTypes.string.isRequired,
        closeModal: React.PropTypes.func.isRequired,
        modalIsOpen: React.PropTypes.bool.isRequired,
        children: React.PropTypes.element.isRequired,
    }

    render() {
        const { title, closeModal, modalIsOpen } = this.props

        return (
            <Modal className="Modal__Bootstrap modal-dialog"
                   isOpen={modalIsOpen}
                   closeTimeoutMS={150}
                   onRequestClose={closeModal}
                   style={styles}>

                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" onClick={closeModal}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                        </button>
                        <h4 className="modal-title">{title}</h4>
                    </div>
                    <div className="modal-body">
                        {this.props.children}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={closeModal}>关闭</button>
                    </div>
                </div>
            </Modal>
        )
    }
}

const styles = {
    overlay: {
        zIndex: 10000
    },
    content: {
        position: null,
        top: null,
        left: null,
        right: null,
        bottom: null,
        border: null,
        background: null,
        overflow: null,
        WebkitOverflowScrolling: null,
        borderRadius: null,
        padding: null,
    }
}
