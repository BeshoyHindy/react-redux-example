import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { fetchDashboardData } from '../actions/dashboard'

export default class DashboardPage extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props

        dispatch(fetchDashboardData())
    }

    render() {
        const { dispatch, usersCount, questionsCount, answersCount, reportsCount } = this.props

        return (
            <div>
                <h3>Dashboard</h3>

                <div className="row">
                    <div className="col-md-4">
                        <table className="table table-bordered">
                            <tbody>
                            <tr>
                                <td>今日注册用户</td>
                                <td>{usersCount}</td>
                                <td>
                                    <Link to="/users">详情</Link>
                                </td>
                            </tr>
                            <tr>
                                <td>今日提问</td>
                                <td>{questionsCount}</td>
                                <td>
                                    <Link to="/questions">详情</Link>
                                </td>
                            </tr>
                            <tr>
                                <td>今日回答</td>
                                <td>{answersCount}</td>
                                <td>
                                    <Link to="/answers">详情</Link>
                                </td>
                            </tr>
                            <tr>
                                <td>今日举报</td>
                                <td>{reportsCount}</td>
                                <td>
                                    <Link to="/reports">详情</Link>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        usersCount: state.dashboard.usersCount,
        questionsCount: state.dashboard.questionsCount,
        answersCount: state.dashboard.answersCount,
        reportsCount: state.dashboard.reportsCount
    }
}

export default connect(mapStateToProps)(DashboardPage)
