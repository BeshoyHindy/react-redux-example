import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchBroadcastSystemNotifications, pushBroadcastSystemNotification } from '../actions/broadcastSystemNotifications'
import BroadcastSystemNotificationsList from '../components/notification/BroadcastSystemNotificationsList'

export default class BroadcastSystemNotificationsPage extends React.Component {
    state = {
        content: ''
    }

    componentDidMount() {
        const { dispatch } = this.props

        dispatch(fetchBroadcastSystemNotifications())
    }

    handleContentChange = (e) => {
        this.setState({content: e.target.value.trim()})
    }

    handleSubmit = (e) => {
        const { dispatch } = this.props

        e.preventDefault()

        if (this.state.content === '') {
            window.alert('请输入内容')
            return
        }

        dispatch(pushBroadcastSystemNotification(this.state.content))
        this.setState({content: ""})
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-8">
                    <h3>推送系统通知</h3>

                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>通知内容</label>
                            <textarea className="form-control" rows="3"
                                      onChange={this.handleContentChange} value={this.state.content}/>
                        </div>
                        <button type="submit" className="btn btn-default">推送</button>
                    </form>

                    <h3>推送记录</h3>

                    <BroadcastSystemNotificationsList notifications={this.props.notifications}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        notifications: state.broadcastSystemNotifications
    }
}

export default connect(mapStateToProps)(BroadcastSystemNotificationsPage)
