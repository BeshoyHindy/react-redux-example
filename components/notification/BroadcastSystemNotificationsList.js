import React from 'react'
import Radium from 'radium'
import { friendlyTimeWithLineBreak } from '../../filters'

@Radium
export default class BroadcastSystemNotificationsList extends React.Component {
    static propTypes = {
        notifications: React.PropTypes.array.isRequired
    }

    render() {
        const { notifications } = this.props
        const rows = notifications.map(notification => {
            return (
                <tr key={notification.id}>
                    <td>
                        {notification.get('content')}
                    </td>
                    <td>
                        {friendlyTimeWithLineBreak(notification.createdAt)}
                    </td>
                </tr>
            )
        })

        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>推送于</th>
                    <th>内容</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        )
    }
}

const styles = {}