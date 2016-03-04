import React from 'react'
import Radium from 'radium'
import Modal from "react-modal"
import BaseModal from "../public/BaseFormModal"

@Radium
export default class AskQuestionModal extends React.Component {
    static propTypes = {
        askQuestion: React.PropTypes.func.isRequired,
        modalIsOpen: React.PropTypes.bool.isRequired,
        closeModal: React.PropTypes.func.isRequired
    }

    state = {
        title: ""
    }

    handleTitleChange = (e) => {
        this.setState({title: e.target.value})
    }

    handleSubmit = () => {
        const { askQuestion, closeModal } = this.props

        this.setState({title: ''})
        closeModal()
        askQuestion(this.state.title)
    }

    render() {
        const { modalIsOpen, closeModal } = this.props

        return (
            <BaseModal
                title="提问"
                closeModal={closeModal}
                modalIsOpen={modalIsOpen}
                handleSubmit={this.handleSubmit}>
                <form>
                    <div className="form-group">
                        <label>问题</label>
                        <input type="text" className="form-control" value={this.state.title}
                               onChange={this.handleTitleChange}/>
                    </div>
                </form>
            </BaseModal>
        )
    }
}

const styles = {}