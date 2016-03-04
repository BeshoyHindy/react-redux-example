import { fetchDashboardData as _fetchDashboardData } from '../models'

/**
 * 获取dashboard数据
 */

export const FETCH_DASHBOARD_DATA_START = "FETCH_DASHBOARD_DATA_START"
export const FETCH_DASHBOARD_DATA_SUCCESS = "FETCH_DASHBOARD_DATA_SUCCESS"
export const FETCH_DASHBOARD_DATA_ERROR = "FETCH_DASHBOARD_DATA_ERROR"

export function fetchDashboardDataStart() {
    return {type: FETCH_DASHBOARD_DATA_START}
}

export function fetchDashboardDataSuccess(usersCount, questionsCount, answersCount, reportsCount) {
    return {type: FETCH_DASHBOARD_DATA_SUCCESS, usersCount, questionsCount, answersCount, reportsCount}
}

export function fetchDashboardDataError(error) {
    return {type: FETCH_DASHBOARD_DATA_ERROR, error}
}

export function fetchDashboardData() {
    return dispatch => {
        dispatch(fetchDashboardDataStart())

        _fetchDashboardData().then(function (usersCount, questionsCount, answersCount, reportsCount) {
            dispatch(fetchDashboardDataSuccess(usersCount, questionsCount, answersCount, reportsCount))
        }, function (error) {
            dispatch(fetchDashboardDataError(error))
        })
    }
}
