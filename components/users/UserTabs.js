import React from 'react'
import Radium from 'radium'
import ReactTabs from 'react-tabs'
import Pagination from '../public/Pagination'
import QuestionsList from '../question/QuestionsList'
import PendingQuestionsList from '../question/PendingQuestionsList'
import DraftsList from '../question/DraftsList'
import AskedQuestionsList from '../question/AskedQuestionsList'
import UpdateQuestionModal from '../question/UpdateQuestionModal'
import QuestionDetailsModal from '../question/QuestionDetailsModal'
import { bindActionCreators } from 'redux'

const Tab = ReactTabs.Tab
const Tabs = ReactTabs.Tabs
const TabList = ReactTabs.TabList
const TabPanel = ReactTabs.TabPanel

const perPage = 15

@Radium
export default class UserTabs extends React.Component {
    static propTypes = {
        user: React.PropTypes.object.isRequired
    }

    state = {
        questionsByLikesCount: [],
        questionsByLikesCountCurrentPage: 1,

        questionsByTime: [],
        questionsByTimeCurrentPage: 1,

        pendingQuestions: [],
        pendingQuestionsCurrentPage: 1,

        drafts: [],
        draftsCurrentPage: 1,

        askedQuestions: [],
        askedQuestionsCurrentPage: 1,

        updateQuestionModalIsOpen: false,
        questionDetailsModalIsOpen: false,

        questionForUpdateModal: null,
        questionForDetailsModal: null,

        selectedIndex: 0
    }

    handleSelect = (index, last) => {
        this.setState({selectedIndex: index})
    }

    updateQuestion = (question, title) => {
        question.update(title).then(function (updatedQuestion) {
            this.setState({
                questionsByLikesCount: this.state.questionsByLikesCount.map((question) => {
                    return (question.id === updatedQuestion.id) ? updatedQuestion : question
                }),
                questionsByTime: this.state.questionsByTime.map((question) => {
                    return (question.id === updatedQuestion.id) ? updatedQuestion : question
                }),
                pendingQuestions: this.state.pendingQuestions.map((question) => {
                    return (question.id === updatedQuestion.id) ? updatedQuestion : question
                })
            })
        }.bind(this))
    }

    deleteQuestion = (question) => {
        if (!window.confirm('确认删除此问题')) {
            return
        }

        question.destroy().then(function (deletedQuestion) {
            this.setState({
                questionsByLikesCount: this.state.questionsByLikesCount.filter(question => question.id !== deletedQuestion.id),
                questionsByTime: this.state.questionsByTime.filter(question => question.id !== deletedQuestion.id),
                drafts: this.state.drafts.filter(question => question.id !== deletedQuestion.id),
                askedQuestions: this.state.pendingQuestions.filter(question => question.id !== deletedQuestion.id),
                pendingQuestions: this.state.pendingQuestions.filter(question => question.id !== deletedQuestion.id)
            })
        }.bind(this))
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

    componentWillReceiveProps(nextProps) {
        if (this.props.user.id !== nextProps.user.id) {
            this.setState({
                selectedIndex: 0,
                questionsByLikesCount: [],
                questionsByLikesCountCurrentPage: 1,
                questionsByTime: [],
                questionsByTimeCurrentPage: 1,
                pendingQuestions: [],
                pendingQuestionsCurrentPage: 1,
                drafts: [],
                draftsCurrentPage: 1,
                askedQuestions: [],
                askedQuestionsCurrentPage: 1
            })

            this.fetchData(nextProps.user)
        }
    }

    componentDidMount() {
        this.fetchData(this.props.user)
    }

    fetchData = (user) => {
        this.fetchQuestionsByLikesCount(1, user)
        this.fetchQuestionsByTime(1, user)
        this.fetchPendingQuestions(1, user)
        this.fetchDrafts(1, user)
        this.fetchAskedQuestions(1, user)
    }

    fetchQuestionsByLikesCount = (page, user) => {
        user.fetchQuestionsByLikesCount(page, perPage).then(function (questions) {
            this.setState({questionsByLikesCount: questions, questionsByLikesCountCurrentPage: page})
        }.bind(this))
    }

    fetchQuestionsByTime = (page, user) => {
        user.fetchQuestionsByTime(page, perPage).then(function (questions) {
            this.setState({questionsByTime: questions, questionsByTimeCurrentPage: page})
        }.bind(this))
    }

    fetchPendingQuestions = (page, user) => {
        user.fetchPendingQuestions(page, perPage).then(function (questions) {
            this.setState({pendingQuestions: questions, pendingQuestionsCurrentPage: page})
        }.bind(this))
    }

    fetchDrafts = (page, user) => {
        user.fetchDrafts(page, perPage).then(function (drafts) {
            this.setState({drafts: drafts, draftsCurrentPage: page})
        }.bind(this))
    }

    fetchAskedQuestions = (page, user) => {
        user.fetchAskedQuestions(page, perPage).then(function (questions) {
            this.setState({askedQuestions: questions, askedQuestionsCurrentPage: page})
        }.bind(this))
    }

    render() {
        const { user } = this.props
        const { questionsByLikesCount, questionsByTime, pendingQuestions, drafts, askedQuestions,
            questionForUpdateModal, questionForDetailsModal, updateQuestionModalIsOpen,
            questionDetailsModalIsOpen } = this.state

        return (
            <div>
                <Tabs selectedIndex={this.state.selectedIndex} onSelect={this.handleSelect}>
                    <TabList>
                        <Tab>
                            问答（按热度）
                            <span className="badge">{user.get('answeredQuestionsCount')}</span>
                        </Tab>
                        <Tab>
                            问答（按时间）
                            <span className="badge">{user.get('answeredQuestionsCount')}</span>
                        </Tab>
                        <Tab>
                            待回答问题&nbsp;
                            <span className="badge">{user.get('pendingQuestionsCount')}</span>
                        </Tab>
                        <Tab>
                            草稿&nbsp;
                            <span className="badge">{user ? user.get('draftsCount') : null}</span>
                        </Tab>
                        <Tab>
                            提问&nbsp;
                            <span className="badge">{user ? user.get('askedQuestionsCount') : null}</span>
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <QuestionsList questions={questionsByLikesCount}
                                       openUpdateQuestionModal={this.openUpdateQuestionModal}
                                       openQuestionDetailsModal={this.openQuestionDetailsModal}
                                       deleteQuestion={this.deleteQuestion}
                                       showQuestionUser={false}/>

                        <Pagination
                            totalCount={user.get('answeredQuestionsCount')}
                            currentPage={this.state.questionsByLikesCountCurrentPage}
                            redirect={(page) => this.fetchQuestionsByLikesCount(page, user)}
                            perPage={perPage}/>
                    </TabPanel>
                    <TabPanel>
                        <QuestionsList questions={questionsByTime}
                                       openUpdateQuestionModal={this.openUpdateQuestionModal}
                                       openQuestionDetailsModal={this.openQuestionDetailsModal}
                                       deleteQuestion={this.deleteQuestion}
                                       showQuestionUser={false}/>

                        <Pagination
                            totalCount={user.get('answeredQuestionsCount')}
                            currentPage={this.state.questionsByTimeCurrentPage}
                            redirect={(page) => this.fetchQuestionsByTime(page, user)}
                            perPage={perPage}/>
                    </TabPanel>
                    <TabPanel>
                        <PendingQuestionsList questions={pendingQuestions}
                                              deleteQuestion={this.deleteQuestion}
                                              openUpdateQuestionModal={this.openUpdateQuestionModal}
                                              openQuestionDetailsModal={this.openQuestionDetailsModal}/>
                        <Pagination
                            totalCount={user.get('pendingQuestionsCount')}
                            currentPage={this.state.pendingQuestionsCurrentPage}
                            redirect={(page) => this.fetchPendingQuestions(page, user)}
                            perPage={perPage}/>
                    </TabPanel>
                    <TabPanel>
                        <DraftsList questions={drafts}
                                    deleteQuestion={this.deleteQuestion}
                                    openQuestionDetailsModal={this.openQuestionDetailsModal}/>
                        <Pagination
                            totalCount={user.get('draftsCount')}
                            currentPage={this.state.draftsCurrentPage}
                            redirect={(page) => this.fetchDrafts(page, user)}
                            perPage={perPage}/>
                    </TabPanel>
                    <TabPanel>
                        <AskedQuestionsList questions={askedQuestions}
                                            deleteQuestion={this.deleteQuestion}
                                            openQuestionDetailsModal={this.openQuestionDetailsModal}/>
                        <Pagination
                            totalCount={user.get('askedQuestionsCount')}
                            currentPage={this.state.askedQuestionsCurrentPage}
                            redirect={(page) => this.fetchAskedQuestions(page, user)}
                            perPage={perPage}/>
                    </TabPanel>
                </Tabs>

                <UpdateQuestionModal question={questionForUpdateModal}
                                     modalIsOpen={updateQuestionModalIsOpen}
                                     updateQuestion={this.updateQuestion}
                                     closeModal={this.closeUpdateQuestionModal}/>

                <QuestionDetailsModal question={questionForDetailsModal}
                                      modalIsOpen={questionDetailsModalIsOpen}
                                      closeModal={this.closeQuestionDetailsModal}/>
            </div>
        )
    }
}

const styles = {}
