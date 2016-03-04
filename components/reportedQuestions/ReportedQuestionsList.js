import React from 'react'
import Radium from 'radium'
import { Link } from 'react-router'
import { friendlyTimeWithLineBreak, truncate } from '../../filters'

@Radium
export default class ReportedQuestionsList extends React.Component {
    static propTypes = {
        reportedQuestions: React.PropTypes.array.isRequired,
        openUpdateQuestionModal: React.PropTypes.func.isRequired,
        openQuestionDetailsModal: React.PropTypes.func.isRequired,
        deleteQuestion: React.PropTypes.func.isRequired
    }

    render() {
        const { reportedQuestions, openQuestionDetailsModal, openUpdateQuestionModal, deleteQuestion } = this.props
        const rows = reportedQuestions.map(reportedQuestion => {
            const question = reportedQuestion.get('question')
            const reporter = reportedQuestion.get('reporter')

            return (
                <tr key={reportedQuestion.id}>
                    <td>
                        {reporter
                            ? <Link to={`/user/${reporter.id}`}>{reporter.get('name')}</Link>
                            : "游客"}
                    </td>
                    <td style={styles.titleCell}>
                        <strong>
                            {question.get('asker') ?
                                <Link to={`/user/${question.get('user').id}`}>
                                    {question.get('user').get('name')}
                                </Link> : "游客"}
                        </strong>
                        ：
                        {question.get('title')}
                    </td>
                    <td style={styles.answerCell}>
                        <strong>
                            <Link to={`/user/${question.get('user').id}`}>
                                {question.get('user').get('name')}
                            </Link>
                        </strong>
                        ：
                        {truncate(question.get('answer'), 60)}
                    </td>
                    <td>{friendlyTimeWithLineBreak(reportedQuestion.createdAt)}</td>
                    <td>
                        <div className="btn-group btn-group-sm">
                            <button type="button" className="btn btn-default"
                                    onClick={() => openUpdateQuestionModal(question)}>编辑
                            </button>
                            <button type="button" className="btn btn-default"
                                    onClick={() => deleteQuestion(question)}>删除
                            </button>
                            <button type="button" className="btn btn-default"
                                    onClick={() => openQuestionDetailsModal(question)}>详情
                            </button>
                        </div>
                    </td>
                </tr>
            )
        })

        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>举报者</th>
                    <th>问题</th>
                    <th>回答</th>
                    <th>举报于</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        )
    }
}

const styles = {
    titleCell: {
        maxWidth: '200px'
    },
    answerCell: {
        maxWidth: '200px'
    }
}