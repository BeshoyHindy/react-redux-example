import React from 'react'
import Radium from 'radium'
import moment from 'moment'
import { Link } from 'react-router'
import { truncate, friendlyTimeWithLineBreak } from '../../filters'

@Radium
export default class UsersList extends React.Component {

    handleOpenUserQAPage = (user) => {
        const { openUserQAPage } = this.props

        if (window.confirm('确认开通？')) {
            openUserQAPage(user)
        }
    }

    handleCloseUserQAPage = (user) => {
        const { closeUserQAPage } = this.props

        if (window.confirm('确认关闭？')) {
            closeUserQAPage(user)
        }
    }

    render() {
        const { users, openModal } = this.props
        const userNodes = users.map(user => {
            return (
                <tr key={user.id}>
                    <td>
                        <img src={user.get('avatar').url()} width="30" height="30" alt=""
                             className="img-circle"/>
                    </td>
                    <td style={styles.name}>
                        <Link to={"/user/" + user.id}>{user.get('name')}</Link>
                    </td>
                    <td style={styles.titleCell}>{user.get('title')}</td>
                    <td>{user.get('authed') ? null : (<i className="fa fa-close"/>)}</td>
                    <td>{user.get('opened') ? null : (<i className="fa fa-close"/>)}</td>
                    <td>{user.get('processingQARequest') ? (
                        <span className="label label-warning">待处理</span>) : null}</td>
                    <td>
                        <span className="hint--top" data-hint={user.get('mobilePhoneNumber')}>
                            <i className="fa fa-mobile-phone"/>
                        </span>
                    </td>
                    <td>{user.get('answeredQuestionsCount')}</td>
                    <td style={styles.tagsCell}>{user.get('tags').join(", ")}</td>
                    <td style={styles.achievementsCell}>{truncate(user.get('achievements'), 20)}</td>
                    <td style={styles.descCell}>{truncate(user.get('desc'), 20)}</td>
                    <td>{friendlyTimeWithLineBreak(user.createdAt)}</td>
                    <td>
                        <div className="btn-group btn-group-sm">
                            <button type="button" className="btn btn-default" onClick={() => openModal(user)}>编辑
                            </button>

                            <If condition={!user.get('opened')}>
                                <button type="button" className="btn btn-primary"
                                        onClick={() => this.handleOpenUserQAPage(user)}>开通
                                </button>
                            </If>

                            <If condition={!user.get('processingQARequest') && user.get('opened')}>
                                <button type="button" className="btn btn-default"
                                        onClick={() => this.handleCloseUserQAPage(user)}>关闭
                                </button>
                            </If>
                        </div>
                    </td>
                </tr>
            )
        })

        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th/>
                    <th>用户</th>
                    <th>身份</th>
                    <th>认证</th>
                    <th>开通<br/>Q&A</th>
                    <th>Q&A<br/>申请</th>
                    <th>手机</th>
                    <th>问答</th>
                    <th>标签</th>
                    <th>成就</th>
                    <th>简介</th>
                    <th>注册于</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>{userNodes}</tbody>
            </table>
        )
    }
}

const styles = {
    name: {
        fontWeight: 'bold'
    },
    titleCell: {
        maxWidth: '120px'
    },
    tagsCell: {
        maxWidth: '140px'
    },
    achievementsCell: {
        maxWidth: '140px'
    },
    descCell: {
        maxWidth: '140px'
    }
}