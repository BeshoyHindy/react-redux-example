import React from 'react'
import Radium from 'radium'
import { Link } from 'react-router'
import { friendlyTimeWithLineBreak, truncate } from '../../filters'

@Radium
export default class DraftsList extends React.Component {
    static propTypes = {
        questions: React.PropTypes.array.isRequired,
        openQuestionDetailsModal: React.PropTypes.func.isRequired,
        deleteQuestion: React.PropTypes.func.isRequired
    }

    render() {
        const { questions, openQuestionDetailsModal, deleteQuestion } = this.props
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
                    <td>{question.get('anonymous') ? <i className="fa fa-check"/> : null}</td>
                    <td style={styles.answerCell}>
                        {truncate(question.get('draft'), 60)}
                    </td>
                    <td>{friendlyTimeWithLineBreak(question.createdAt)}</td>
                    <td>{friendlyTimeWithLineBreak(question.get('draftedAt'))}</td>
                    <td>
                        <div className="btn-group btn-group-sm">
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
                    <th>匿名</th>
                    <th>草稿</th>
                    <th>提问于</th>
                    <th>最后编辑于</th>
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
