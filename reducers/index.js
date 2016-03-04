import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import account from './account'
import users from './users'
import invitationCodes from './invitationCodes'
import homeRecommendations from './homeRecommendations'
import reportedQuestions from './reportedQuestions'
import pendingAnonymousQuestions from './pendingAnonymousQuestions'
import broadcastSystemNotifications from './broadcastSystemNotifications'
import questions from './questions'
import answers from './answers'
import dashboard from './dashboard'

const rootReducer = combineReducers({
    routing: routerReducer,
    dashboard,
    account,
    users,
    invitationCodes,
    homeRecommendations,
    reportedQuestions,
    pendingAnonymousQuestions,
    broadcastSystemNotifications,
    questions,
    answers
})

export default rootReducer