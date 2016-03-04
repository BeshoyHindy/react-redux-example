import React from 'react'
import Radium from 'radium'
import { Link } from 'react-router'
import { friendlyTimeWithLineBreak, truncate } from '../../filters'

@Radium
export default class PendingQuestionsList extends React.Component {
    static propTypes = {
        questions: React.PropTypes.array.isRequired,
        deleteQuestion: React.PropTypes.func.isRequired,
        openUpdateQuestionModal: React.PropTypes.func.isRequired,
        openQuestionDetailsModal: React.PropTypes.func.isRequired,
    }

    render() {
        const { questions, deleteQuestion, openUpdateQuestionModal, openQuestionDetailsModal } = this.props
        const rows = questions.map(question => {
            const asker = question.get('asker')
            return (
                <tr key={question.id}>
                    <td style={styles.titleCell}>
                        <strong>
                            {asker ? (<Link to={`/user/${asker.id}`}>{asker.get('name')}</Link>) : "游客"}
                        </strong>
                        ：
                        {question.get('title')}
                    </td>
                    <td style={styles.draftCell}>
                        {question.get('drafted') ? truncate(question.get('draft'), 60) : null}
                    </td>
                    <td>{friendlyTimeWithLineBreak(question.createdAt)}</td>
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
                    <th>问题</th>
                    <th>草稿</th>
                    <th>提问于</th>
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
    draftCell: {
        maxWidth: '200px'
    }
}
