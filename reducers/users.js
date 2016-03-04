import update from 'react-addons-update'
import * as actionType from '../actions/users'
import { createReducer } from '../utils'

export default createReducer({totalCount: 0, currentPage: 1, users: []}, {
    // 获取用户
    [actionType.FETCH_USERS_START](state, action) {
        return state
    },
    [actionType.FETCH_USERS_SUCCESS](state, action) {
        return update(state, {
            currentPage: {$set: action.page},
            totalCount: {$set: action.totalCount},
            users: {$set: action.users}
        })
    },
    [actionType.FETCH_USERS_ERROR](state, action) {
        return state
    },

    // 开通问答主页
    [actionType.OPEN_USER_QA_PAGE_START](state, action) {
        return state
    },
    [actionType.OPEN_USER_QA_PAGE_SUCCESS](state, action) {
        return update(state, {
            users: {
                $set: state.users.map((user) => {
                    return user.id === action.user.id ? action.user : user
                })
            }
        })
    },
    [actionType.OPEN_USER_QA_PAGE_ERROR](state, action) {
        return state
    },

    // 关闭问答主页
    [actionType.CLOSE_USER_QA_PAGE_START](state, action) {
        return state
    },
    [actionType.CLOSE_USER_QA_PAGE_SUCCESS](state, action) {
        return update(state, {
            users: {
                $set: state.users.map((user) => {
                    return user.id === action.user.id ? action.user : user
                })
            }
        })
    },
    [actionType.CLOSE_USER_QA_PAGE_ERROR](state, action) {
        return state
    },

    // 更新用户
    [actionType.UPDATE_USER_START](state, action) {
        return state
    },
    [actionType.UPDATE_USER_SUCCESS](state, action) {
        return update(state, {
            users: {
                $set: state.map((user) => {
                    return user.id === action.user.id ? action.user : user
                })
            }
        })
    },
    [actionType.UPDATE_USER_ERROR](state, action) {
        return state
    },

    // 搜索用户
    [actionType.SEARCH_USERS_START](state, action) {
        return state
    },
    [actionType.SEARCH_USERS_SUCCESS](state, action) {
        return update(state, {
            users: {$set: action.users}
        })
    },
    [actionType.SEARCH_USERS_ERROR](state, action) {
        return state
    },

})
