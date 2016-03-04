import update from 'react-addons-update'
import * as actionType from '../actions/dashboard'
import { createReducer } from '../utils'

export default createReducer({usersCount: 0, questionsCount: 0, answersCount: 0, reportsCount: 0}, {
    // 获取Dashboard数据
    [actionType.FETCH_DASHBOARD_DATA_START](state, action) {
        return state
    },
    [actionType.FETCH_DASHBOARD_DATA_SUCCESS](state, action) {
        return update(state, {$merge: {...action}})
    },
    [actionType.FETCH_DASHBOARD_DATA_ERROR](state, action) {
        return state
    },
})
