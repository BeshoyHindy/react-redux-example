import React from 'react'
import Radium from 'radium'
import BaseModal from '../public/BaseFormModal'

@Radium
export default class MarkInvitationCodeSendedModal extends React.Component {
    state = {
        sendedTo: "",
        code: null
    }

    static propTypes = {
        code: React.PropTypes.object,
        closeModal: React.PropTypes.func.isRequired,
        markSended: React.PropTypes.func.isRequired,
        modalIsOpen: React.PropTypes.bool.isRequired
    }

    handleSendedToChange = (e) => {
        this.setState({sendedTo: e.target.value})
    }

    handleSubmit = () => {
        const { markSended, closeModal } = this.props

        closeModal()
        markSended(this.state.code, this.state.sendedTo)
        this.setState({code: null, sendedTo: ""})
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.code && nextProps.modalIsOpen) {
            this.setState({
                code: nextProps.code
            })
        }
    }

    render() {
        const { closeModal, modalIsOpen } = this.props
        return (
            <BaseModal
                title="标记为已发送"
                closeModal={closeModal}
                modalIsOpen={modalIsOpen}
                handleSubmit={this.handleSubmit}>
                <form>
                    <div className="form-group">
                        <label>邀请码</label>
                        <p className="form-control-static">{this.state.code ? this.state.code.get('code') : null}</p>
                    </div>
                    <div className="form-group">
                        <label>发送给</label>
                        <input type="text" className="form-control" value={this.state.sendedTo}
                               onChange={this.handleSendedToChange}/>
                        <p className="help-block">注：人名，手机号，邮箱... 按需填写，格式不限</p>
                    </div>
                </form>
            </BaseModal>
        )
    }
}

const styles = {}
