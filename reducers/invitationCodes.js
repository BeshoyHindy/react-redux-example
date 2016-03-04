import update from 'react-addons-update'
import * as actionType from '../actions/invitationCodes'
import { createReducer } from '../utils'

export default createReducer({totalCount: 0, currentPage: 1, codes: {}}, {
    // 获取验证码
    [actionType.FETCH_INVITATION_CODES_START](state, action) {
        return state
    },
    [actionType.FETCH_INVITATION_CODES_SUCCESS](state, action) {
        return update(state, {
            totalCount: {$set: action.totalCount},
            currentPage: {$set: action.page},
            codes: {[action.page]: {$set: action.codes}}
        })
    },
    [actionType.FETCH_INVITATION_CODES_ERROR](state, action){
        return state
    },

    // 标记验证码为已读
    [actionType.MARK_INVITATION_CODE_SENDED_START](state, action) {
        return state
    },
    [actionType.MARK_INVITATION_CODE_SENDED_SUCCESS](state, action) {
        return update(state, {
            codes: {
                [state.currentPage]: {
                    $set: state.codes[state.currentPage].map((code) => {
                        return code.id === action.code.id ? action.code : code
                    })
                }
            }
        })
    },
    [actionType.MARK_INVITATION_CODE_SENDED_ERROR](state, action){
        return state
    },

    // 生成新的邀请码
    [actionType.GENERATE_INVITATION_CODES_START](state, action) {
        return state
    },
    [actionType.GENERATE_INVITATION_CODES_SUCCESS](state, action) {
        return update(state, {
                totalCount: {$apply: count => count + action.count},
                currentPage: {$set: 1},
                codes: {1: {$unshift: action.codes}}
            }
        )
    },
    [actionType.GENERATE_INVITATION_CODES_ERROR](state, action){
        return state
    },

})
