import { User } from '../models'

/**
 * 获取用户
 */

export const FETCH_USERS_START = "FETCH_USERS_START"
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS"
export const FETCH_USERS_ERROR = "FETCH_USERS_ERROR"

export function fetchUsersStart(page = 1) {
    return {type: FETCH_USERS_START, page: page}
}

export function fetchUsersSuccess(users, page, totalCount) {
    return {type: FETCH_USERS_SUCCESS, users, page, totalCount}
}

export function fetchUsersError(error) {
    return {type: FETCH_USERS_ERROR, error}
}

export function fetchUsers(page = 1, perPage = 15) {
    return dispatch => {
        dispatch(fetchUsersStart(page))

        User.fetchAll(page, perPage).then(function (users, totalCount) {
            dispatch(fetchUsersSuccess(users, page, totalCount))
        }, function (error) {
            dispatch(fetchUsersError(error))
        })
    }
}

/**
 * 开通用户主页
 */

export const OPEN_USER_QA_PAGE_START = "OPEN_USER_QA_PAGE_START"
export const OPEN_USER_QA_PAGE_SUCCESS = "OPEN_USER_QA_PAGE_SUCCESS"
export const OPEN_USER_QA_PAGE_ERROR = "OPEN_USER_QA_PAGE_ERROR"

export function openUserQAPageStart() {
    return {type: OPEN_USER_QA_PAGE_START}
}

export function openUserQAPageSuccess(user) {
    return {type: OPEN_USER_QA_PAGE_SUCCESS, user}
}

export function openUserQAPageError(error) {
    return {type: OPEN_USER_QA_PAGE_ERROR, error}
}

export function openUserQAPage(user) {
    return (dispatch) => {
        dispatch(openUserQAPageStart())

        user.openQAPage().then(function () {
            dispatch(openUserQAPageSuccess(user))
        }, function (error) {
            dispatch(openUserQAPageError(error))
        })
    }
}

/**
 * 关闭用户主页
 */

export const CLOSE_USER_QA_PAGE_START = "CLOSE_USER_QA_PAGE_START"
export const CLOSE_USER_QA_PAGE_SUCCESS = "CLOSE_USER_QA_PAGE_SUCCESS"
export const CLOSE_USER_QA_PAGE_ERROR = "CLOSE_USER_QA_PAGE_ERROR"

export function closeUserQAPageStart() {
    return {type: CLOSE_USER_QA_PAGE_START}
}

export function closeUserQAPageSuccess(user) {
    return {type: CLOSE_USER_QA_PAGE_SUCCESS, user}
}

export function closeUserQAPageError(error) {
    return {type: CLOSE_USER_QA_PAGE_ERROR, error}
}

export function closeUserQAPage(user) {
    return (dispatch) => {
        dispatch(closeUserQAPageStart())

        user.closeQAPage().then(function () {
            dispatch(closeUserQAPageSuccess(user))
        }, function (error) {
            dispatch(closeUserQAPageError(error))
        })
    }
}

/**
 * 编辑用户资料
 */

export const UPDATE_USER_START = "UPDATE_USER_START"
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS"
export const UPDATE_USER_ERROR = "UPDATE_USER_ERROR"

export function updateUserStart() {
    return {type: UPDATE_USER_START}
}

export function updateUserSuccess(user) {
    return {type: UPDATE_USER_SUCCESS, user}
}

export function updateUserError(error) {
    return {type: UPDATE_USER_ERROR, error}
}

export function updateUser(user, name, title, achievements, desc, mobilePhoneNumber, tags) {
    return (dispatch) => {
        dispatch(updateUserStart())

        user.update(name, title, achievements, desc, mobilePhoneNumber, tags).then(function (user) {
            dispatch(updateUserSuccess(user))
        }, function (error) {
            dispatch(updateUserError(error))
        })
    }
}


/**
 * 搜索用户
 */

export const SEARCH_USERS_START = "SEARCH_USERS_START"
export const SEARCH_USERS_SUCCESS = "SEARCH_USERS_SUCCESS"
export const SEARCH_USERS_ERROR = "SEARCH_USERS_ERROR"

export function searchUsersStart() {
    return {type: SEARCH_USERS_START}
}

export function searchUsersSuccess(users, page, totalCount) {
    return {type: SEARCH_USERS_SUCCESS, users, page, totalCount}
}

export function searchUsersError(error) {
    return {type: SEARCH_USERS_ERROR, error}
}

export function searchUsers(keyword, page = 1, perPage = 15) {
    return dispatch => {
        dispatch(searchUsersStart())

        User.searchByName(keyword, page, perPage).then(function (users, totalCount) {
            dispatch(searchUsersSuccess(users, page, totalCount))
        }, function (error) {
            dispatch(searchUsersError(error))
        })
    }
}
