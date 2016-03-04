import React from 'react'
import Radium from 'radium'
import { Link } from 'react-router'
import { friendlyTime } from '../../filters'

@Radium
export default class QuestionCommentsList extends React.Component {
    static propTypes = {
        comments: React.PropTypes.array.isRequired,
        removeComment: React.PropTypes.func.isRequired
    }

    handleRemove = (comment) => {
        const { removeComment } = this.props

        if (!window.confirm('确认删除？')) {
            return
        }

        removeComment(comment)
    }

    render() {
        const { comments } = this.props
        const rows = comments.map((comment) => {
            const user = comment.get('user')

            return (
                <div key={comment.id} style={styles.wap}>
                    <div style={styles.timeWap}>{friendlyTime(comment.createdAt)}</div>

                    <div style={styles.content}>
                        <strong>
                            <Link to={`/user/${user.id}`} target='_blank'>{user.get('name')}</Link>
                        </strong>
                        ：{comment.get('content')}
                    </div>

                    <button type="button" className="btn btn-default btn-xs" style={styles.btnRemove}
                            onClick={() => this.handleRemove(comment)}>
                        删除
                    </button>
                </div>
            )
        })

        return (
            <div>
                {rows}
            </div>
        )
    }
}

const styles = {
    wap: {
        padding: '5px 50px 5px 0',
        position: 'relative',
        ':hover': {
            backgroundColor: '#F2F2F2'
        }
    },
    timeWap: {
        fontSize: '12px',
        color: '#AAAAAA'
    },
    content: {},
    btnRemove: {
        position: 'absolute',
        right: '5px',
        top: '5px'
    }
}
