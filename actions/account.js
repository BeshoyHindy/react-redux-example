import { push } from 'react-router-redux'
import * as auth from '../auth'
import { initLeanCloud, deinitLeanCloud } from '../utils'

/**
 * 登录
 */

export const LOG_IN_START = "LOG_IN_START"
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS"
export const LOG_IN_ERROR = "LOG_IN_ERROR"

export function logInStart() {
    return {type: LOG_IN_START}
}

export function logInSuccess(username) {
    return {type: LOG_IN_SUCCESS, username}
}

export function logInError(error) {
    return {type: LOG_IN_ERROR, error}
}

export function logIn(password) {
    return dispatch => {
        dispatch(logInStart())

        auth.logIn(password).then(function () {
            initLeanCloud()
            dispatch(logInSuccess())
            dispatch(push('/'))
        }, function (error) {
            window.alert('密码错误')
            dispatch(logInError(error))
        })
    }
}

/**
 * 登出
 */

export const LOG_OUT = "LOG_OUT"

export function logOut() {
    return dispatch => {
        auth.logOut()
        deinitLeanCloud()
        dispatch(push('/auth'))
        dispatch({type: LOG_OUT})
    }
}

/**
 * 初始化登陆状态
 */

//export const INIT_AUTH_STATE = "INIT_AUTH_STATE"
//
//export function initAuthState() {
//    return {type: INIT_AUTH_STATE, authed: auth.loggedIn()}
//}
