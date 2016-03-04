import AV from 'avoscloud-sdk'
import Answer from './Answer'
import HomeRecommendation from './HomeRecommendation'
import InvitationCode from './InvitationCode'
import LikeQuestion from './LikeQuestion'
import Question from './Question'
import QuestionComment from './QuestionComment'
import ReportQuestion from './ReportQuestion'
import User from './User'
import UserNotification from './UserNotification'
import UserNotificationSender from './UserNotificationSender'
import UserTag from './UserTag'
import UserTagAssociation from './UserTagAssociation'
import BroadcastSystemNotification from './BroadcastSystemNotification'

export { Answer, HomeRecommendation, InvitationCode, LikeQuestion, Question, QuestionComment, ReportQuestion,
    User, UserNotification, UserNotificationSender, UserTag, UserTagAssociation, BroadcastSystemNotification}

export const fetchDashboardData = function () {
    return AV.Promise.when(User.fetchTodayUsersCount(), Question.fetchTodayQuestionsCount(),
        Question.fetchTodayAnswersCount(), ReportQuestion.fetchTodayReportedQuestionsCount())
}
