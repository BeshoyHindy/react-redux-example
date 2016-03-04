import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import { logOut } from '../actions/account'
import ActiveNavItem from '../components/public/ActiveNavItem'

class App extends Component {
    handleLogOut = () => {
        const { dispatch } = this.props

        dispatch(logOut())
    }

    render() {
        const { path, authed } = this.props

        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">React Redux Example</sup></a>
                        </div>
                        <div className="collapse navbar-collapse">
                            <ul className="nav navbar-nav">
                                <ActiveNavItem path="/" text="Dashboard" currentPath={path}/>
                                <ActiveNavItem path="/homeRecommendations" text="首页推荐" currentPath={path}/>
                                <ActiveNavItem path="/invitationCodes" text="邀请码" currentPath={path}/>
                                <ActiveNavItem path="/users" text="用户" currentPath={path}/>
                                <ActiveNavItem path="/questions" text="提问" currentPath={path}/>
                                <ActiveNavItem path="/answers" text="回答" currentPath={path}/>
                                <ActiveNavItem path="/pendingAnonymousQuestionsPage" text="待答匿名提问" currentPath={path}/>
                                <ActiveNavItem path="/reports" text="举报" currentPath={path}/>
                                <ActiveNavItem path="/broadcastSystemNotifications" text="系统通知" currentPath={path}/>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                {authed ?
                                    <li><a href="javascript: void(0)"
                                           onClick={this.handleLogOut}>登出</a></li> : null}
                            </ul>
                        </div>
                    </div>
                </nav>

                <div id="page-body" className="container">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        authed: state.account.authed,
        path: state.routing.locationBeforeTransitions.pathname
    }
}

export default connect(mapStateToProps)(App)
