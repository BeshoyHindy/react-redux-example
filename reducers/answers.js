import update from 'react-addons-update'
import * as actionType from '../actions/question'
import { createReducer } from '../utils'

export default createReducer({totalCount: 0, currentPage: 1, answers: []}, {
    // 获取已回答问题
    [actionType.FETCH_ANSWERS_START](state, action) {
        return state
    },
    [actionType.FETCH_ANSWERS_SUCCESS](state, action) {
        return update(state, {
            currentPage: {$set: action.page},
            totalCount: {$set: action.totalCount},
            answers: {$set: action.answers}
        })
    },
    [actionType.FETCH_ANSWERS_ERROR](state, action) {
        return state
    },

    // 更新问题
    [actionType.UPDATE_QUESTION_START](state, action) {
        return state
    },
    [actionType.UPDATE_QUESTION_SUCCESS](state, action) {
        return update(state, {
            answers: {
                $set: state.answers.map((question) => {
                    return question.id === action.question.id ? action.question : question
                })
            }
        })
    },
    [actionType.UPDATE_QUESTION_ERROR](state, action){
        return state
    },

    // 删除提问
    [actionType.DELETE_QUESTION_START](state, action) {
        return state
    },
    [actionType.DELETE_QUESTION_SUCCESS](state, action) {
        return update(state, {
            answers: {
                $set: state.answers.filter(question => question.id !== action.question.id)
            }
        })
    },
    [actionType.DELETE_QUESTION_ERROR](state, action) {
        return state
    },
})
