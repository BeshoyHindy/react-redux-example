import React from 'react'
import Radium from 'radium'
import Modal from "react-modal"
import BaseModal from "../public/BaseFormModal"

@Radium
export default class UpdateQuestionModal extends React.Component {
    static propTypes = {
        question: React.PropTypes.object,
        updateQuestion: React.PropTypes.func.isRequired,
        modalIsOpen: React.PropTypes.bool.isRequired,
        closeModal: React.PropTypes.func.isRequired
    }

    state = {
        title: this.props.question ? this.props.question.get('title') : ""
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            title: nextProps.question ? nextProps.question.get('title') : ""
        })
    }

    handleTitleChange = (e) => {
        this.setState({title: e.target.value})
    }

    handleSubmit = () => {
        const { updateQuestion, closeModal } = this.props

        updateQuestion(this.props.question, this.state.title)
        closeModal()
    }

    render() {
        const { modalIsOpen, closeModal } = this.props

        return (
            <BaseModal
                title="修改问题"
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