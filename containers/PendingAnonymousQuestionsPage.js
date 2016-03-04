import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPendingAnonymousQuestions, updateQuestion, deleteQuestion as _deleteQuestion } from '../actions/question'
import Pagination from '../components/public/Pagination'
import QuestionsList from '../components/question/QuestionsList'
import QuestionDetailsModal from '../components/question/QuestionDetailsModal'
import UpdateQuestionModal from '../components/question/UpdateQuestionModal'

const perPage = 15

export default class PendingAnonymousQuestionsPage extends React.Component {
    state = {
        updateQuestionModalIsOpen: false,
        questionDetailsModalIsOpen: false,

        questionForUpdateModal: null,
        questionForDetailsModal: null
    }

    componentDidMount() {
        const { dispatch } = this.props

        dispatch(fetchPendingAnonymousQuestions(1, perPage))
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
        const { dispatch, questions } = this.props

        return (
            <div>
                <h3>待回答的匿名提问</h3>

                <QuestionsList
                    questions={questions}
                    openUpdateQuestionModal={this.openUpdateQuestionModal}
                    openQuestionDetailsModal={this.openQuestionDetailsModal}
                    deleteQuestion={this.deleteQuestion}/>

                <UpdateQuestionModal question={this.state.questionForUpdateModal}
                                     modalIsOpen={this.state.updateQuestionModalIsOpen}
                                     updateQuestion={bindActionCreators(updateQuestion, dispatch)}
                                     closeModal={this.closeUpdateQuestionModal}/>

                <QuestionDetailsModal question={this.state.questionForDetailsModal}
                                      modalIsOpen={this.state.questionDetailsModalIsOpen}
                                      closeModal={this.closeQuestionDetailsModal}/>

                <Pagination
                    totalCount={this.props.totalCount}
                    currentPage={this.props.currentPage}
                    redirect={bindActionCreators((page) => fetchPendingAnonymousQuestions(page, perPage), dispatch)}
                    perPage={perPage}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        totalCount: state.pendingAnonymousQuestions.totalCount,
        currentPage: state.pendingAnonymousQuestions.currentPage,
        questions: state.pendingAnonymousQuestions.questions
    }
}

export default connect(mapStateToProps)(PendingAnonymousQuestionsPage)
