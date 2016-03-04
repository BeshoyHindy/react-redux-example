import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateQuestion, deleteQuestion as _deleteQuestion } from '../actions/question'
import { fetchReportedQuestions } from '../actions/reportedQuestions'
import Pagination from '../components/public/Pagination'
import ReportedQuestionsList from '../components/reportedQuestions/ReportedQuestionsList'
import QuestionDetailsModal from '../components/question/QuestionDetailsModal'
import UpdateQuestionModal from '../components/question/UpdateQuestionModal'

const perPage = 15

export default class ReportsPage extends React.Component {
    state = {
        updateQuestionModalIsOpen: false,
        questionDetailsModalIsOpen: false,

        questionForUpdateModal: null,
        questionForDetailsModal: null
    }

    componentDidMount() {
        const { dispatch } = this.props

        dispatch(fetchReportedQuestions(1, perPage))
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
        const { dispatch, reportedQuestions } = this.props

        return (
            <div>
                <h3>问题举报</h3>

                <ReportedQuestionsList
                    reportedQuestions={reportedQuestions}
                    openUpdateQuestionModal={this.openUpdateQuestionModal}
                    openQuestionDetailsModal={this.openQuestionDetailsModal}
                    deleteQuestion={this.deleteQuestion}/>

                <Pagination
                    totalCount={this.props.totalCount}
                    currentPage={this.props.currentPage}
                    redirect={bindActionCreators((page) => fetchReportedQuestions(page, perPage), dispatch)}
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
        totalCount: state.reportedQuestions.totalCount,
        currentPage: state.reportedQuestions.currentPage,
        reportedQuestions: state.reportedQuestions.reportedQuestions
    }
}

export default connect(mapStateToProps)(ReportsPage)
