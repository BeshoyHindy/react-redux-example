import update from 'react-addons-update'
import * as actionType from '../actions/broadcastSystemNotifications'
import { createReducer } from '../utils'

export default createReducer([], {
    // 获取系统通知
    [actionType.FETCH_BROADCAST_SYSTEM_NOTIFICATIONS_START](state, action)  {
        return state
    },
    [actionType.FETCH_BROADCAST_SYSTEM_NOTIFICATIONS_SUCCESS](state, action){
        return [...action.notifications]
    },
    [actionType.FETCH_BROADCAST_SYSTEM_NOTIFICATIONS_ERROR](state, action) {
        return state
    },

    // 发送广播系统通知
    [actionType.PUSH_BROADCAST_SYSTEM_NOTIFICATION_START](state, action) {
        return state
    },
    [actionType.PUSH_BROADCAST_SYSTEM_NOTIFICATION_SUCCESS](state, action) {
        return update(state, {$unshift: [action.notification]})
    },
    [actionType.PUSH_BROADCAST_SYSTEM_NOTIFICATION_ERROR](state, action) {
        return state
    },
})
