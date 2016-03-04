import AV from 'avoscloud-sdk'
import { BroadcastSystemNotification } from '../models'

/**
 * 获取所有系统通知
 */

export const FETCH_BROADCAST_SYSTEM_NOTIFICATIONS_START = "FETCH_BROADCAST_SYSTEM_NOTIFICATIONS_START"
export const FETCH_BROADCAST_SYSTEM_NOTIFICATIONS_SUCCESS = "FETCH_BROADCAST_SYSTEM_NOTIFICATIONS_SUCCESS"
export const FETCH_BROADCAST_SYSTEM_NOTIFICATIONS_ERROR = "FETCH_BROADCAST_SYSTEM_NOTIFICATIONS_ERROR"

export function fetchBroadcastSystemNotificationsStart() {
    return {type: FETCH_BROADCAST_SYSTEM_NOTIFICATIONS_START}
}

export function fetchBroadcastSystemNotificationsSuccess(notifications) {
    return {type: FETCH_BROADCAST_SYSTEM_NOTIFICATIONS_SUCCESS, notifications}
}

export function fetchBroadcastSystemNotificationsError(error) {
    return {type: FETCH_BROADCAST_SYSTEM_NOTIFICATIONS_ERROR, error}
}

export function fetchBroadcastSystemNotifications(page = 1, perPage = 15) {
    return dispatch => {
        dispatch(fetchBroadcastSystemNotificationsStart())

        BroadcastSystemNotification.fetchAll(page, perPage).then(function (notifications) {
            dispatch(fetchBroadcastSystemNotificationsSuccess(notifications))
        }, function (error) {
            dispatch(fetchBroadcastSystemNotificationsError(error))
        })
    }
}

/**
 * 推送系统通知给所有人
 */

export const PUSH_BROADCAST_SYSTEM_NOTIFICATION_START = "PUSH_BROADCAST_SYSTEM_NOTIFICATION_START"
export const PUSH_BROADCAST_SYSTEM_NOTIFICATION_SUCCESS = "PUSH_BROADCAST_SYSTEM_NOTIFICATION_SUCCESS"
export const PUSH_BROADCAST_SYSTEM_NOTIFICATION_ERROR = "PUSH_BROADCAST_SYSTEM_NOTIFICATION_ERROR"

export function pushBroadcastSystemNotificationStart() {
    return {type: PUSH_BROADCAST_SYSTEM_NOTIFICATION_START}
}

export function pushBroadcastSystemNotificationSuccess(notification) {
    return {type: PUSH_BROADCAST_SYSTEM_NOTIFICATION_SUCCESS, notification}
}

export function pushBroadcastSystemNotificationError(error) {
    return {type: PUSH_BROADCAST_SYSTEM_NOTIFICATION_ERROR, error}
}

export function pushBroadcastSystemNotification(content) {
    return dispatch => {
        dispatch(pushBroadcastSystemNotificationStart())

        BroadcastSystemNotification.push(content).then(function (notification) {
            dispatch(pushBroadcastSystemNotificationSuccess(notification))
        }, function (error) {
            dispatch(pushBroadcastSystemNotificationError(error))
        })
    }
}
