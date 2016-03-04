import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Radium from 'radium'
import QuestionsList from '../components/question/QuestionsList'
import { fetchAnswers, updateQuestion, deleteQuestion as _deleteQuestion } from '../actions/question'
import Pagination from '../components/public/Pagination'
import QuestionDetailsModal from '../components/question/QuestionDetailsModal'
import UpdateQuestionModal from '../components/question/UpdateQuestionModal'

const perPage = 15

@Radium
export default class AnswersPage extends React.Component {
    state = {
        updateQuestionModalIsOpen: false,
        questionDetailsModalIsOpen: false,

        questionForUpdateModal: null,
        questionForDetailsModal: null
    }

    componentDidMount() {
        const { dispatch } = this.props

        dispatch(fetchAnswers(1, perPage))
    }

    deleteQuestion = (question) => {
        const { dispatch } = this.props

        if (!window.confirm('确认删除此问题')) {
            return
        }

        dispatch(_deleteQuestion(question))
    }

    openUpdateQuestionModal = (question) => {
        this.setState({
            questionForUpdateModal: question,
            updateQuestionModalIsOpen: true
        })
    }

    closeUpdateQuestionModal = () => {
        this.setState({
            questionForUpdateModal: null,
            updateQuestionModalIsOpen: false
        })
    }

    openQuestionDetailsModal = (question) => {
        this.setState({
            questionForDetailsModal: question,
            questionDetailsModalIsOpen: true
        })
    }

    closeQuestionDetailsModal = () => {
        this.setState({
            questionForDetailsModal: null,
            questionDetailsModalIsOpen: false
        })
    }

    render() {
        const { dispatch } = this.props

        return (
            <div>
                <h3>回答</h3>

                <QuestionsList
                    questions={this.props.answers}
                    openUpdateQuestionModal={this.openUpdateQuestionModal}
                    openQuestionDetailsModal={this.openQuestionDetailsModal}
                    deleteQuestion={this.deleteQuestion}/>

                <Pagination
                    totalCount={this.props.totalCount}
                    currentPage={this.props.currentPage}
                    redirect={bindActionCreators((page) => fetchAnswers(page, perPage), dispatch)}
                    perPage={perPage}/>

                <UpdateQuestionModal question={this.state.questionForUpdateModal}
                                     modalIsOpen={this.state.updateQuestionModalIsOpen}
                                     updateQuestion={bindActionCreators(updateQuestion, dispatch)}
                                     closeModal={this.closeUpdateQuestionModal}/>

                <QuestionDetailsModal question={this.state.questionForDetailsModal}
                                      modalIsOpen={this.state.questionDetailsModalIsOpen}
                                      closeModal={this.closeQuestionDetailsModal}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentPage: state.answers.currentPage,
        totalCount: state.answers.totalCount,
        answers: state.answers.answers
    }
}

const styles = {}

export default connect(mapStateToProps)(AnswersPage)
