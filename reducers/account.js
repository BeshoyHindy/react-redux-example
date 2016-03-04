import update from 'react-addons-update'
import { createReducer } from '../utils'
import * as auth from '../auth'
import * as actionType from '../actions/account'

export default createReducer({authed: auth.loggedIn()}, {
    // 登录
    [actionType.LOG_IN_START](state, action) {
        return state
    },
    [actionType.LOG_IN_SUCCESS](state, action) {
        return update(state, {authed: {$set: true}})
    },
    [actionType.LOG_IN_ERROR](state, action) {
        return state
    },

    // 登出
    [actionType.LOG_OUT](state, action) {
        return update(state, {authed: {$set: false}})
    },

})
