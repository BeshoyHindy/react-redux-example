import { InvitationCode } from '../models'

/**
 * 获取邀请码
 */

export const FETCH_INVITATION_CODES_START = "FETCH_INVITATION_CODES_START"
export const FETCH_INVITATION_CODES_SUCCESS = "FETCH_INVITATION_CODES_SUCCESS"
export const FETCH_INVITATION_CODES_ERROR = "FETCH_INVITATION_CODES_ERROR"

export function fetchInvitationCodesStart() {
    return {type: FETCH_INVITATION_CODES_START}
}

export function fetchInvitationCodesSuccess(page, codes, totalCount) {
    return {type: FETCH_INVITATION_CODES_SUCCESS, page, codes, totalCount}
}

export function fetchInvitationCodesError(error) {
    return {type: FETCH_INVITATION_CODES_ERROR, error}
}

export function fetchInvitationCodes(page = 1, perPage = 15) {
    return dispatch => {
        dispatch(fetchInvitationCodesStart())

        InvitationCode.fetchAll(page, perPage).then(function (codes, totalCount) {
            dispatch(fetchInvitationCodesSuccess(page, codes, totalCount))
        }, function (error) {
            dispatch(fetchInvitationCodesError(error))
        })
    }
}

/**
 * 标记邀请码为已发送
 */

export const MARK_INVITATION_CODE_SENDED_START = "MARK_INVITATION_CODE_SENDED_START"
export const MARK_INVITATION_CODE_SENDED_SUCCESS = "MARK_INVITATION_CODE_SENDED_SUCCESS"
export const MARK_INVITATION_CODE_SENDED_ERROR = "MARK_INVITATION_CODE_SENDED_ERROR"

export function markInvitationSendedStart() {
    return {type: MARK_INVITATION_CODE_SENDED_START}
}

export function markInvitationSendedSuccess(code) {
    return {type: MARK_INVITATION_CODE_SENDED_SUCCESS, code}
}

export function markInvitationSendedError(error) {
    return {type: MARK_INVITATION_CODE_SENDED_ERROR, error}
}

export function markInvitationSended(code, sendedTo) {
    return dispatch => {
        dispatch(markInvitationSendedStart())

        code.markSended(sendedTo).then(function () {
            dispatch(markInvitationSendedSuccess(code))
        }, function (error) {
            dispatch(markInvitationSendedError(error))
        })
    }
}

/**
 * 生成新邀请码
 */

export const GENERATE_INVITATION_CODES_START = "GENERATE_INVITATION_CODES_START"
export const GENERATE_INVITATION_CODES_SUCCESS = "GENERATE_INVITATION_CODES_SUCCESS"
export const GENERATE_INVITATION_CODES_ERROR = "GENERATE_INVITATION_CODES_ERROR"

export function generateInvitationCodesStart() {
    return {type: GENERATE_INVITATION_CODES_START}
}

export function generateInvitationCodesSuccess(count, codes) {
    return {type: GENERATE_INVITATION_CODES_SUCCESS, count, codes}
}

export function generateInvitationCodesError(error) {
    return {type: GENERATE_INVITATION_CODES_ERROR, error}
}

export function generateInvitationCodes(count = 5) {
    return dispatch => {
        dispatch(generateInvitationCodesStart())

        InvitationCode.generateCodes(count).then(function (codes) {
            dispatch(generateInvitationCodesSuccess(count, codes))
        }, function (error) {
            dispatch(generateInvitationCodesError(error))
        });
    }
}
