import React from 'react'
import Radium from 'radium'
import { friendlyTime } from '../../filters'

@Radium
export default class UserPageHeader extends React.Component {
    static propTypes = {
        user: React.PropTypes.object.isRequired
    }

    render() {
        const { user } = this.props
        const notificationsReadStatus = []
        const notificationsSwitchStatus = []

        if (user.get('unreadAskQuestionNotificationsCount')) {
            notificationsReadStatus.push(`${user.get('unreadAskQuestionNotificationsCount')}条未读提问通知`)
        }
        if (user.get('unreadOtherNotificationsCount')) {
            notificationsReadStatus.push(`${user.get('unreadOtherNotificationsCount')}条未读其他通知`)
        }

        if (!user.get('allowRemoteNotification')) {
            notificationsSwitchStatus.push('不接收通知')
        }
        if (!user.get('allowAskQuestionInnerNotification')) {
            notificationsSwitchStatus.push('不显示“被提问”应用内红点提示')
        }
        if (!user.get('allowAnswerQuestionInnerNotification')) {
            notificationsSwitchStatus.push('不显示“提问被回答”应用内红点提示')
        }
        if (!user.get('allowCommentQuestionInnerNotification')) {
            notificationsSwitchStatus.push('不显示“被回复”应用内红点提示')
        }
        if (!user.get('allowLikeQuestionInnerNotification')) {
            notificationsSwitchStatus.push('不显示“被赞”应用内红点提示')
        }

        return (
            <div>
                <div className="media" style={styles.header}>
                    <div className="media-left">
                        <img className="media-object img-circle" width="50" height="50"
                             src={user && user.get('avatar') ? user.get('avatar').url() : null}/>
                    </div>
                    <div className="media-body">
                        <h4 className="media-heading" style={styles.name}>
                            {user.get('name')}

                            {user.get('authed')
                                ? <span className="label label-info"
                                        style={styles.statusLabel}>已认证</span>
                                : <span className="label label-default"
                                        style={styles.statusLabel}>未认证</span>}

                            {user.get('opened')
                                ? <span className="label label-info"
                                        style={styles.statusLabel}>已开通</span>
                                : <span className="label label-default"
                                        style={styles.statusLabel}>未开通</span>}

                            {user.get('processingQARequest')
                                ? <span className="label label-warning"
                                        style={styles.statusLabel}>申请开通</span>
                                : null}
                        </h4>
                        {user.get('title')}

                    </div>
                </div>

                <p><strong>注册于</strong>：{friendlyTime(user.createdAt)}</p>
                <p><strong>最后活跃于</strong>
                    ：{user.get('lastActiveAt') ? friendlyTime(user.get('lastActiveAt')) : "暂无数据"}</p>
                <p><strong>手机</strong>：{user.get('mobilePhoneNumber')}</p>
                <p><strong>标签</strong>：{user.get('tags') ? user.get('tags').join(', ') : null}</p>
                <p><strong>获赞</strong>：{user.get('likesCount')}</p>
                <p><strong>成就</strong>：{user.get('achievements')}</p>
                <p style={styles.desc}><strong>简介</strong>：{user.get('desc')}</p>
                <p>
                    <strong>通知状态</strong>：
                    {notificationsReadStatus.length > 0 ? notificationsReadStatus.join(', ') : "无未读通知"}
                </p>
                <p>
                    <strong>通知开关</strong>：
                    {notificationsSwitchStatus.length > 0 ? notificationsSwitchStatus.join(', ') : "全部打开"}
                </p>
            </div>
        )
    }
}

const styles = {
    header: {
        marginBottom: '15px'
    },
    name: {
        marginTop: '4px'
    },
    statusLabel: {
        marginLeft: '10px',
        fontSize: '12px'
    },
    desc: {
        marginBottom: '15px'
    }
}
