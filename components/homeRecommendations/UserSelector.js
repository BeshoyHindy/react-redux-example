import React from 'react'
import Radium from 'radium'

@Radium
export default class UserSelector extends React.Component {
    static propTypes = {
        users: React.PropTypes.array.isRequired,
        selectUser: React.PropTypes.func.isRequired
    }

    render() {
        const { users, selectUser } = this.props
        const userNodes = users.map((user, index, array) => {
            return (
                <div key={user.id} className="clearfix" style={[
                    styles.row,
                    { marginBottom: (index === array.length - 1) ? "20px": "10px"}
                    ]}>
                    <div className="pull-left">
                        <img src={user.get('avatar').url()} width="30" height="30" alt=""
                             className="img-circle"/>
                        <span style={styles.userName}>{user.get('name')}</span>
                    </div>
                    <div className="pull-right">
                        <button type="button" className="btn btn-primary btn-sm"
                                onClick={() => selectUser(user)}>选择
                        </button>
                    </div>
                </div>
            )
        })

        return (
            <div style={styles.wap}>{userNodes}</div>
        )
    }
}

const styles = {
    wap: {
        maxHeight: '200px',
        overflowY: 'auto'
    },
    row: {
        ':hover': {
            backgroundColor: '#EEE'
        }
    },
    userName: {
        marginLeft: '5px'
    }
}
