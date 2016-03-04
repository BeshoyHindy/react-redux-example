import update from 'react-addons-update'
import * as reportActionType from '../actions/reportedQuestions'
import * as questionActionType from '../actions/question'
import { createReducer } from '../utils'

export default createReducer({totalCount: 0, currentPage: 1, reportedQuestions: []}, {
    // 获取举报问题
    [reportActionType.FETCH_REPORTED_QUESTIONS_START](state, action) {
        return state
    },
    [reportActionType.FETCH_REPORTED_QUESTIONS_SUCCESS](state, action) {
        return update(state, {
            currentPage: {$set: action.page},
            totalCount: {$set: action.totalCount},
            reportedQuestions: {$set: action.questions}
        })
    },
    [reportActionType.FETCH_REPORTED_QUESTIONS_ERROR](state, action){
        return state
    },

    // 删除提问
    [questionActionType.DELETE_QUESTION_START](state, action) {
        return state
    },
    [questionActionType.DELETE_QUESTION_SUCCESS](state, action) {
        return update(state, {
            reportedQuestions: {
                $set: state.reportedQuestions.filter(report => report.get('question').id !== action.question.id)
            }
        })
    },
    [questionActionType.DELETE_QUESTION_ERROR](state, action) {
        return state
    },

    // 更新问题
    [questionActionType.UPDATE_QUESTION_START](state, action) {
        return state
    },
    [questionActionType.UPDATE_QUESTION_SUCCESS](state, action) {
        return update(state, {
            reportedQuestions: {
                $set: state.reportedQuestions.map((report) => {
                    if (report.get('question').id === action.question.id) {
                        return update(report, {attributes: {question: {$set: action.question}}})
                    } else {
                        return report
                    }
                })
            }
        })
    },
    [questionActionType.UPDATE_QUESTION_ERROR](state, action){
        return state
    },

})
