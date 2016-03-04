import React from 'react'
import Radium from 'radium'
import { Link } from 'react-router'
import { friendlyTimeWithLineBreak, truncate } from '../../filters'

@Radium
export default class AnswersList extends React.Component {
    static propTypes = {
        answeredQuestions: React.PropTypes.array.isRequired,
    }

    render() {
        const { answeredQuestions } = this.props
        const rows = answeredQuestions.map(question => {
            const asker = question.get('asker')
            const user = question.get('user')

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
                        <Link to={`/user/${user.id}`}>{user.get('name')}</Link>
                        ：
                        {truncate(question.get('answer'), 60)}
                    </td>
                    <td>{question.get('commentsCount')}</td>
                    <td>{question.get('likesCount')}</td>
                    <td>{friendlyTimeWithLineBreak(question.createdAt)}</td>
                    <td>{friendlyTimeWithLineBreak(question.get('answeredAt'))}</td>
                </tr>
            )
        })

        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>问题</th>
                    <th>匿名</th>
                    <th>回答</th>
                    <th>回复</th>
                    <th>点赞</th>
                    <th>提问于</th>
                    <th>回答于</th>
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
