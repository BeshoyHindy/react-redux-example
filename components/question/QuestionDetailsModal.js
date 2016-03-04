import React from 'react'
import Radium from 'radium'
import Modal from "react-modal"
import { Link } from 'react-router'
import BaseModal from "../public/BaseInfoModal"
import QuestionCommentsList from './QuestionCommentsList'
import Pagination from '../public/Pagination'
import { friendlyTime, truncate } from '../../filters'

const perPage = 10

@Radium
export default class QuestionDetailsModal extends React.Component {
    static propTypes = {
        question: React.PropTypes.object,
        modalIsOpen: React.PropTypes.bool.isRequired,
        closeModal: React.PropTypes.func.isRequired
    }

    state = {
        comments: [],
        commentsCurrentPage: 1,
        totalCommentsCount: this.props.question ? this.props.question.get('commentsCount') : 0
    }

    removeComment = (comment) => {
        comment.destroy().then(function () {
            this.setState({
                totalCommentsCount: this.state.totalCommentsCount - 1,
                comments: this.state.comments.filter(item => item.id !== comment.id)
            })
        }.bind(this))
    }

    componentWillReceiveProps(nextProps) {
        this.fetchData(1, nextProps.question)
    }

    componentDidMount() {
        this.fetchData(1, this.props.question)
    }

    fetchData = (page, question) => {
        if (!question) {
            this.setState({
                comments: []
            })
            return
        }

        this.setState({
            totalCommentsCount: question.get('commentsCount')
        })

        question.fetchComments(page, perPage).then(function (comments) {
            this.setState({comments, commentsCurrentPage: page})
        }.bind(this))
    }

    render() {
        const { question, modalIsOpen, closeModal } = this.props
        const asker = question ? question.get('asker') : null
        const user = question ? question.get('user') : null

        return (
            <BaseModal
                title="问题详情"
                closeModal={closeModal}
                modalIsOpen={modalIsOpen}>
                <div>
                    <If condition={question !== null && question !== undefined}>
                        <div style={styles.timeWap}>{friendlyTime(question.createdAt)}</div>

                        <p>
                            <strong>
                                {asker ?
                                    <Link to={`/user/${asker.id}`} target='_blank'>{asker.get('name')}</Link> : "游客"}
                            </strong>
                            ：{question.get('title')}
                        </p>

                        <If condition={question.get('answered')}>
                            <div style={styles.timeWap}>{friendlyTime(question.get('answeredAt'))}</div>

                            <p>
                                <strong>
                                    <Link to={`/user/${user.id}`} target='_blank'>{user.get('name')}</Link>
                                </strong>
                                ：{truncate(question.get('answer'), 60)}
                            </p>
                        </If>

                        <If condition={question.get('drafted')}>
                            <div style={styles.timeWap}>{friendlyTime(question.get('draftedAt'))}</div>

                            <p>
                                <strong>
                                    <Link to={`/user/${user.id}`} target='_blank'>{user.get('name')}</Link>
                                </strong>
                                ：<span className="label label-warning" style={styles.draftFlag}>草稿</span>
                                {truncate(question.get('draft'), 60)}
                            </p>
                        </If>

                        <p>{question.get('likesCount')} 点赞，{this.state.totalCommentsCount} 评论</p>

                        <hr style={styles.hr}/>

                        {this.state.totalCommentsCount !== 0 ?
                            (<div>
                                <QuestionCommentsList key="comments"
                                                      comments={this.state.comments}
                                                      removeComment={this.removeComment}/>
                                <Pagination
                                    totalCount={this.state.totalCommentsCount}
                                    currentPage={this.state.commentsCurrentPage}
                                    redirect={(page) => this.fetchData(page, question)}
                                    perPage={perPage}
                                    size="sm"/>
                            </div>) : "无"}
                    </If>
                </div>
            </BaseModal>
        )
    }
}

const styles = {
    timeWap: {
        fontSize: '12px',
        color: '#AAAAAA'
    },
    hr: {
        margin: '10px 0',
        borderTop: '1px solid #E8E8E8'
    },
    draftFlag: {
        marginRight: '5px'
    }
}