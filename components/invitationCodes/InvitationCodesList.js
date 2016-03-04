import React from 'react'
import Radium from 'radium'
import { browserHistory, Link } from 'react-router'
import { friendlyTimeWithLineBreak } from '../../filters'

@Radium
export default class InvitationCodesList extends React.Component {
    static propTypes = {
        invitationCodes: React.PropTypes.array.isRequired,
        openModal: React.PropTypes.func.isRequired
    }

    render() {
        const { invitationCodes, openModal } = this.props
        const rows = invitationCodes.map(code => {
            return (
                <tr key={code.id}>
                    <td style={code.get('used') || code.get('sended') ? styles.usedCodeCell : styles.unusedCodeCell}>{code.get('code')}</td>
                    <td>{generateCodeKind(code)}</td>
                    <td>{generateCodeCreator(code)}</td>
                    <td>{code.get('sended') ? (<i className="fa fa-check"/>) : null}</td>
                    <td>{friendlyTimeWithLineBreak(code.get('sendedAt'))}</td>
                    <td>{code.get('sendedTo')}</td>
                    <td>{friendlyTimeWithLineBreak(code.createdAt)}</td>
                    <td>{friendlyTimeWithLineBreak(code.get('usedAt'))}</td>
                    <td>
                        {code.get('user')
                            ? <Link to={`/user/${code.get('user').id}`}>{code.get('user').get('name')}</Link>
                            : null}
                    </td>
                    <td>
                        <If condition={code.get('kind') === 3 && !code.get('sended')}>
                            <div className="btn-group btn-group-sm">
                                <button type="button" className="btn btn-default"
                                        onClick={() => openModal(code)}>标记为已发送
                                </button>
                            </div>
                        </If>
                    </td>
                </tr>
            )
        })

        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>邀请码</th>
                    <th>类型</th>
                    <th>创建者</th>
                    <th>已发送</th>
                    <th>发送于</th>
                    <th>发送对象</th>
                    <th>创建于</th>
                    <th>使用于</th>
                    <th>注册用户</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        )
    }
}

function generateCodeKind(code) {
    let kind = ""

    switch (code.get('kind')) {
        case 1:
            kind = "提问被回答"
            break
        case 2:
            kind = "用户生成"
            break
        case 3:
            kind = "管理员生成"
            break
    }

    return kind
}

function generateCodeCreator(code) {
    switch (code.get('kind')) {
        case 1:
            return "system"
        case 2:
            return (
                <Link to={`/user/${code.get('createdBy').id}`}>{code.get('createdBy').get('name')}</Link>
            )
        case 3:
            return "admin"
        default:
            return ""
    }
}

const styles = {
    unusedCodeCell: {
        fontWeight: 'bold'
    },
    usedCodeCell: {
        textDecoration: 'line-through',
        color: 'lightgray'
    }
}
