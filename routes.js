import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import AuthPage from './containers/AuthPage'
import PendingAnonymousQuestionsPage from './containers/PendingAnonymousQuestionsPage'
import DashboardPage from './containers/DashboardPage'
import HomeRecommendationsPage from './containers/HomeRecommendationsPage'
import InvitationCodesPage from './containers/InvitationCodesPage'
import QuestionsPage from './containers/QuestionsPage'
import AnswersPage from './containers/AnswersPage'
import BroadcastSystemNotificationsPage from './containers/BroadcastSystemNotificationsPage'
import ReportsPage from './containers/ReportsPage'
import UsersPage from './containers/UsersPage'
import UserPage from './containers/UserPage'
import VisitorQuestionsReviewPage from './containers/VisitorQuestionsReviewPage'
import * as auth from './auth'

function requireAuth(nextState, replace) {
    if (!auth.loggedIn()) {
        replace('/auth')
    }
}

export default (
    <Route path="/" component={App}>
        <IndexRoute component={DashboardPage} onEnter={requireAuth}/>
        <Route path="homeRecommendations" component={HomeRecommendationsPage} onEnter={requireAuth}/>
        <Route path="users" component={UsersPage} onEnter={requireAuth}/>
        <Route path="invitationCodes" component={InvitationCodesPage} onEnter={requireAuth}/>
        <Route path="reports" component={ReportsPage} onEnter={requireAuth}/>
        <Route path="pendingAnonymousQuestionsPage" component={PendingAnonymousQuestionsPage} onEnter={requireAuth}/>
        <Route path="visitorQuestions" component={VisitorQuestionsReviewPage} onEnter={requireAuth}/>
        <Route path="questions" component={QuestionsPage} onEnter={requireAuth}/>
        <Route path="answers" component={AnswersPage} onEnter={requireAuth}/>
        <Route path="broadcastSystemNotifications" component={BroadcastSystemNotificationsPage} onEnter={requireAuth}/>
        <Route path="user/:id" component={UserPage} onEnter={requireAuth}/>

        <Route path="auth" component={AuthPage}/>
    </Route>
)
